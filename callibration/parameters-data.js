/**
 * Teflon Instruments — Calibration Scope & Parameter Explorer Data
 *
 * Comprehensive breakdown of all 14 calibration disciplines.
 * Each subpart/subcategory from the scope catalog is an explicit parameter card
 * featuring exact technical ranges, supported instruments, and verified reference images.
 *
 * IMAGE MAPPING (22 assets → parameter assignments):
 *   fluke_calibrator.png       → Electrical: Voltage, Current, Resistance, Capacitance, Inductance, Frequency, Insulation Resistance
 *   energy_meter.png           → Electrical: Power, Energy, Power Factor
 *   dry_block.png              → Temperature: General, RTD, Process Temperature Transmitters
 *   infrared_pyrometer.png     → Temperature: Thermocouple (high-temp visual)
 *   digital_pressure_gauge.png → Pressure: Positive, Vacuum, Differential, Process Pressure Transmitters
 *   deadweight_tester.png      → Pressure: Primary standard (positive pressure)
 *   humidity_chamber.png       → Humidity: RH, Dew Point
 *   proving_ring.png           → Force & Torque: Force, Compression, Compressive Force (MT)
 *   load_cell.png              → Force & Torque: Tension, Compression, Tensile Force (MT)
 *   universal_testing_machine  → Force & Torque: Tension (FT), Tensile/Bending/Peel/Elongation (MT)
 *   torque_wrench.png          → Force & Torque: Torque, Spring & Torque Testing (MT)
 *   vernier_micrometer.png     → Dimensional: Length, Thickness, Depth, Diameter
 *   gauge_blocks.png           → Dimensional: Length (secondary), Height
 *   analytical_balance.png     → Mass: Weight
 *   flow_meter.png             → Flow: Water, Air, Gas, Liquid, Process Flow
 *   speed_tachometer.png       → Speed & Time: RPM, Rotational Speed, Time
 *   sound_vibration_meter.png  → Sound & Vibration: Sound Level, Vibration
 *   lux_meter.png              → Light: Lux, Illuminance
 *   lab_ph_conductivity.png    → Laboratory: pH, Conductivity, TDS, DO
 *   insight_machinery.png      → Mechanical Testing: Hardness, Impact
 *   insight_technician.png     → Process: Level Transmitters, Earth Resistance
 *   facility_panoramic.png     → (used in insights section, not parameters)
 */

