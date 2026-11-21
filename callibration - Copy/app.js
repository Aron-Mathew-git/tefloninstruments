(() => {
  'use strict';

  const data = window.NABL_SCOPE_DATA || (typeof NABL_SCOPE_DATA !== 'undefined' ? NABL_SCOPE_DATA : null);
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHTML = (value = '') => String(value).replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const catalogueImages = {
    electrical: { src: 'assets/images/catalog-electrical-v2.webp', alt: 'Electrical calibration bench with a precision multimeter, calibrator and reference equipment' },
    thermal: { src: 'assets/images/catalog-thermal-v2.webp', alt: 'Temperature calibration setup with a dry block calibrator and reference thermometer' },
    pressure: { src: 'assets/images/catalog-pressure-v2.webp', alt: 'Pressure calibration bench with a deadweight tester and reference gauges' },
    'force-torque': { src: 'assets/images/catalog-force-torque-v2.webp', alt: 'Force and torque calibration workstation with torque tester and load cell fixture' },
    dimensional: { src: 'assets/images/catalog-dimensional-v2.webp', alt: 'Dimensional metrology setup with caliper, micrometer, gauge blocks and height gauge' },
    flow: { src: 'assets/images/catalog-process-flow-v2.webp', alt: 'Flow and process instrument calibration setup with transmitters and loop calibrator' },
    'process-instruments': { src: 'assets/images/catalog-process-flow-v2.webp', alt: 'Process instrument calibration setup with transmitters, test line and loop calibrator' },
    'mechanical-testing': { src: 'assets/images/catalog-force-torque-v2.webp', alt: 'Mechanical force and torque calibration workstation' }
  };

  const openDialog = dialog => {
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add('modal-open');
  };

  const closeDialog = dialog => {
    if (!dialog?.open) return;
    dialog.close();
    document.body.classList.remove('modal-open');
  };

  function initHeader() {
    const header = qs('#site-header');
    const toggle = qs('#menu-toggle');
    const nav = qs('#main-nav');
    if (header) window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true });
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    qsa('a', nav).forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }

  function initInstrumentCarousel() {
    const root = qs('#instrument-carousel');
    if (!root) return;
    const slides = qsa('.instrument-slide', root);
    const dotRail = qs('.carousel-dots', root);
    const previous = qs('.carousel-prev', root);
    const next = qs('.carousel-next', root);
    const toggle = qs('.carousel-toggle', root);
    if (slides.length < 2 || !dotRail || !previous || !next || !toggle) return;

    let activeIndex = 0;
    let timer = null;
    let userPaused = reducedMotion;

    dotRail.innerHTML = slides.map((slide, index) => `<button type="button" aria-label="Show instrument ${index + 1}" ${index === 0 ? 'aria-current="true"' : ''}></button>`).join('');
    const dots = qsa('button', dotRail);

    const showSlide = nextIndex => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      dots.forEach((dot, index) => {
        if (index === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };

    const stopAutoplay = () => { if (timer) window.clearInterval(timer); timer = null; };
    const startAutoplay = () => {
      stopAutoplay();
      if (!userPaused && !reducedMotion) timer = window.setInterval(() => showSlide(activeIndex + 1), 5200);
    };

    previous.addEventListener('click', () => { showSlide(activeIndex - 1); startAutoplay(); });
    next.addEventListener('click', () => { showSlide(activeIndex + 1); startAutoplay(); });
    dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); startAutoplay(); }));
    toggle.addEventListener('click', () => {
      userPaused = !userPaused;
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.setAttribute('aria-label', userPaused ? 'Play instrument slideshow' : 'Pause instrument slideshow');
      toggle.textContent = userPaused ? 'Play' : 'Pause';
      userPaused ? stopAutoplay() : startAutoplay();
    });
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', startAutoplay);
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) startAutoplay(); });
    root.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(activeIndex - 1); startAutoplay(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(activeIndex + 1); startAutoplay(); }
    });
    document.addEventListener('visibilitychange', () => document.hidden ? stopAutoplay() : startAutoplay());

    if (reducedMotion) {
      toggle.textContent = 'Play';
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('aria-label', 'Play instrument slideshow');
    }
    showSlide(0);
    startAutoplay();
  }

  function initScrollMotion() {
    if (reducedMotion || !document.body.classList.contains('home-page') || !('IntersectionObserver' in window)) return;
    const targets = qsa('.section > .shell, .proof-band > .shell');
    if (!targets.length) return;
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    targets.forEach(target => observer.observe(target));
  }

  function initQuoteForm() {
    const dialog = qs('#quote-modal');
    const form = qs('#quote-form');
    if (!dialog || !form) return;

    qsa('.open-quote').forEach(button => button.addEventListener('click', () => {
      const context = button.dataset.context || '';
      const service = button.dataset.service || '';
      form.elements.context.value = context;
      if (service) form.elements.service.value = service;
      if (context && !form.elements.message.value) form.elements.message.value = `I would like a quotation for ${context}.`;
      openDialog(dialog);
    }));

    qsa('.close-dialog', dialog).forEach(button => button.addEventListener('click', () => closeDialog(dialog)));
    dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(dialog); });
    dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));

    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = new FormData(form);
      const file = form.elements.file?.files?.[0];
      const lines = [
        'CALIBRATION ENQUIRY',
        '',
        `Name: ${values.get('name')}`,
        `Company / Institution: ${values.get('company')}`,
        `Email: ${values.get('email')}`,
        `Phone: ${values.get('phone')}`,
        `Service route: ${values.get('service')}`,
        values.get('context') ? `Capability: ${values.get('context')}` : '',
        file ? `Instrument list prepared: ${file.name} (please request the file in chat)` : '',
        '',
        'Requirements:',
        values.get('message')
      ].filter(line => line !== '');
      window.open(`https://wa.me/919718933509?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
    });
  }

  function initHomeCatalogue() {
    const grid = qs('#capability-grid');
    if (!grid || !data) return;
    const search = qs('#capability-search');
    const resultCount = qs('#result-count');
    const empty = qs('#empty-state');
    const compareDock = qs('#compare-dock');
    const compareCount = qs('#compare-count');
    const comparisonDialog = qs('#comparison-modal');
    const comparisonContent = qs('#comparison-content');
    let activeDiscipline = 'all';
    const selected = new Set();

    const items = data.disciplines.flatMap(discipline => discipline.parameters.map(parameter => ({ discipline, parameter, key: `${discipline.id}:${parameter.id}` })));

    const filterBar = qs('#discipline-filters');
    filterBar.setAttribute('role', 'group');
    filterBar.setAttribute('aria-label', 'Filter by discipline');
    filterBar.innerHTML = `<button class="filter-chip is-active" type="button" data-discipline="all">All parameters</button>${data.disciplines.map(d => `<button class="filter-chip" type="button" data-discipline="${escapeHTML(d.id)}">${escapeHTML(d.title)}</button>`).join('')}`;

    const initialQuery = new URLSearchParams(location.search).get('q');
    if (initialQuery) search.value = initialQuery;

    const itemSearchText = item => [item.discipline.title, item.discipline.description, item.parameter.name, item.parameter.summary, ...item.parameter.instruments, ...item.parameter.subRanges.map(entry => entry.range)].join(' ').toLowerCase();

    function render() {
      const query = search.value.trim().toLowerCase();
      const visible = items.filter(item => (activeDiscipline === 'all' || item.discipline.id === activeDiscipline) && (!query || itemSearchText(item).includes(query)));
      grid.innerHTML = visible.map(({ discipline, parameter, key }, index) => {
        const image = catalogueImages[discipline.id] || parameter.images?.[0];
        const ranges = parameter.subRanges.slice(0, 2).map(entry => `<li>${escapeHTML(entry.range)}</li>`).join('');
        const moreRanges = parameter.subRanges.length > 2 ? `<li>+${parameter.subRanges.length - 2} more</li>` : '';
        const checked = selected.has(key);
        return `<article class="capability-card" style="--order:${index}">
          <a class="card-image" href="parameter-detail.html?disc=${encodeURIComponent(discipline.id)}&param=${encodeURIComponent(parameter.id)}" aria-label="View ${escapeHTML(parameter.name)} details">
            <img src="${escapeHTML(image?.src || 'assets/images/facility_panoramic.png')}" alt="${escapeHTML(image?.alt || parameter.name)}" width="1024" height="1024" loading="lazy">
            <span>${escapeHTML(discipline.code)}</span>
          </a>
          <div class="card-body">
            <div class="card-meta"><span>${escapeHTML(discipline.title)}</span><label><input class="compare-checkbox" type="checkbox" data-key="${escapeHTML(key)}" ${checked ? 'checked' : ''}> Compare</label></div>
            <h3><a href="parameter-detail.html?disc=${encodeURIComponent(discipline.id)}&param=${encodeURIComponent(parameter.id)}">${escapeHTML(parameter.name)}</a></h3>
            <p class="card-summary">${escapeHTML(parameter.summary)}</p>
            <ul class="range-list">${ranges}${moreRanges}</ul>
            <div class="card-actions"><a href="parameter-detail.html?disc=${encodeURIComponent(discipline.id)}&param=${encodeURIComponent(parameter.id)}">View details <span>↗</span></a><button class="open-quote" type="button" data-context="${escapeHTML(`${discipline.title} — ${parameter.name}`)}">Enquire</button></div>
          </div>
        </article>`;
      }).join('');
      grid.hidden = visible.length === 0;
      empty.hidden = visible.length !== 0;
      resultCount.textContent = visible.length === items.length ? 'Showing all calibration parameters' : `Showing ${visible.length} matching parameter${visible.length === 1 ? '' : 's'}`;
      bindRenderedActions();
    }

    function bindRenderedActions() {
      qsa('.compare-checkbox', grid).forEach(checkbox => checkbox.addEventListener('change', () => {
        if (checkbox.checked && selected.size >= 3) {
          checkbox.checked = false;
          announceLimit(checkbox);
          return;
        }
        checkbox.checked ? selected.add(checkbox.dataset.key) : selected.delete(checkbox.dataset.key);
        updateCompareDock();
      }));
      qsa('.open-quote', grid).forEach(button => button.addEventListener('click', () => {
        const form = qs('#quote-form');
        form.elements.context.value = button.dataset.context;
        form.elements.message.value = `I would like a quotation for ${button.dataset.context}.`;
        openDialog(qs('#quote-modal'));
      }));
    }

    function announceLimit(target) {
      let note = qs('.compare-limit-note');
      if (!note) {
        note = document.createElement('span');
        note.className = 'compare-limit-note';
        note.setAttribute('role', 'status');
        document.body.appendChild(note);
      }
      note.textContent = 'You can compare up to three capabilities.';
      target.closest('.card-meta').appendChild(note);
      window.setTimeout(() => note.remove(), 2600);
    }

    function updateCompareDock() {
      compareDock.hidden = selected.size === 0;
      compareCount.textContent = `${selected.size} selected`;
      qsa('.compare-checkbox', grid).forEach(box => { box.checked = selected.has(box.dataset.key); });
    }

    function renderComparison() {
      const chosen = items.filter(item => selected.has(item.key));
      comparisonContent.innerHTML = `<table class="comparison-table"><thead><tr><th>Specification</th>${chosen.map(item => `<th>${escapeHTML(item.parameter.name)}<small>${escapeHTML(item.discipline.title)}</small></th>`).join('')}</tr></thead><tbody>
        <tr><th>Ranges</th>${chosen.map(item => `<td>${item.parameter.subRanges.map(r => `<span>${escapeHTML(r.range)}</span>`).join('')}</td>`).join('')}</tr>
        <tr><th>Supported instruments</th>${chosen.map(item => `<td>${item.parameter.instruments.map(i => `<span>${escapeHTML(i)}</span>`).join('')}</td>`).join('')}</tr>
        <tr><th>Next step</th>${chosen.map(item => `<td><a href="parameter-detail.html?disc=${encodeURIComponent(item.discipline.id)}&param=${encodeURIComponent(item.parameter.id)}">Open details ↗</a></td>`).join('')}</tr>
      </tbody></table>`;
    }

    filterBar.addEventListener('click', event => {
      const button = event.target.closest('.filter-chip');
      if (!button) return;
      activeDiscipline = button.dataset.discipline;
      qsa('.filter-chip', filterBar).forEach(chip => chip.classList.toggle('is-active', chip === button));
      render();
    });
    search.addEventListener('input', render);
    document.addEventListener('keydown', event => {
      if (event.key === '/' && !/input|textarea|select/i.test(document.activeElement.tagName)) { event.preventDefault(); search.focus(); }
    });
    qs('#clear-filters')?.addEventListener('click', () => {
      search.value = '';
      activeDiscipline = 'all';
      qsa('.filter-chip', filterBar).forEach(chip => chip.classList.toggle('is-active', chip.dataset.discipline === 'all'));
      render();
    });
    qs('#clear-compare')?.addEventListener('click', () => { selected.clear(); updateCompareDock(); render(); });
    qs('#open-comparison')?.addEventListener('click', () => { renderComparison(); openDialog(comparisonDialog); });
    qsa('.close-dialog', comparisonDialog).forEach(button => button.addEventListener('click', () => closeDialog(comparisonDialog)));
    comparisonDialog?.addEventListener('click', event => { if (event.target === comparisonDialog) closeDialog(comparisonDialog); });
    comparisonDialog?.addEventListener('close', () => document.body.classList.remove('modal-open'));
    render();
  }

  function initDetailPage() {
    const list = qs('#discipline-content');
    if (!list || !data) return;
    const params = new URLSearchParams(location.search);
    const requestedId = params.get('disc');
    const requestedParam = params.get('param');
    const discipline = data.disciplines.find(item => item.id === requestedId) || data.disciplines[0];
    const search = qs('#detail-search');
    const select = qs('#discipline-select');
    const title = qs('#discipline-title');
    const description = qs('#discipline-description');
    const count = qs('#discipline-count');

    document.title = `${discipline.title} Calibration Capabilities | Teflon Instruments`;
    title.textContent = discipline.title;
    description.textContent = discipline.description;
    count.textContent = `${discipline.parameters.length} parameter${discipline.parameters.length === 1 ? '' : 's'} listed`;
    select.innerHTML = data.disciplines.map(item => `<option value="${escapeHTML(item.id)}" ${item.id === discipline.id ? 'selected' : ''}>${escapeHTML(item.code)} — ${escapeHTML(item.title)}</option>`).join('');

    function render() {
      const query = search.value.trim().toLowerCase();
      const visible = discipline.parameters.filter(parameter => [parameter.name, parameter.summary, ...parameter.instruments, ...parameter.subRanges.map(r => r.range)].join(' ').toLowerCase().includes(query));
      list.innerHTML = visible.map((parameter, index) => {
        const image = parameter.images?.[0];
        const id = `parameter-${parameter.id}`;
        return `<article class="detail-card" id="${escapeHTML(id)}" style="--order:${index}">
          <div class="detail-visual"><img src="${escapeHTML(image?.src || 'assets/images/facility_panoramic.png')}" alt="${escapeHTML(image?.alt || parameter.name)}" width="1024" height="1024" ${index > 1 ? 'loading="lazy"' : ''}><span>${escapeHTML(discipline.code)} / ${String(index + 1).padStart(2, '0')}</span></div>
          <div class="detail-main"><p class="eyebrow">${escapeHTML(discipline.title)} calibration</p><h2>${escapeHTML(parameter.name)}</h2><p class="detail-summary">${escapeHTML(parameter.summary)}</p>
            <div class="spec-block"><h3>Measurement range</h3><table><thead><tr><th>Listed range</th></tr></thead><tbody>${parameter.subRanges.map(range => `<tr><td>${escapeHTML(range.range)}</td></tr>`).join('')}</tbody></table></div>
            <div class="spec-block"><h3>Supported instruments</h3><ul class="instrument-tags">${parameter.instruments.map(instrument => `<li>${escapeHTML(instrument)}</li>`).join('')}</ul></div>
            <div class="detail-actions"><button class="button button-dark open-quote" type="button" data-context="${escapeHTML(`${discipline.title} — ${parameter.name}`)}">Enquire about this capability</button><a href="https://wa.me/919718933509?text=${encodeURIComponent(`Hello Teflon Instruments, I would like to enquire about ${discipline.title} calibration for ${parameter.name}.`)}" target="_blank" rel="noopener">Ask on WhatsApp ↗</a></div>
          </div>
        </article>`;
      }).join('');
      qs('#detail-empty').hidden = visible.length > 0;
      bindDetailQuoteButtons();
    }

    function bindDetailQuoteButtons() {
      qsa('.open-quote', list).forEach(button => button.addEventListener('click', () => {
        const form = qs('#quote-form');
        form.elements.context.value = button.dataset.context;
        form.elements.message.value = `I would like a quotation for ${button.dataset.context}.`;
        openDialog(qs('#quote-modal'));
      }));
    }

    search.addEventListener('input', render);
    select.addEventListener('change', () => { location.href = `parameter-detail.html?disc=${encodeURIComponent(select.value)}`; });
    render();
    if (requestedParam) requestAnimationFrame(() => {
      const target = qs(`#parameter-${CSS.escape(requestedParam)}`);
      if (target) { target.classList.add('is-target'); target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }); }
    });
  }

  initHeader();
  initInstrumentCarousel();
  initScrollMotion();
  initQuoteForm();
  initHomeCatalogue();
  initDetailPage();
})();
