document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. ACTIVE TIME TICKER (KOCHI METROLOGY DEPT - IST UTC+5:30 - DISABLED)
     ========================================================================== */
  // The top-bar has been removed, so the active time ticker is disabled.


  /* ==========================================================================
     2. FLOATING SIDEBAR FOR ENQUIRY
     ========================================================================== */
  const sidebar = document.getElementById('enquiry-sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const openQuoteBtns = document.querySelectorAll('.open-quote-btn');
  
  function openSidebar() {
    if (sidebar) {
      // Close mobile drawer menu if open
      const mobileDrawer = document.getElementById('mobile-menu-drawer');
      const mobileToggle = document.getElementById('mobile-menu-toggle');
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle?.classList.remove('open');
      }
      sidebar.classList.add('open');
      if (window.innerWidth <= 768) {
        document.body.classList.add('no-scroll');
      }
      setTimeout(() => {
        document.getElementById('eq-name')?.focus();
      }, 300);
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  }

  // Toggle sidebar
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  // Close sidebar on clicking close button
  const closeSidebarBtn = document.getElementById('sidebar-close-btn');
  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', closeSidebar);
  }

  // Open sidebar on clicking any "Request Quote" buttons
  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSidebar();
    });
  });

  // Close sidebar on pressing escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });


  /* ==========================================================================
     3. DRAG-AND-DROP FILE UPLOAD MOCK
     ========================================================================== */
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('file-input');
  const filePreview = document.getElementById('file-selected-name');

  if (dropZone && fileInput) {
    // Trigger file input click when clicking the zone
    dropZone.addEventListener('click', () => {
      fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', () => {
      displayFileName(fileInput.files[0]);
    });

    // Drag-over styling
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      }, false);
    });

    // Drop files
    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        fileInput.files = files;
        displayFileName(files[0]);
      }
    });
  }

  function displayFileName(file) {
    if (file && filePreview) {
      filePreview.textContent = `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      filePreview.style.display = 'block';
    }
  }


  /* ==========================================================================
     4. HERO SCROLLING CAROUSEL
     ========================================================================== */
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const dots = Array.from(document.querySelectorAll('.indicator-dot'));
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  let currentSlideIndex = 0;
  let carouselInterval;
  
  function moveToSlide(index) {
    // Remove active statuses
    slides[currentSlideIndex].classList.remove('current-slide');
    dots[currentSlideIndex].classList.remove('active-dot');
    
    // Set new slide
    currentSlideIndex = (index + slides.length) % slides.length;
    
    slides[currentSlideIndex].classList.add('current-slide');
    dots[currentSlideIndex].classList.add('active-dot');
  }

  // Next / Prev Button Listeners
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      moveToSlide(currentSlideIndex + 1);
      resetCarouselTimer();
    });
    
    prevBtn.addEventListener('click', () => {
      moveToSlide(currentSlideIndex - 1);
      resetCarouselTimer();
    });
  }

  // Indicators/Dots Listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      moveToSlide(index);
      resetCarouselTimer();
    });
  });

  // Autoplay function
  function startCarouselTimer() {
    carouselInterval = setInterval(() => {
      moveToSlide(currentSlideIndex + 1);
    }, 6000); // 6 seconds slide duration
  }

  function resetCarouselTimer() {
    clearInterval(carouselInterval);
    startCarouselTimer();
  }

  // Touch Swipe Support for Hero Carousel
  const heroCarouselContainer = document.querySelector('.carousel-container');
  if (heroCarouselContainer && slides.length > 0) {
    let heroTouchStartX = 0;
    let heroTouchEndX = 0;

    heroCarouselContainer.addEventListener('touchstart', (e) => {
      heroTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroCarouselContainer.addEventListener('touchend', (e) => {
      heroTouchEndX = e.changedTouches[0].screenX;
      if (heroTouchEndX < heroTouchStartX - 40) {
        moveToSlide(currentSlideIndex + 1);
        resetCarouselTimer();
      } else if (heroTouchEndX > heroTouchStartX + 40) {
        moveToSlide(currentSlideIndex - 1);
        resetCarouselTimer();
      }
    }, { passive: true });
  }

  // Initialize carousel timer if slides exist
  if (slides.length > 0) {
    startCarouselTimer();
  }


  /* ==========================================================================
     5. NAVIGATION LINK HIGH-HIGHLIGHT ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('main > section, footer, main');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightNavigation() {
    let currentSectionId = 'home';
    const scrollPos = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (id && scrollPos >= top && scrollPos < top + height) {
        currentSectionId = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}` || (currentSectionId === 'home' && href === '#home')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation);
  highlightNavigation(); // Initial run


  /* ==========================================================================
     6. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     ========================================================================== */
  function initScrollAnimations() {
    // Add fade-in-up to section headers
    document.querySelectorAll('.section-header').forEach(el => {
      el.classList.add('fade-in-up');
    });

    // Service cards: staggered fade-in
    document.querySelectorAll('.service-card').forEach((el, i) => {
      el.classList.add('fade-in-up', `stagger-${i + 1}`);
    });

    // Bento cards: staggered fade-in
    document.querySelectorAll('.bento-card').forEach((el, i) => {
      el.classList.add('fade-in-scale', `stagger-${i + 1}`);
    });

    // Workflow cards
    document.querySelectorAll('.workflow-card').forEach((el, i) => {
      el.classList.add('fade-in-up', `stagger-${i + 1}`);
    });

    // Insight cards
    document.querySelectorAll('.insight-card').forEach((el, i) => {
      el.classList.add('fade-in-up', `stagger-${i + 1}`);
    });

    // Stat cards
    document.querySelectorAll('.stat-card').forEach((el, i) => {
      el.classList.add('fade-in-scale', `stagger-${i + 1}`);
    });

    // Facility left content
    document.querySelectorAll('.facility-left').forEach(el => {
      el.classList.add('fade-in-left');
    });

    // Facility right photo
    document.querySelectorAll('.facility-right-photo').forEach(el => {
      el.classList.add('fade-in-right');
    });

    // Contact card and Map wrapper
    document.querySelectorAll('.contact-info-card').forEach(el => {
      el.classList.add('fade-in-left');
    });
    document.querySelectorAll('.contact-map-wrapper').forEach(el => {
      el.classList.add('fade-in-right');
    });



    // Hero elements (these start visible on load, animate fast)
    document.querySelectorAll('.hero-metadata').forEach(el => {
      el.classList.add('fade-in-up');
    });
    document.querySelectorAll('.hero-title').forEach(el => {
      el.classList.add('fade-in-up', 'stagger-1');
    });
    document.querySelectorAll('.hero-description').forEach(el => {
      el.classList.add('fade-in-up', 'stagger-2');
    });
    document.querySelectorAll('.hero-ctas').forEach(el => {
      el.classList.add('fade-in-up', 'stagger-3');
    });

    // Feature items in hero
    document.querySelectorAll('.feature-item').forEach((el, i) => {
      el.classList.add('fade-in-up', `stagger-${i + 4}`);
    });

    // Footer CTA bar
    document.querySelectorAll('.footer-cta-bar').forEach(el => {
      el.classList.add('fade-in-up');
    });

    // Insights container
    document.querySelectorAll('.insights-container').forEach(el => {
      el.classList.add('fade-in-up');
    });

    // Why-us checklist items
    document.querySelectorAll('.why-us-checklist li').forEach((el, i) => {
      el.classList.add('fade-in-left', `stagger-${i + 1}`);
    });
  }

  // IntersectionObserver for triggering animations
  function createScrollObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation fires
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale');
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize animations
  initScrollAnimations();
  createScrollObserver();


  /* ==========================================================================
     7. ANIMATED NUMBER COUNTER FOR STATS
     ========================================================================== */
  function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (isDecimal) {
        element.textContent = current.toFixed(0) + suffix;
      } else {
        element.textContent = current.toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Set final value
        element.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  // Observe stat numbers for counter animation
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();

          // Parse values like "24-48h", "100%"
          if (text.includes('24-48')) {
            // Don't animate this one, it's a range
            el.style.opacity = '1';
          } else if (text.includes('100')) {
            animateCounter(el, 100, '%');
          }

          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => {
      statObserver.observe(el);
    });
  }


  /* ==========================================================================
     8. HEADER SCROLL EFFECT (COMPACT ON SCROLL)
     ========================================================================== */
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;

    if (header) {
      if (currentScrollY > 50) {
        header.style.boxShadow = '0 4px 24px rgba(15, 23, 41, 0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  /* ==========================================================================
     9. SECURE FORM SUBMISSION AND MOCK METRICS LOGGING
     ========================================================================== */
  const enquiryForm = document.getElementById('quick-enquiry-form');
  const successView = document.getElementById('sidebar-success-view');
  const successProgressBar = document.getElementById('success-progress-bar');
  const manualBtn = document.getElementById('whatsapp-manual-btn');
  const resetBtn = document.getElementById('success-reset-btn');
  const directCta = document.querySelector('.sidebar-direct-cta');
  let redirectTimeout;

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(enquiryForm);
      const name = formData.get('name');
      const company = formData.get('company');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message') || '';
      
      let fileName = '';
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        fileName = fileInput.files[0].name;
      }

      const serviceLabels = {
        electrical: "Electrical Calibration",
        temperature: "Temperature Calibration",
        pressure: "Pressure Calibration",
        dimensional: "Dimensional Metrology",
        torque: "Torque & Mass Calibration",
        onsite: "On-Site Calibration",
        custom: "Other / Custom Standards"
      };
      const selectedService = serviceLabels[service] || service;

      // Construct WhatsApp message formatting
      let msg = `⚡ *NEW CALIBRATION ENQUIRY* ⚡\n`;
      msg += `---------------------------------------------\n`;
      msg += `👤 *Name:* ${name}\n`;
      msg += `🏢 *Company:* ${company}\n`;
      msg += `📧 *Email:* ${email}\n`;
      msg += `📞 *Phone:* ${phone}\n`;
      msg += `🛠️ *Service:* ${selectedService}\n`;
      if (message.trim()) {
        msg += `📝 *Special Requirements:* ${message.trim()}\n`;
      }
      if (fileName) {
        msg += `📎 *Attached File:* ${fileName}\n`;
      }
      msg += `---------------------------------------------\n`;
      msg += `_Sent via Teflon Instruments Calibration Portal_`;

      const waUrl = `https://wa.me/919718933509?text=${encodeURIComponent(msg)}`;

      // Transition to Success State
      enquiryForm.style.display = 'none';
      if (directCta) {
        directCta.style.display = 'none';
      }
      if (successView) {
        successView.style.display = 'flex';
      }
      if (manualBtn) {
        manualBtn.href = waUrl;
      }

      // Activate loading bar animation
      if (successProgressBar) {
        successProgressBar.classList.remove('active');
        void successProgressBar.offsetWidth; // Trigger reflow
        successProgressBar.classList.add('active');
      }

      // Redirect after 2.5s
      redirectTimeout = setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 2500);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearTimeout(redirectTimeout);
        enquiryForm.reset();
        if (filePreview) {
          filePreview.textContent = '';
          filePreview.style.display = 'none';
        }
        enquiryForm.style.display = 'flex';
        if (directCta) {
          directCta.style.display = 'flex';
        }
        if (successView) {
          successView.style.display = 'none';
        }
      });
    }
  }


  /* ==========================================================================
     10. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileSubLinks = document.querySelectorAll('.mobile-sub-link');
  const mobileDropdownToggleBtn = document.getElementById('mobile-dropdown-toggle-btn');
  const mobileDropdownSub = document.getElementById('mobile-dropdown-sub');

  function openMobileDrawer() {
    mobileMenuToggle?.classList.add('open');
    mobileMenuDrawer?.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeMobileDrawer() {
    mobileMenuToggle?.classList.remove('open');
    mobileMenuDrawer?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  if (mobileMenuToggle && mobileMenuDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      if (mobileMenuDrawer.classList.contains('open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', closeMobileDrawer);
    }

    // Close drawer when clicking a main link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // Close drawer when clicking a sub-discipline link
    mobileSubLinks.forEach(link => {
      link.addEventListener('click', closeMobileDrawer);
    });

    // Mobile Dropdown Accordion Toggle
    if (mobileDropdownToggleBtn && mobileDropdownSub) {
      mobileDropdownToggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileDropdownSub.classList.toggle('is-open');
        mobileDropdownToggleBtn.classList.toggle('open');
      });
    }

    // Close drawer when clicking outside the drawer
    document.addEventListener('click', (e) => {
      if (mobileMenuDrawer.classList.contains('open') && 
          !mobileMenuDrawer.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        closeMobileDrawer();
      }
    });
  }

  /* ==========================================================================
     11. NAVIGATION HOVER DROPDOWN & DISCIPLINE LINK CLICK HANDLERS
     ========================================================================== */
  const navDropdown = document.querySelector('.nav-dropdown');
  let dropdownHoverTimer = null;

  if (navDropdown) {
    navDropdown.addEventListener('mouseenter', () => {
      clearTimeout(dropdownHoverTimer);
      dropdownHoverTimer = setTimeout(() => {
        navDropdown.classList.add('is-open');
      }, 150);
    });

    navDropdown.addEventListener('mouseleave', () => {
      clearTimeout(dropdownHoverTimer);
      dropdownHoverTimer = setTimeout(() => {
        navDropdown.classList.remove('is-open');
      }, 150);
    });
  }

  // Hero Explore Button & Anchors Smooth Scroll Handler
  const heroExploreBtn = document.getElementById('hero-explore-btn');
  const parameterSection = document.getElementById('parameters');

  function scrollToParameters(e) {
    if (e) e.preventDefault();
    if (parameterSection) {
      parameterSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      parameterSection.classList.remove('highlight-pulse');
      void parameterSection.offsetWidth;
      parameterSection.classList.add('highlight-pulse');
      setTimeout(() => {
        parameterSection.classList.remove('highlight-pulse');
      }, 1500);
    }
  }

  if (heroExploreBtn) {
    heroExploreBtn.addEventListener('click', scrollToParameters);
  }

  // Dropdown Discipline Links -> Open Dedicated Detail View in Same Window
  const disciplineNavLinks = document.querySelectorAll('[data-discipline]');
  disciplineNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const discId = link.getAttribute('data-discipline');
      
      // Close mobile menu if open
      const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
      const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
      if (mobileMenuDrawer && mobileMenuDrawer.classList.contains('open')) {
        mobileMenuDrawer.classList.remove('open');
        mobileMenuToggle?.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }

      // Close desktop dropdown
      navDropdown?.classList.remove('is-open');

      if (discId) {
        e.preventDefault();
        window.location.href = `parameter-detail.html?disc=${discId}`;
      }
    });
  });

  /* ==========================================================================
     12. PARAMETER EXPLORER & QUICK VIEW MODAL
     ========================================================================== */
  initNABLParameterExplorer();

  function initNABLParameterExplorer() {
    const selectorContainer = document.getElementById('discipline-selector');
    const gridContainer = document.getElementById('parameter-grid');
    const breadcrumbContainer = document.getElementById('explorer-breadcrumbs');
    const searchInput = document.getElementById('explorer-search-input');
    const searchClear = document.getElementById('explorer-search-clear');
    const searchCounter = document.getElementById('explorer-search-counter');
    const quickModal = document.getElementById('param-quick-modal');
    const modalCloseBtn = document.getElementById('param-modal-close');
    const modalBody = document.getElementById('param-modal-body');

    if (!selectorContainer || !gridContainer || typeof NABL_SCOPE_DATA === 'undefined') {
      return;
    }

    let activeDisciplineId = null; // null means "All Disciplines"
    let searchQuery = '';

    // Global helper to select discipline from nav links
    window.selectDisciplineById = function(discId) {
      activeDisciplineId = discId === 'all' ? null : discId;
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      if (searchCounter) searchCounter.style.display = 'none';

      renderDisciplineSelector();
      renderBreadcrumbs();
      animateGridRender();
      scrollToParameters();
    };

    // Live Search Event Listeners
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        if (searchClear) {
          searchClear.style.display = searchQuery.length > 0 ? 'flex' : 'none';
        }
        renderBreadcrumbs();
        renderParameterGrid();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        searchClear.style.display = 'none';
        if (searchCounter) searchCounter.style.display = 'none';
        renderBreadcrumbs();
        renderParameterGrid();
      });
    }

    // Render Level 1 Discipline Selector (Clean 14-Category Grid for Homepage)
    function renderDisciplineSelector() {
      let html = '';

      NABL_SCOPE_DATA.disciplines.forEach(d => {
        html += `
          <button class="discipline-card-btn" data-discipline-id="${d.id}">
            <div class="discipline-icon-box">${d.icon}</div>
            <span class="discipline-card-title">${d.title}</span>
            <span class="discipline-card-code">${d.code} (${d.parameterCount} Params)</span>
          </button>
        `;
      });

      selectorContainer.innerHTML = html;

      // Event listeners for discipline buttons -> navigate directly to detail page in SAME window
      selectorContainer.querySelectorAll('.discipline-card-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const discId = btn.getAttribute('data-discipline-id');
          if (discId) {
            window.location.href = `parameter-detail.html?disc=${discId}`;
          }
        });
      });
    }

    // Helper to smoothly scroll down to parameter search results
    function scrollToGrid() {
      const gridEl = document.getElementById('parameter-grid');
      if (gridEl) {
        const topOffset = gridEl.getBoundingClientRect().top + window.pageYOffset - 110;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      }
    }

    // Render Breadcrumbs
    function renderBreadcrumbs() {
      if (!searchQuery) {
        if (breadcrumbContainer) breadcrumbContainer.style.display = 'none';
        return;
      }

      if (breadcrumbContainer) breadcrumbContainer.style.display = 'flex';
      let html = `<span class="breadcrumb-item" id="bc-root-btn">All Calibration Disciplines</span>`;
      html += ` <span class="breadcrumb-separator">/</span> <span class="breadcrumb-item active">Search: "${searchQuery}"</span>`;

      breadcrumbContainer.innerHTML = html;

      const rootBtn = document.getElementById('bc-root-btn');
      if (rootBtn) {
        rootBtn.addEventListener('click', () => {
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          if (searchClear) searchClear.style.display = 'none';
          if (searchCounter) searchCounter.style.display = 'none';
          renderBreadcrumbs();
          renderParameterGrid();
        });
      }
    }

    // Render Level 2 Parameter Grid (Populated ONLY during live search to keep homepage compact)
    function renderParameterGrid() {
      // If no search query, clear parameter grid to keep homepage sleek and short
      if (!searchQuery) {
        gridContainer.innerHTML = '';
        if (searchCounter) searchCounter.style.display = 'none';
        if (breadcrumbContainer) breadcrumbContainer.style.display = 'none';
        return;
      }

      if (breadcrumbContainer) breadcrumbContainer.style.display = 'flex';

      let parametersToRender = [];

      NABL_SCOPE_DATA.disciplines.forEach(d => {
        d.parameters.forEach(p => {
          // Apply Live Search Filter
          const nameMatch = p.name.toLowerCase().includes(searchQuery);
          const summaryMatch = p.summary && p.summary.toLowerCase().includes(searchQuery);
          const instMatch = p.instruments && p.instruments.some(inst => inst.toLowerCase().includes(searchQuery));
          const subrangeMatch = p.subRanges && p.subRanges.some(sr => 
            sr.range.toLowerCase().includes(searchQuery) || 
            (sr.resolution && sr.resolution.toLowerCase().includes(searchQuery))
          );
          const discTitleMatch = d.title.toLowerCase().includes(searchQuery);
          const discCodeMatch = d.code.toLowerCase().includes(searchQuery);

          if (nameMatch || summaryMatch || instMatch || subrangeMatch || discTitleMatch || discCodeMatch) {
            parametersToRender.push({ ...p, disciplineTitle: d.title, disciplineId: d.id, disciplineCode: d.code });
          }
        });
      });

      // Update Search Counter Badge
      if (searchCounter) {
        searchCounter.textContent = `Found ${parametersToRender.length} parameters matching "${searchQuery}"`;
        searchCounter.style.display = 'inline-block';
      }

      if (parametersToRender.length === 0) {
        gridContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 36px; background: var(--clinical-white); border: 1px dashed var(--border-grey); border-radius: var(--border-radius-card);">
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="var(--text-muted)" stroke-width="1.5" fill="none" style="margin-bottom: 8px;">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h4 style="font-size: 1rem; color: var(--deep-ink-navy); margin-bottom: 4px;">No matching parameters found</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Try searching for a different instrument (e.g. "Multimeter", "Pressure", "Thermal") or click a discipline card above.</p>
          </div>
        `;
        return;
      }

      let html = '';
      parametersToRender.forEach(param => {
        const instrumentsPreview = param.instruments ? param.instruments.slice(0, 3).join(' • ') : 'Standard Reference';
        const subrangePills = param.subRanges ? param.subRanges.map(sr => `<span class="subrange-pill" title="Resolution: ${sr.resolution}">${sr.range}</span>`).join('') : '';

        html += `
          <div class="explorer-param-card" data-param-id="${param.id}" data-disc-id="${param.disciplineId}" style="cursor: pointer;">
            <div>
              <span class="explorer-param-category">${param.disciplineTitle} // ${param.disciplineCode}</span>
              <h4 class="explorer-param-name">${param.name}</h4>
              <div class="explorer-param-subranges">
                ${subrangePills}
              </div>
              <p class="explorer-param-instruments-preview font-mono">Calibrated: ${instrumentsPreview}</p>
            </div>
            <div class="explorer-param-actions">
              <button class="explorer-param-btn quick-view-btn" data-param-id="${param.id}" data-disc-id="${param.disciplineId}">
                <span>View Details &amp; Photos ↗</span>
              </button>
              <button class="explorer-param-btn-secondary quote-param-btn" data-disc-id="${param.disciplineId}" data-param-name="${param.name}">
                Request Quote
              </button>
            </div>
          </div>
        `;
      });

      gridContainer.innerHTML = html;

      // Card-level click listener -> open parameter detail page in SAME window
      gridContainer.querySelectorAll('.explorer-param-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('.quote-param-btn') && !e.target.closest('.explorer-param-link-out')) {
            const discId = card.getAttribute('data-disc-id');
            const paramId = card.getAttribute('data-param-id');
            window.location.href = `parameter-detail.html?disc=${discId}&param=${paramId}`;
          }
        });
      });

      // Event listeners for Quote buttons
      gridContainer.querySelectorAll('.quote-param-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const discId = btn.getAttribute('data-disc-id');
          const paramName = btn.getAttribute('data-param-name');
          openEnquiryWithService(discId, paramName);
        });
      });
    }

    // Open Quick View Modal
    function openQuickViewModal(discId, paramId) {
      const discObj = NABL_SCOPE_DATA.disciplines.find(d => d.id === discId);
      const paramObj = discObj?.parameters.find(p => p.id === paramId);

      if (!paramObj || !quickModal || !modalBody) return;

      let rangesHtml = '';
      if (paramObj.subRanges && paramObj.subRanges.length > 0) {
        rangesHtml = `
          <h4 class="modal-section-title">Measurement Ranges & Resolution</h4>
          <div class="ranges-table-wrapper">
            <table class="modal-ranges-table">
              <thead>
                <tr>
                  <th>Calibration Range</th>
                  <th>Resolution / Capability</th>
                </tr>
              </thead>
              <tbody>
                ${paramObj.subRanges.map(sr => `
                  <tr>
                    <td><strong>${sr.range}</strong></td>
                    <td>${sr.resolution}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
      }

      let instHtml = '';
      if (paramObj.instruments && paramObj.instruments.length > 0) {
        instHtml = `
          <h4 class="modal-section-title">Supported Calibrated Instruments</h4>
          <div class="modal-instruments-list">
            ${paramObj.instruments.map(inst => `<span class="modal-inst-chip">✔ ${inst}</span>`).join('')}
          </div>
        `;
      }

      let imgHtml = '';
      if (paramObj.images && paramObj.images.length > 0) {
        imgHtml = `
          <h4 class="modal-section-title">Master Reference Equipment</h4>
          <img src="${paramObj.images[0].src}" alt="${paramObj.images[0].alt}" class="modal-image-preview">
        `;
      }

      modalBody.innerHTML = `
        <div class="modal-header">
          <span class="modal-disc-badge">${discObj.title} // ${discObj.code}</span>
          <h3 class="modal-title">${paramObj.name} Calibration</h3>
          <p class="modal-summary">${paramObj.summary}</p>
        </div>
        ${rangesHtml}
        ${instHtml}
        ${imgHtml}
        <div class="modal-actions-bar">
          <button class="btn btn-primary btn-rect open-modal-quote-btn" data-disc-id="${discId}" data-param-name="${paramObj.name}">
            REQUEST QUOTE FOR ${paramObj.name.toUpperCase()}
          </button>
          <a href="parameter-detail.html?disc=${discId}&param=${paramId}" class="btn btn-secondary btn-rect">
            Open Full Specifications Page ↗
          </a>
        </div>
      `;

      quickModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('no-scroll');

      // Modal Quote CTA
      const modalQuoteBtn = modalBody.querySelector('.open-modal-quote-btn');
      if (modalQuoteBtn) {
        modalQuoteBtn.addEventListener('click', () => {
          closeQuickModal();
          openEnquiryWithService(discId, paramObj.name);
        });
      }
    }

    function closeQuickModal() {
      if (quickModal) {
        quickModal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.classList.remove('no-scroll');
      }
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeQuickModal);
    }

    if (quickModal) {
      quickModal.addEventListener('click', (e) => {
        if (e.target === quickModal) {
          closeQuickModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && quickModal && quickModal.style.display === 'flex') {
        closeQuickModal();
      }
    });

    // Helper to open Quick Enquiry Sidebar with pre-selected discipline
    function openEnquiryWithService(discId, paramName) {
      const sidebar = document.getElementById('enquiry-sidebar');
      const serviceSelect = document.getElementById('eq-service');
      const messageField = document.getElementById('eq-message');

      if (serviceSelect && discId) {
        const discToServiceMap = {
          'electrical': 'electrical',
          'temperature': 'temperature',
          'pressure': 'pressure',
          'dimensional': 'dimensional',
          'force-torque': 'torque',
          'mass': 'torque',
          'flow': 'custom',
          'humidity': 'temperature'
        };
        const mappedService = discToServiceMap[discId] || 'custom';
        serviceSelect.value = mappedService;
      }

      if (messageField && paramName) {
        messageField.value = `Enquiry regarding calibration for parameter: ${paramName}`;
      }

      if (sidebar) {
        sidebar.classList.add('open');
        setTimeout(() => {
          document.getElementById('eq-name')?.focus();
        }, 300);
      }
    }

    // Initial render call
    renderDisciplineSelector();
    renderBreadcrumbs();
    renderParameterGrid();
  }

});