const NABL_SCOPE_DATA = {
  disciplines: [

    /* ──────────────────────────────────────────────
       1. ELECTRICAL
    ────────────────────────────────────────────── */
    {
      id: "electrical",
      code: "ELEC-01",
      title: "Electrical",
      description: "Voltage, current, resistance, capacitance, inductance, frequency, power, energy, power factor, insulation resistance, and earth resistance.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      parameterCount: 11,
      parameters: [
        {
          id: "elec-voltage",
          name: "Voltage",
          summary: "Precision DC and AC voltage calibration for voltmeters, multimeters, oscilloscopes, and process calibrators.",
          subRanges: [
            { range: "1 mV to 1000 V DC", resolution: "0.1 µV" },
            { range: "1 mV to 1000 V AC (10 Hz – 100 kHz)", resolution: "1 µV" }
          ],
          instruments: [
            "Multimeter (up to 8.5 digits)",
            "Oscilloscope",
            "Process Calibrator"
          ],
          images: [
            {
              src: "assets/images/fluke_multimeter.png",
              title: "Fluke 8846A 6.5 Digit Precision Multimeter",
              alt: "Precision bench multimeter displaying 8.5 digit DC voltage measurement"
            },
            {
              src: "assets/images/fluke_calibrator.png",
              title: "Multifunction Voltage Reference Calibrator",
              alt: "Fluke 5522A reference calibrator outputting DC and AC voltage"
            }
          ]
        },
        {
          id: "elec-current",
          name: "Current",
          summary: "DC and AC current calibration for ammeters, clamp meters, current shunts, and 4-20 mA loop calibrators.",
          subRanges: [
            { range: "10 µA to 100 A DC", resolution: "0.01 µA" },
            { range: "10 µA to 1000 A AC (50 Hz – 1 kHz)", resolution: "0.1 µA" }
          ],
          instruments: [
            "Clamp Meter",
            "Multimeter",
            "Process Calibrator"
          ],
          images: [
            {
              src: "assets/images/fluke_calibrator.png",
              title: "Multifunction Current Reference Source",
              alt: "Fluke calibrator providing reference current output for ammeter calibration"
            },
            {
              src: "assets/images/fluke_multimeter.png",
              title: "Precision Bench Current Meter Standard",
              alt: "6.5 digit precision bench multimeter reading current input"
            }
          ]
        },
        {
          id: "elec-resistance",
          name: "Resistance",
          summary: "Low-to-high resistance calibration for decade boxes, micro-ohm meters, meggers, and process calibrators.",
          subRanges: [
            { range: "1 mΩ to 100 MΩ", resolution: "1 µΩ" }
          ],
          instruments: [
            "Multimeter",
            "Megger",
            "Process Calibrator"
          ],
          images: [
            {
              src: "assets/images/fluke_calibrator.png",
              title: "Standard Resistance Calibration Bench",
              alt: "Fluke reference calibrator outputting standard resistance values"
            },
            {
              src: "assets/images/fluke_multimeter.png",
              title: "Precision 4-Wire Ohmmeter Standard",
              alt: "Bench multimeter measuring 4-wire precision resistance"
            }
          ]
        },
        {
          id: "elec-capacitance",
          name: "Capacitance",
          summary: "Testing and verification for LCR meters, standard capacitors, component bridges, and oscilloscopes.",
          subRanges: [
            { range: "1 pF to 100 µF", resolution: "0.01 pF" }
          ],
          instruments: [
            "LCR Meter",
            "Oscilloscope"
          ],
          images: [
            {
              src: "assets/images/lcr_meter.png",
              title: "Keysight Precision LCR Meter Standard",
              alt: "Keysight benchtop precision LCR meter measuring capacitance with Kelvin clips"
            },
            {
              src: "assets/images/fluke_calibrator.png",
              title: "Capacitance Reference Calibrator",
              alt: "Multifunction calibrator configured for capacitance verification"
            }
          ]
        },
        {
          id: "elec-inductance",
          name: "Inductance",
          summary: "Precision testing for LCR meters, component analyzers, and standard inductors.",
          subRanges: [
            { range: "10 µH to 10 H", resolution: "0.1 µH" }
          ],
          instruments: [
            "LCR Meter"
          ],
          images: [
            {
              src: "assets/images/lcr_meter.png",
              title: "Keysight Inductance & LCR Meter Calibration",
              alt: "Precision LCR meter measuring inductance and Q-factor"
            }
          ]
        },
        {
          id: "elec-frequency",
          name: "Frequency",
          summary: "Calibration for oscilloscopes, frequency counters, multimeters, and process calibrators.",
          subRanges: [
            { range: "0.1 Hz to 1 GHz", resolution: "0.001 Hz" }
          ],
          instruments: [
            "Oscilloscope",
            "Multimeter",
            "Power Analyzer",
            "Process Calibrator"
          ],
          images: [
            {
              src: "assets/images/fluke_calibrator.png",
              title: "Precision Frequency & Time Signal Generator",
              alt: "Fluke calibrator providing frequency signal references for oscilloscopes"
            }
          ]
        },
        {
          id: "elec-power",
          name: "Power",
          summary: "Single and 3-phase active, reactive, and apparent power calibration.",
          subRanges: [
            { range: "10 W to 100 kW", resolution: "0.01 W" }
          ],
          instruments: [
            "Power Analyzer",
            "Energy Meter"
          ],
          images: [
            {
              src: "assets/images/power_analyzer.png",
              title: "Yokogawa 3-Phase Digital Power Analyzer Master",
              alt: "Industrial Yokogawa 3-phase power analyzer showing voltage, current and active power"
            },
            {
              src: "assets/images/energy_meter.png",
              title: "3-Phase Power Monitoring Master Standard",
              alt: "3-phase power monitoring system"
            }
          ]
        },
        {
          id: "elec-energy",
          name: "Energy",
          summary: "Static and electromechanical energy meter testing for industrial power monitoring.",
          subRanges: [
            { range: "0.01 kWh to 9999 kWh (5 A to 100 A)", resolution: "0.001 kWh" }
          ],
          instruments: [
            "Energy Meter",
            "Power Analyzer"
          ],
          images: [
            {
              src: "assets/images/energy_meter.png",
              title: "kWh Energy Meter Calibration Standard",
              alt: "DIN-rail 3-phase energy meter test standard"
            },
            {
              src: "assets/images/power_analyzer.png",
              title: "3-Phase Energy & Power Measurement Standard",
              alt: "Digital power analyzer configured for kWh energy meter testing"
            }
          ]
        },
        {
          id: "elec-power-factor",
          name: "Power Factor",
          summary: "Lead/lag power factor verification for single and 3-phase power analyzers.",
          subRanges: [
            { range: "-1.00 to +1.00 Power Factor", resolution: "0.001" }
          ],
          instruments: [
            "Power Analyzer"
          ],
          images: [
            {
              src: "assets/images/power_analyzer.png",
              title: "Digital Power Factor & Phase Angle Analyzer",
              alt: "Yokogawa power analyzer displaying power factor and phase angle"
            },
            {
              src: "assets/images/energy_meter.png",
              title: "Power Quality Monitor Standard",
              alt: "Power quality monitor displaying real-time power factor readings"
            }
          ]
        },
        {
          id: "elec-insulation-resistance",
          name: "Insulation Resistance",
          summary: "High voltage megohm testing up to 5 kV DC for insulation testers and meggers.",
          subRanges: [
            { range: "100 kΩ to 1 TΩ (100 V, 500 V, 1000 V, 2500 V, 5000 V DC)", resolution: "1 kΩ" }
          ],
          instruments: [
            "Megger",
            "Multimeter"
          ],
          images: [
            {
              src: "assets/images/megger_insulation.png",
              title: "Megger S1 5 kV Insulation Resistance Tester",
              alt: "Megger 5 kV DC insulation resistance tester reading Tera-ohm high resistance"
            },
            {
              src: "assets/images/fluke_calibrator.png",
              title: "High Resistance Calibration Box Standard",
              alt: "High voltage resistance standard for megohmmeter calibration"
            }
          ]
        },
        {
          id: "elec-earth-resistance",
          name: "Earth Resistance",
          summary: "Earth resistance tester and grounding pit tester calibration for electrical safety compliance.",
          subRanges: [
            { range: "0.01 Ω to 2000 Ω", resolution: "0.01 Ω" }
          ],
          instruments: [
            "Earth Tester",
            "Clamp Meter"
          ],
          images: [
            {
              src: "assets/images/insight_technician.png",
              title: "Earth Tester Safety Calibration Station",
              alt: "Technician conducting ground earth tester calibration using precision standards"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       2. TEMPERATURE
    ────────────────────────────────────────────── */
    {
      id: "temperature",
      code: "TEMP-02",
      title: "Temperature",
      description: "Temperature sensors, RTDs, thermocouples, dry blocks, environmental chambers, ovens, and furnaces.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`,
      parameterCount: 3,
      parameters: [
        {
          id: "temp-general",
          name: "Temperature",
          summary: "General temperature indicator, glass stem thermometer, and chamber temperature profiling.",
          subRanges: [
            { range: "-30 °C to 650 °C (Dry Block Well)", resolution: "0.01 °C" },
            { range: "650 °C to 1200 °C (High-Temp Furnace)", resolution: "0.1 °C" }
          ],
          instruments: [
            "Thermometer",
            "Dry Block",
            "Oven",
            "Furnace",
            "Incubator",
            "Freezer",
            "Temperature Chamber"
          ],
          images: [
            {
              src: "assets/images/dry_block.png",
              title: "Dry Block Temperature Calibrator",
              alt: "Fluke dry block calibrator with digital temperature controller"
            }
          ]
        },
        {
          id: "temp-rtd",
          name: "RTD",
          summary: "Contact RTD temperature probe calibration (Pt100, Pt1000, Ni120) across cryogenic to elevated temperatures.",
          subRanges: [
            { range: "-80 °C to 650 °C", resolution: "0.01 °C" }
          ],
          instruments: [
            "RTD",
            "Thermometer",
            "Dry Block"
          ],
          images: [
            {
              src: "assets/images/dry_block.png",
              title: "Master RTD Probe Calibration Well",
              alt: "Fluke 9172 dry block calibrator with master Pt100 RTD probe"
            }
          ]
        },
        {
          id: "temp-thermocouple",
          name: "Thermocouple",
          summary: "Calibration for noble and base metal thermocouples (Type J, K, T, E, R, S, N, B).",
          subRanges: [
            { range: "-30 °C to 1200 °C", resolution: "0.1 °C" }
          ],
          instruments: [
            "Thermocouple",
            "Thermometer",
            "Dry Block",
            "Furnace"
          ],
          images: [
            {
              src: "assets/images/infrared_pyrometer.png",
              title: "High-Temperature Thermocouple & IR Pyrometer Reference",
              alt: "Infrared pyrometer and thermocouple calibration at elevated temperatures"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       3. PRESSURE
    ────────────────────────────────────────────── */
    {
      id: "pressure",
      code: "PRES-03",
      title: "Pressure",
      description: "Pressure gauges, digital master pressure gauges, pressure transmitters, vacuum meters, differential pressure sensors, and manometers.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
      parameterCount: 3,
      parameters: [
        {
          id: "pres-positive",
          name: "Pressure",
          summary: "Pneumatic and hydraulic positive pressure calibration for dial gauges, digital masters, and transmitters.",
          subRanges: [
            { range: "-1 bar to 35 bar (Pneumatic)", resolution: "0.001 bar" },
            { range: "0 bar to 700 bar (Hydraulic)", resolution: "0.01 bar" }
          ],
          instruments: [
            "Pressure Gauge",
            "Digital Pressure Gauge",
            "Pressure Transmitter",
            "Pressure Switch"
          ],
          images: [
            {
              src: "assets/images/digital_pressure_gauge.png",
              title: "Digital Master Pressure Gauge — Hydraulic Bench",
              alt: "Ametek Crystal digital master gauge mounted on hydraulic hand pump"
            },
            {
              src: "assets/images/deadweight_tester.png",
              title: "Deadweight Tester Primary Pressure Reference",
              alt: "Ashcroft deadweight tester with precision brass weights"
            }
          ]
        },
        {
          id: "pres-vacuum",
          name: "Vacuum",
          summary: "Sub-atmospheric vacuum pressure calibration for vacuum gauges, suction transmitters, and controllers.",
          subRanges: [
            { range: "0 to -760 mmHg (-1 bar gauge)", resolution: "0.1 mmHg" }
          ],
          instruments: [
            "Vacuum Gauge",
            "Digital Pressure Gauge",
            "Manometer"
          ],
          images: [
            {
              src: "assets/images/digital_pressure_gauge.png",
              title: "Digital Vacuum Reference Master Gauge",
              alt: "Digital master gauge measuring sub-atmospheric vacuum levels"
            }
          ]
        },
        {
          id: "pres-differential",
          name: "Differential Pressure",
          summary: "Low differential pressure calibration for draft gauges, cleanroom DP transmitters, and U-tube manometers.",
          subRanges: [
            { range: "0 to 1000 mmH2O (0 to 100 mbar)", resolution: "0.01 mmH2O" }
          ],
          instruments: [
            "Pressure Transmitter",
            "Pressure Switch",
            "Manometer",
            "Digital Pressure Gauge"
          ],
          images: [
            {
              src: "assets/images/deadweight_tester.png",
              title: "Differential Pressure Calibration Setup",
              alt: "Deadweight tester and master gauge connected to differential pressure transmitter"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       4. HUMIDITY
    ────────────────────────────────────────────── */
    {
      id: "humidity",
      code: "HUM-04",
      title: "Humidity",
      description: "Relative humidity, dew point meters, hygrometers, thermo-hygrometers, RH loggers, and humidity chambers.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
      parameterCount: 2,
      parameters: [
        {
          id: "hum-rh",
          name: "Relative Humidity",
          summary: "Relative humidity (%RH) testing for digital thermo-hygrometers, cleanroom sensors, and data loggers.",
          subRanges: [
            { range: "10 %RH to 95 %RH (at 15 °C to 50 °C)", resolution: "0.1 %RH" }
          ],
          instruments: [
            "Hygrometer",
            "Thermo-Hygrometer",
            "Humidity Chamber",
            "RH Logger"
          ],
          images: [
            {
              src: "assets/images/humidity_chamber.png",
              title: "Environmental Relative Humidity Chamber",
              alt: "Humidity calibration chamber with thermo-hygrometer probe"
            }
          ]
        },
        {
          id: "hum-dewpoint",
          name: "Dew Point",
          summary: "Sub-zero and ambient dew point temperature calibration for chilled mirror and capacitive meters.",
          subRanges: [
            { range: "-20 °C to +30 °C Dew Point", resolution: "0.1 °C dp" }
          ],
          instruments: [
            "Thermo-Hygrometer",
            "RH Logger",
            "Hygrometer"
          ],
          images: [
            {
              src: "assets/images/humidity_chamber.png",
              title: "Dew Point Meter Reference Generator",
              alt: "Humidity chamber configured for dew point probe verification"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       5. FORCE & TORQUE
    ────────────────────────────────────────────── */
    {
      id: "force-torque",
      code: "FT-05",
      title: "Force & Torque",
      description: "Force, compression, tension, and torque measurement using UTM, CTM, load cells, force gauges, torque wrenches, and torque testers.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v8H2z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
      parameterCount: 4,
      parameters: [
        {
          id: "ft-force",
          name: "Force",
          summary: "Static and dynamic force calibration for testing machines, proving rings, master load cells, and force gauges.",
          subRanges: [
            { range: "10 N to 500 kN", resolution: "1 N" }
          ],
          instruments: [
            "UTM",
            "CTM",
            "Load Cell",
            "Force Gauge"
          ],
          images: [
            {
              src: "assets/images/proving_ring.png",
              title: "50 kN Steel Proving Ring Master Standard",
              alt: "Proving ring standard certified under ISO 17025"
            },
            {
              src: "assets/images/load_cell.png",
              title: "NIST-Traceable Master Load Cell",
              alt: "Master load cell with digital indicator readout"
            }
          ]
        },
        {
          id: "ft-compression",
          name: "Compression",
          summary: "Compressive force testing for compression testing machines (CTM), load cells, and press force monitors.",
          subRanges: [
            { range: "10 N to 500 kN", resolution: "1 N" }
          ],
          instruments: [
            "CTM",
            "UTM",
            "Load Cell",
            "Force Gauge"
          ],
          images: [
            {
              src: "assets/images/load_cell.png",
              title: "Compression Load Cell Master Standard",
              alt: "High capacity load cell configured for compressive force verification"
            },
            {
              src: "assets/images/proving_ring.png",
              title: "Compression Proving Ring Standard",
              alt: "Proving ring mounted on compression test frame"
            }
          ]
        },
        {
          id: "ft-tension",
          name: "Tension",
          summary: "Tensile force calibration for universal testing machines (UTM), crane scales, and push-pull force gauges.",
          subRanges: [
            { range: "10 N to 500 kN", resolution: "1 N" }
          ],
          instruments: [
            "UTM",
            "Load Cell",
            "Force Gauge"
          ],
          images: [
            {
              src: "assets/images/universal_testing_machine.png",
              title: "Universal Testing Machine (UTM) Tensile Frame",
              alt: "UTM conducting tensile test with electronic load cell"
            },
            {
              src: "assets/images/load_cell.png",
              title: "Tensile Load Cell Master Standard",
              alt: "Master load cell standard for tensile testing equipment"
            }
          ]
        },
        {
          id: "ft-torque",
          name: "Torque",
          summary: "Calibration of click-type, dial, and digital torque wrenches, screwdrivers, and torque transducers.",
          subRanges: [
            { range: "1 Nm to 1000 Nm", resolution: "0.1 Nm" }
          ],
          instruments: [
            "Torque Wrench",
            "Torque Tester"
          ],
          images: [
            {
              src: "assets/images/torque_wrench.png",
              title: "Digital Torque Wrench Calibration Rig",
              alt: "Torque wrench mounted on Futek transducer calibration stand"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       6. DIMENSIONAL
    ────────────────────────────────────────────── */
    {
      id: "dimensional",
      code: "DIM-06",
      title: "Dimensional",
      description: "Length, thickness, height, depth, and diameter metrology using calipers, micrometers, dial gauges, height gauges, bore gauges, and depth gauges.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="10" rx="2"></rect><line x1="6" y1="7" x2="6" y2="11"></line><line x1="10" y1="7" x2="10" y2="13"></line><line x1="14" y1="7" x2="14" y2="11"></line><line x1="18" y1="7" x2="18" y2="13"></line></svg>`,
      parameterCount: 5,
      parameters: [
        {
          id: "dim-length",
          name: "Length",
          summary: "Linear length calibration for vernier calipers, steel rules, glass scales, and laser measuring tools.",
          subRanges: [
            { range: "0 mm to 300 mm (Calipers & Micrometers)", resolution: "0.01 mm" },
            { range: "0 mm to 1000 mm (Steel Rules)", resolution: "0.5 mm" }
          ],
          instruments: [
            "Vernier Caliper",
            "Micrometer",
            "Dial Gauge"
          ],
          images: [
            {
              src: "assets/images/vernier_micrometer.png",
              title: "Digital Caliper & Micrometer Metrology Bench",
              alt: "Mahr digital caliper alongside Mitutoyo micrometer on metrology bench"
            },
            {
              src: "assets/images/gauge_blocks.png",
              title: "Grade 0 Master Gauge Block Set",
              alt: "Mitutoyo Grade 0 steel gauge block set in walnut wooden box"
            }
          ]
        },
        {
          id: "dim-thickness",
          name: "Thickness",
          summary: "Thickness foil, feeler gauge, wall thickness micrometer, and ultrasonic thickness gauge calibration.",
          subRanges: [
            { range: "0 mm to 150 mm", resolution: "0.001 mm" }
          ],
          instruments: [
            "Micrometer",
            "Vernier Caliper",
            "Dial Gauge"
          ],
          images: [
            {
              src: "assets/images/vernier_micrometer.png",
              title: "Outside Micrometer Thickness Measurement",
              alt: "Outside micrometer alongside certified gauge block set"
            }
          ]
        },
        {
          id: "dim-height",
          name: "Height",
          summary: "Digital and counter height gauge calibration on precision black granite surface plates.",
          subRanges: [
            { range: "0 mm to 600 mm", resolution: "0.001 mm" }
          ],
          instruments: [
            "Height Gauge",
            "Dial Gauge"
          ],
          images: [
            {
              src: "assets/images/gauge_blocks.png",
              title: "Gauge Block Height Reference Standard",
              alt: "Grade 0 gauge blocks used for height gauge verification on granite plate"
            }
          ]
        },
        {
          id: "dim-depth",
          name: "Depth",
          summary: "Depth micrometer, depth vernier caliper, and electronic depth indicator calibration.",
          subRanges: [
            { range: "0 mm to 300 mm", resolution: "0.001 mm" }
          ],
          instruments: [
            "Depth Gauge",
            "Vernier Caliper",
            "Micrometer"
          ],
          images: [
            {
              src: "assets/images/vernier_micrometer.png",
              title: "Depth Measuring Instruments & Gauge Blocks",
              alt: "Depth caliper and micrometer on metrology workbench"
            }
          ]
        },
        {
          id: "dim-diameter",
          name: "Diameter",
          summary: "Internal and external diameter testing for three-point bore gauges, ring gauges, and plug gauges.",
          subRanges: [
            { range: "1 mm to 300 mm", resolution: "0.001 mm" }
          ],
          instruments: [
            "Bore Gauge",
            "Micrometer",
            "Vernier Caliper",
            "Dial Gauge"
          ],
          images: [
            {
              src: "assets/images/vernier_micrometer.png",
              title: "Precision Internal & External Diameter Measurement",
              alt: "Micrometer and vernier caliper used for diameter metrology"
            },
            {
              src: "assets/images/gauge_blocks.png",
              title: "Gauge Block Diameter Reference Standards",
              alt: "Gauge block set used as reference standards for bore gauge calibration"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       7. MASS
    ────────────────────────────────────────────── */
    {
      id: "mass",
      code: "MASS-07",
      title: "Mass",
      description: "Weight calibration for micro, analytical, precision balances, platform scales, and standard reference weights.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M3 9l9-6 9 6M3 9l4 10h10l4-10"></path></svg>`,
      parameterCount: 1,
      parameters: [
        {
          id: "mass-weight",
          name: "Weight",
          summary: "Calibration of standard test weights (Classes E2, F1, F2, M1) and electronic balances from 0.1 mg to 500 kg.",
          subRanges: [
            { range: "1 mg to 220 g (Analytical Balances)", resolution: "0.01 mg" },
            { range: "100 g to 500 kg (Industrial Platform Scales)", resolution: "0.1 g" }
          ],
          instruments: [
            "Analytical Balance",
            "Precision Balance",
            "Platform Scale",
            "Standard Weights"
          ],
          images: [
            {
              src: "assets/images/analytical_balance.png",
              title: "Mettler Toledo Analytical Balance & Standard Weight",
              alt: "Analytical balance with glass draft shield and 100g Class F1 stainless steel weight"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       8. FLOW
    ────────────────────────────────────────────── */
    {
      id: "flow",
      code: "FLOW-08",
      title: "Flow",
      description: "Flow rate calibration for water, air, gas, and liquid flow meters, rotameters, and ultrasonic meters.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
      parameterCount: 4,
      parameters: [
        {
          id: "flow-water",
          name: "Water Flow",
          summary: "Volumetric and gravimetric water flow calibration for turbine, electromagnetic, and ultrasonic meters.",
          subRanges: [
            { range: "1 L/h to 5000 L/h", resolution: "0.1 L/h" }
          ],
          instruments: [
            "Flow Meter",
            "Rotameter",
            "Ultrasonic Flow Meter"
          ],
          images: [
            {
              src: "assets/images/flow_meter.png",
              title: "Stainless Steel Water Flow Calibration Rig",
              alt: "Master flow rig with electromagnetic and turbine flow meters"
            }
          ]
        },
        {
          id: "flow-air",
          name: "Air Flow",
          summary: "Pneumatic air flow calibration for rotameters, mass flow meters, and thermal anemometers.",
          subRanges: [
            { range: "0.1 LPM to 200 LPM", resolution: "0.01 LPM" }
          ],
          instruments: [
            "Flow Meter",
            "Rotameter"
          ],
          images: [
            {
              src: "assets/images/flow_meter.png",
              title: "Master Gas & Air Flow Calibrator Panel",
              alt: "Flow calibration manifold valves and digital readout panel"
            }
          ]
        },
        {
          id: "flow-gas",
          name: "Gas Flow",
          summary: "Gas mass flow controller (MFC) and variable area rotameter calibration.",
          subRanges: [
            { range: "0.1 LPM to 200 LPM", resolution: "0.01 LPM" }
          ],
          instruments: [
            "Flow Meter",
            "Rotameter"
          ],
          images: [
            {
              src: "assets/images/flow_meter.png",
              title: "Gas Mass Flow Controller Test Station",
              alt: "Precision flow rig used as gas reference standard"
            }
          ]
        },
        {
          id: "flow-liquid",
          name: "Liquid Flow",
          summary: "Industrial liquid flow meter calibration for oils, fuels, solvents, and chemical process lines.",
          subRanges: [
            { range: "1 L/h to 5000 L/h", resolution: "0.1 L/h" }
          ],
          instruments: [
            "Flow Meter",
            "Rotameter",
            "Ultrasonic Flow Meter"
          ],
          images: [
            {
              src: "assets/images/flow_meter.png",
              title: "Industrial Liquid Flow Meter Rig",
              alt: "Full stainless flow calibration rig with manifold valves and digital panel"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       9. SPEED & TIME
    ────────────────────────────────────────────── */
    {
      id: "speed-time",
      code: "ST-09",
      title: "Speed & Time",
      description: "RPM, rotational speed, optical tachometers, stroboscopes, digital stopwatches, and timers.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      parameterCount: 3,
      parameters: [
        {
          id: "st-rpm",
          name: "RPM",
          summary: "Rotations per minute (RPM) testing for optical laser tachometers and contact tachometers.",
          subRanges: [
            { range: "10 RPM to 99,999 RPM", resolution: "0.1 RPM" }
          ],
          instruments: [
            "Tachometer",
            "Stroboscope"
          ],
          images: [
            {
              src: "assets/images/speed_tachometer.png",
              title: "Laser Tachometer RPM Calibrator",
              alt: "Digital optical tachometer aiming laser at rotating motor shaft"
            }
          ]
        },
        {
          id: "st-rotational-speed",
          name: "Rotational Speed",
          summary: "Stroboscopic flash rate and non-contact motor shaft rotational speed calibration.",
          subRanges: [
            { range: "10 RPM to 99,999 RPM", resolution: "0.1 RPM" }
          ],
          instruments: [
            "Tachometer",
            "Stroboscope"
          ],
          images: [
            {
              src: "assets/images/speed_tachometer.png",
              title: "Stroboscope & Optical Speed Calibration Station",
              alt: "Stroboscope flash calibrator with digital LED RPM display panel"
            }
          ]
        },
        {
          id: "st-time",
          name: "Time",
          summary: "Calibration for digital stopwatches, industrial process timers, and time totalizers.",
          subRanges: [
            { range: "1 s to 24 Hours", resolution: "0.01 s" }
          ],
          instruments: [
            "Stopwatch",
            "Timer"
          ],
          images: [
            {
              src: "assets/images/speed_tachometer.png",
              title: "Precision Time Base & Interval Calibration Standard",
              alt: "Digital tachometer system used for time interval verification"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       10. SOUND & VIBRATION
    ────────────────────────────────────────────── */
    {
      id: "sound-vibration",
      code: "SV-10",
      title: "Sound & Vibration",
      description: "Sound level meters, decibel meters, acoustic calibrators, vibration meters, and accelerometers.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4"></path></svg>`,
      parameterCount: 2,
      parameters: [
        {
          id: "sv-sound-level",
          name: "Sound Level",
          summary: "Decibel (dB) acoustic calibration for Class 1 and Class 2 sound level meters using acoustic calibrators.",
          subRanges: [
            { range: "30 dB to 130 dB (at 125 Hz to 8 kHz)", resolution: "0.1 dB" }
          ],
          instruments: [
            "Sound Level Meter"
          ],
          images: [
            {
              src: "assets/images/sound_vibration_meter.png",
              title: "Sound Level Meter Acoustic Calibration",
              alt: "Digital sound level meter connected to acoustic reference calibrator"
            }
          ]
        },
        {
          id: "sv-vibration",
          name: "Vibration",
          summary: "Vibration acceleration, velocity, and displacement calibration for industrial accelerometers.",
          subRanges: [
            { range: "0.1 m/s² to 200 m/s² (Acceleration)", resolution: "0.01 m/s²" },
            { range: "0.1 mm/s to 100 mm/s (Velocity)", resolution: "0.01 mm/s" }
          ],
          instruments: [
            "Vibration Meter"
          ],
          images: [
            {
              src: "assets/images/sound_vibration_meter.png",
              title: "Vibration Meter & Accelerometer Test Bench",
              alt: "Vibration meter sensor mounted on shaker table calibrator"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       11. LIGHT
    ────────────────────────────────────────────── */
    {
      id: "light",
      code: "LGT-11",
      title: "Light",
      description: "Lux, illuminance, brightness, photometric sensors, and lux meter calibration.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
      parameterCount: 2,
      parameters: [
        {
          id: "lgt-lux",
          name: "Lux",
          summary: "Photometric illuminance (Lux) calibration for digital lux meters and light intensity sensors.",
          subRanges: [
            { range: "0 Lux to 50,000 Lux", resolution: "1 Lux" }
          ],
          instruments: [
            "Lux Meter"
          ],
          images: [
            {
              src: "assets/images/lux_meter.png",
              title: "Digital Lux Meter Calibration Bench",
              alt: "Lux meter probe placed under standard photometric lamp source"
            }
          ]
        },
        {
          id: "lgt-illuminance",
          name: "Illuminance",
          summary: "Illuminance and foot-candle sensor verification against certified tungsten halogen reference lamps.",
          subRanges: [
            { range: "0 Lux to 50,000 Lux", resolution: "1 Lux" }
          ],
          instruments: [
            "Lux Meter"
          ],
          images: [
            {
              src: "assets/images/lux_meter.png",
              title: "Photometric Reference Source Calibration",
              alt: "Illuminance meter probe under reference calibration light"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       12. LABORATORY
    ────────────────────────────────────────────── */
    {
      id: "laboratory",
      code: "LAB-12",
      title: "Laboratory",
      description: "pH, electrical conductivity, Total Dissolved Solids (TDS), and Dissolved Oxygen (DO) analytical instruments.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55A2 2 0 0 0 6.51 23.5h10.98a2 2 0 0 0 1.79-2.95l-5.07-10.127A2 2 0 0 1 14 9.527V2"></path><path d="M8.5 2h7"></path><path d="M7 16h10"></path></svg>`,
      parameterCount: 4,
      parameters: [
        {
          id: "lab-ph",
          name: "pH",
          summary: "Electrochemical pH electrode calibration using NIST-traceable standard buffer solutions (pH 4.01, 7.00, 10.01).",
          subRanges: [
            { range: "1.68 pH to 12.45 pH", resolution: "0.01 pH" }
          ],
          instruments: [
            "pH Meter"
          ],
          images: [
            {
              src: "assets/images/lab_ph_conductivity.png",
              title: "Digital Laboratory pH Meter & Electrodes",
              alt: "Digital pH meter with glass electrode in beaker of buffer solution"
            }
          ]
        },
        {
          id: "lab-conductivity",
          name: "Conductivity",
          summary: "Cell constant and solution conductivity testing using certified standard KCl solutions.",
          subRanges: [
            { range: "1 µS/cm to 200 mS/cm", resolution: "0.1 µS/cm" }
          ],
          instruments: [
            "Conductivity Meter"
          ],
          images: [
            {
              src: "assets/images/lab_ph_conductivity.png",
              title: "Laboratory Conductivity Testing Station",
              alt: "Conductivity meter probe dipping into standard solution"
            }
          ]
        },
        {
          id: "lab-tds",
          name: "TDS",
          summary: "Total Dissolved Solids (TDS) meter calibration for water quality testing.",
          subRanges: [
            { range: "0 ppm to 10,000 ppm", resolution: "1 ppm" }
          ],
          instruments: [
            "TDS Meter"
          ],
          images: [
            {
              src: "assets/images/lab_ph_conductivity.png",
              title: "TDS Meter Calibration Station",
              alt: "Digital TDS meter and probe with reference calibration solution"
            }
          ]
        },
        {
          id: "lab-do",
          name: "DO",
          summary: "Dissolved Oxygen (DO) probe calibration in zero-oxygen solution and air-saturated water.",
          subRanges: [
            { range: "0 mg/L to 20 mg/L (0 to 200 % Saturation)", resolution: "0.01 mg/L" }
          ],
          instruments: [
            "DO Meter"
          ],
          images: [
            {
              src: "assets/images/lab_ph_conductivity.png",
              title: "Dissolved Oxygen (DO) Analytical Probe Station",
              alt: "DO meter probe dipped in calibration beaker"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       13. PROCESS INSTRUMENTS
    ────────────────────────────────────────────── */
    {
      id: "process-instruments",
      code: "PROC-13",
      title: "Process Instruments",
      description: "Field and loop instrumentation calibration for pressure, temperature, flow, and level.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
      parameterCount: 4,
      parameters: [
        {
          id: "proc-pressure",
          name: "Pressure Transmitters & Switches",
          summary: "4-20 mA HART, Modbus, and smart pressure transmitter calibration using digital masters.",
          subRanges: [
            { range: "-1 bar to 700 bar", resolution: "0.01 % FS" }
          ],
          instruments: [
            "Transmitters",
            "Indicators",
            "Controllers"
          ],
          images: [
            {
              src: "assets/images/digital_pressure_gauge.png",
              title: "Process Pressure Transmitter Master Reference",
              alt: "Digital master pressure gauge connected to industrial transmitter"
            }
          ]
        },
        {
          id: "proc-temperature",
          name: "Temperature Transmitters & Controllers",
          summary: "Head-mounted and DIN-rail temperature transmitter calibration with simulated RTD/TC signals.",
          subRanges: [
            { range: "-200 °C to 1200 °C", resolution: "0.01 °C" }
          ],
          instruments: [
            "Transmitters",
            "Indicators",
            "Controllers"
          ],
          images: [
            {
              src: "assets/images/dry_block.png",
              title: "Process Temperature Transmitter Bench",
              alt: "Dry block calibrator and loop signal simulator for transmitter calibration"
            }
          ]
        },
        {
          id: "proc-flow",
          name: "Flow Transmitters & Signal Conditioners",
          summary: "Pulse, frequency, and analog 4-20 mA output calibration for process flow transmitters.",
          subRanges: [
            { range: "0.1 L/min to 5000 L/min", resolution: "0.1 L/min" }
          ],
          instruments: [
            "Transmitters",
            "Indicators",
            "Controllers"
          ],
          images: [
            {
              src: "assets/images/flow_meter.png",
              title: "Process Flow Transmitter Rig",
              alt: "Flow rig showing master electromagnetic flow transmitter"
            }
          ]
        },
        {
          id: "proc-level",
          name: "Level Transmitters & Controllers",
          summary: "Hydrostatic, radar, ultrasonic, and float level transmitter calibration.",
          subRanges: [
            { range: "0 to 100 % Level", resolution: "0.1 % FS" }
          ],
          instruments: [
            "Transmitters",
            "Indicators",
            "Controllers"
          ],
          images: [
            {
              src: "assets/images/insight_technician.png",
              title: "Process Level Switch & Controller Lab",
              alt: "Technician calibrating process indicator and level controller"
            }
          ]
        }
      ]
    },

    /* ──────────────────────────────────────────────
       14. MECHANICAL TESTING
    ────────────────────────────────────────────── */
    {
      id: "mechanical-testing",
      code: "MT-14",
      title: "Mechanical Testing",
      description: "Material testing, tensile, compression, bending, hardness (Rockwell, Brinell, Vickers, Shore), impact testing, force gauges, load cells, and spring testers.",
      icon: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
      parameterCount: 8,
      parameters: [
        {
          id: "mt-tensile",
          name: "Tensile Force",
          summary: "Tensile force calibration for Universal Testing Machines (UTMs), load cells, extensometers, and force gauges.",
          subRanges: [
            { range: "10 N to 1000 kN", resolution: "1 N" }
          ],
          instruments: [
            "Universal Testing Machine (UTM)",
            "Digital Force Gauge",
            "Load Cell",
            "Extensometer",
            "Tensile Load Cell"
          ],
          images: [
            {
              src: "assets/images/universal_testing_machine.png",
              title: "Universal Testing Machine (UTM) Tensile Frame",
              alt: "UTM conducting tensile test with electronic load cell"
            },
            {
              src: "assets/images/load_cell.png",
              title: "Master Tensile Load Cell Standard",
              alt: "NIST-traceable load cell standard for UTM force calibration"
            }
          ]
        },
        {
          id: "mt-compressive",
          name: "Compressive Force & Compression",
          summary: "Compressive force testing for Compression Testing Machines (CTMs), UTMs, proving rings, and compression load cells.",
          subRanges: [
            { range: "10 N to 1000 kN", resolution: "1 N" }
          ],
          instruments: [
            "Compression Testing Machine (CTM)",
            "Universal Testing Machine (UTM)",
            "Load Cell",
            "Proving Ring",
            "Compression Load Cell"
          ],
          images: [
            {
              src: "assets/images/proving_ring.png",
              title: "50 kN Force Proving Ring Standard",
              alt: "ISO 17025 certified steel proving ring standard"
            },
            {
              src: "assets/images/load_cell.png",
              title: "Compression Load Cell Master",
              alt: "Master load cell standard on compression test bench"
            }
          ]
        },
        {
          id: "mt-flexural-bending",
          name: "Bending Force, Flexural & Shear Strength",
          summary: "3-point and 4-point bending force, flexural strength, and shear strength calibration for UTMs and CTMs.",
          subRanges: [
            { range: "10 N to 500 kN", resolution: "1 N" }
          ],
          instruments: [
            "Universal Testing Machine (UTM)",
            "Compression Testing Machine (CTM)",
            "Force Gauge"
          ],
          images: [
            {
              src: "assets/images/universal_testing_machine.png",
              title: "UTM Flexural & Bending Force Test Rig",
              alt: "UTM equipped with 3-point flexural bending fixture"
            }
          ]
        },
        {
          id: "mt-peel-proof-breaking",
          name: "Peel Strength, Proof Load & Breaking Load",
          summary: "Calibration of push-pull force gauges, digital force indicators, and low-range UTMs for peel and adhesive testing.",
          subRanges: [
            { range: "0.1 N to 100 kN", resolution: "0.1 N" }
          ],
          instruments: [
            "Universal Testing Machine (UTM)",
            "Digital Force Gauge",
            "Push Pull Force Gauge"
          ],
          images: [
            {
              src: "assets/images/universal_testing_machine.png",
              title: "Peel & Proof Load Verification Bench",
              alt: "Testing machine configured for peel strength and proof load measurement"
            }
          ]
        },
        {
          id: "mt-elongation-uts",
          name: "Elongation, Yield Strength & UTS",
          summary: "Extensometer displacement, strain rate, crosshead speed, yield strength, and Ultimate Tensile Strength (UTS).",
          subRanges: [
            { range: "Elongation (0.01 mm to 500 mm)", resolution: "0.001 mm" },
            { range: "Crosshead Speed (0.01 mm/min to 1000 mm/min)", resolution: "0.01 mm/min" }
          ],
          instruments: [
            "Universal Testing Machine (UTM)",
            "Extensometer"
          ],
          images: [
            {
              src: "assets/images/universal_testing_machine.png",
              title: "UTM Extensometer & Elongation Measurement",
              alt: "Electronic extensometer mounted on tensile specimen in UTM"
            }
          ]
        },
        {
          id: "mt-hardness",
          name: "Hardness (Rockwell, Brinell, Vickers, Shore)",
          summary: "Verification of Rockwell (HRC/HRB), Brinell (HBW), Vickers (HV), Shore (A/D), and portable Leeb hardness testers.",
          subRanges: [
            { range: "Rockwell (20 HRC to 70 HRC)", resolution: "0.1 HRC" },
            { range: "Brinell (100 HBW to 450 HBW)", resolution: "1 HBW" },
            { range: "Vickers (100 HV to 1000 HV)", resolution: "1 HV" },
            { range: "Shore (10 to 90 Shore A/D)", resolution: "0.5 Shore" }
          ],
          instruments: [
            "Hardness Tester (Rockwell)",
            "Hardness Tester (Brinell)",
            "Hardness Tester (Vickers)",
            "Shore Hardness Tester",
            "Portable Hardness Tester"
          ],
          images: [
            {
              src: "assets/images/rockwell_hardness.png",
              title: "Digital Rockwell Hardness Tester (HRC/HRB)",
              alt: "Wilson Rockwell hardness tester reading 62.5 HRC with diamond cone indenter on test block"
            },
            {
              src: "assets/images/insight_machinery.png",
              title: "Hardness Test Block Inspection Station",
              alt: "Hardness test block indentation inspection on granite table"
            }
          ]
        },
        {
          id: "mt-impact",
          name: "Impact Energy (Charpy & Izod)",
          summary: "Pendulum impact machine energy calibration for Charpy and Izod toughness testing.",
          subRanges: [
            { range: "1 J to 500 J", resolution: "0.1 J" }
          ],
          instruments: [
            "Impact Testing Machine (Charpy)",
            "Impact Testing Machine (Izod)"
          ],
          images: [
            {
              src: "assets/images/insight_machinery.png",
              title: "Impact Machine Anvil & Pendulum Inspection",
              alt: "Metrology station for impact testing machine verification"
            }
          ]
        },
        {
          id: "mt-spring-torque",
          name: "Spring Force & Torque Testing",
          summary: "Calibration for spring testing machines, torque testers, torque wrench testers, and push-pull load cells.",
          subRanges: [
            { range: "Spring Force (1 N to 50 kN)", resolution: "0.1 N" },
            { range: "Torque (1 Nm to 1000 Nm)", resolution: "0.1 Nm" }
          ],
          instruments: [
            "Spring Testing Machine",
            "Torque Tester",
            "Torque Wrench Tester",
            "Force Gauge",
            "Push Pull Force Gauge"
          ],
          images: [
            {
              src: "assets/images/torque_wrench.png",
              title: "Torque Tester & Wrench Calibration Rig",
              alt: "Torque transducer calibration stand with digital display analyzer"
            },
            {
              src: "assets/images/proving_ring.png",
              title: "Spring Tester Force Reference Standard",
              alt: "Proving ring standard used to calibrate spring test frames"
            }
          ]
        }
      ]
    }

  ] // end disciplines
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NABL_SCOPE_DATA;
}
