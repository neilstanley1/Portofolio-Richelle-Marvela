'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Cloud,
  Database,
  Droplets,
  Layers,
  Sun,
  CloudRain,
  Activity,
  Zap,
  Gauge,
  Terminal,
  Compass,
  Check,
  Radio,
  Sliders,
  Maximize2,
  X,
  RotateCw,
} from 'lucide-react'
import { type PortfolioProject, projects } from '@/src/data/portfolio'
import {
  ProjectContainer,
  ProjectBackButton,
  ProjectMetaGrid,
  ProjectSection,
  ProjectCard,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      el.querySelectorAll('.reveal').forEach((r) => r.classList.add('revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const delay = target.dataset.delay || '0'
            setTimeout(() => {
              target.classList.add('revealed')
            }, parseInt(delay))
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    const revealElements = el.querySelectorAll('.reveal')
    revealElements.forEach((r) => observer.observe(r))

    const timer = setTimeout(() => {
      revealElements.forEach((r) => {
        const rect = r.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          const delay = (r as HTMLElement).dataset.delay || '0'
          setTimeout(() => {
            r.classList.add('revealed')
          }, parseInt(delay))
        }
      })
    }, 60)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return ref
}

/* ─────────────────────────────────────────────────────────────
   BLOO CASE STUDY COMPONENT
───────────────────────────────────────────────────────────── */
export function BlooCaseStudyPage({ project }: { project: PortfolioProject }) {
  const mainRef = useReveal()

  // Hardware Tab State
  const [activeTab, setActiveTab] = useState<'prototype' | 'circuit' | 'components' | 'accessories'>('prototype')

  // Interactive Simulator State (Section 06)
  const [simMoisture, setSimMoisture] = useState<'dry' | 'wet'>('dry') // 'dry' (<30%), 'wet' (>=30%)
  const [simRain, setSimRain] = useState<'rain' | 'clear'>('rain') // 'rain' detected, 'clear'

  // Lightbox State (Section 11)
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; title: string } | null>(null)

  // Computed outputs for simulator
  const pumpActive = simMoisture === 'dry'
  const roofClosed = simRain === 'rain'

  const galleryItems = [
    {
      src: '/projects/bloo/prototype-showcase.png',
      alt: 'BLOO Physical Smart Greenhouse Prototype Showcase',
      title: 'Physical IoT Prototype & Chassis',
      caption: 'Full acrylic greenhouse frame housing the ESP32 microcontroller, soil probe, raindrop plate, mini pump, servo roof shutter, relay, and LCD display.',
      span: 'span-7',
    },
    {
      src: '/projects/bloo/circuit-diagram.png',
      alt: 'BLOO ESP32 Circuit Schematic and Pinout Wiring',
      title: 'Circuit Schematic & Wiring Diagram',
      caption: 'Complete schematic mapping ESP32 GPIO pinouts, I2C bus for 16x2 LCD, analog inputs, and digital control lines for relay and SG90 servo.',
      span: 'span-5',
    },
    {
      src: '/projects/bloo/system-architecture.png',
      alt: 'IoT to Firebase to Mobile Application Architecture',
      title: 'Bidirectional Cloud Architecture',
      caption: 'End-to-end communication topology: ESP32 telemetry serialization to Firebase Realtime Database and mobile command dispatch back to actuators.',
      span: 'span-12',
    },
    {
      src: '/projects/bloo/hardware-components.png',
      alt: 'BLOO IoT Core Sensing and Actuation Modules',
      title: 'Core Sensors & Actuators',
      caption: 'ESP32 microcontroller, DHT22 temperature and humidity sensor, capacitive soil moisture probe, raindrop sensor plate, 5V mini water pump, 2-channel relay, and SG90 servo.',
      span: 'span-6',
    },
    {
      src: '/projects/bloo/hardware-accessories.png',
      alt: 'BLOO Prototyping Board, Power Supply, Jumpers and LCD',
      title: 'Hardware Prototyping Infrastructure',
      caption: 'Solderless breadboard, dual-rail 3.3V/5V power supply module, color-coded jumper wire sets (M-M, F-F, F-M), and 16x2 character LCD.',
      span: 'span-6',
    },
  ]

  return (
    <main
      className="project-page-root bloo-case-study"
      ref={mainRef as React.RefObject<HTMLElement>}
    >
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <header className="project-hero-section">
        <ProjectContainer>
          <ProjectBackButton href="/showcase/projects" label="BACK TO PROJECTS" />

          <div className="project-hero-layout-single">
            <div className="project-kicker reveal" data-delay="0">
              <span className="bloo-pulse-dot" />
              IoT · SMART AGRICULTURE
            </div>

            <h1 className="project-hero-title reveal" data-delay="80">
              BLOO
            </h1>

            <p className="project-hero-subtitle reveal" data-delay="140">
              SmartFarm IoT Monitoring &amp; Automated Control
            </p>

            <p className="project-hero-lead reveal" data-delay="200">
              A smart agriculture IoT system that monitors environmental conditions and automatically controls irrigation and a protective roof through ESP32 and Firebase.
            </p>

            {/* Recruiter-First Metadata Grid */}
            <div className="reveal" data-delay="260">
              <ProjectMetaGrid
                items={[
                  {
                    label: 'ROLE',
                    value: 'IoT Developer · Embedded Systems',
                  },
                  {
                    label: 'CONTRIBUTION',
                    value: '100% IoT Development',
                  },
                  {
                    label: 'TECH STACK',
                    value: 'ESP32 · Firebase · DHT22 · Soil Moisture · Raindrop Sensor · Servo · Relay',
                  },
                  {
                    label: 'FOCUS',
                    value: 'Sensor Integration · Automation · IoT Communication',
                  },
                ]}
              />
            </div>
          </div>
        </ProjectContainer>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          HERO VISUAL / SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <section className="project-section" style={{ paddingTop: 0 }}>
        <ProjectContainer>
          <div className="bloo-showcase-frame reveal" data-delay="100">
            <div className="bloo-frame-bar">
              <div className="bloo-frame-dots">
                <span />
                <span />
                <span />
              </div>
              <span className="bloo-frame-title">PHYSICAL PROTOTYPE SHOWCASE · ESP32 IOT SYSTEM</span>
              <div className="bloo-status-pill">
                <span className="bloo-pulse-dot" />
                <span>DEVICE ONLINE · TELEMETRY ACTIVE</span>
              </div>
            </div>

            <div className="bloo-frame-img-wrapper">
              <Image
                src="/projects/bloo/prototype-showcase.png"
                alt="BLOO Physical Smart Greenhouse Prototype with Onboard Sensors and Actuators"
                width={1200}
                height={680}
                className="bloo-showcase-img"
                priority
              />
            </div>

            <div className="bloo-showcase-caption">
              <span className="bloo-caption-text">
                Integrated greenhouse prototype featuring local display, environmental sensing, irrigation relay, and automated servo roof.
              </span>
              <div className="bloo-sensor-tag-cloud">
                <span className="bloo-sensor-tag">ESP32</span>
                <span className="bloo-sensor-tag">DHT22</span>
                <span className="bloo-sensor-tag">Soil Moisture</span>
                <span className="bloo-sensor-tag">Raindrop Plate</span>
                <span className="bloo-sensor-tag">Relay + Pump</span>
                <span className="bloo-sensor-tag">SG90 Servo</span>
                <span className="bloo-sensor-tag">16x2 LCD</span>
              </div>
            </div>
          </div>
        </ProjectContainer>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 01 — THE PROBLEM
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="problem" className="reveal" data-delay="100">
        <div className="project-split-intro">
          <div>
            <span className="project-tag">01 / THE PROBLEM</span>
            <h2>Plant care becomes difficult when environmental conditions change constantly.</h2>
          </div>
          <div>
            <p>
              Maintaining delicate greenhouse plants manually requires round-the-clock vigilance. Temperature fluctuations, unpredictable precipitation, and inconsistent soil moisture frequently lead to stressed root systems, over-watering, or sudden water-logging damage without automated safeguards.
            </p>
          </div>
        </div>

        <div className="bloo-problem-grid">
          <div className="bloo-problem-card">
            <div className="bloo-problem-icon">
              <Droplets size={20} />
            </div>
            <h3>IRREGULAR WATERING</h3>
            <p>
              Manual watering is inherently inconsistent, resulting in severe moisture stress, root dehydration, or fungal rot from accidental over-watering.
            </p>
          </div>

          <div className="bloo-problem-card">
            <div className="bloo-problem-icon">
              <Activity size={20} />
            </div>
            <h3>UNMONITORED CONDITIONS</h3>
            <p>
              Ambient temperature, relative humidity, soil moisture, and sudden rain are impossible to assess continuously without dedicated telemetry sensors.
            </p>
          </div>

          <div className="bloo-problem-card">
            <div className="bloo-problem-icon">
              <CloudRain size={20} />
            </div>
            <h3>WEATHER EXPOSURE</h3>
            <p>
              Torrential downpours cause physical leaf damage and wash away soil nutrients unless protective greenhouse shutters close instantaneously.
            </p>
          </div>

          <div className="bloo-problem-card">
            <div className="bloo-problem-icon">
              <Radio size={20} />
            </div>
            <h3>REMOTE ACCESS</h3>
            <p>
              Caregivers lack real-time visibility and cannot trigger immediate irrigation or roof override actions when off-site or away from the farm.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02 — THE SOLUTION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="solution" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">02 / THE SOLUTION</span>
          <h2>An IoT system that senses, decides, and acts.</h2>
          <p className="project-section-lead">
            BLOO transforms manual plant husbandry into an autonomous, closed-loop feedback system. Powered by an ESP32 microcontroller, BLOO continuously samples multiple environmental sensors, executes localized automation thresholds, triggers high-torque actuators, and streams telemetry to the cloud.
          </p>
        </div>

        {/* Visual Closed-Loop Pipeline */}
        <div className="bloo-loop-container">
          <div className="bloo-loop-step">
            <div className="bloo-step-header">
              <span className="bloo-step-num">01</span>
              <Compass size={18} className="bloo-step-icon" />
            </div>
            <h4>SENSE</h4>
            <p>Continuous analog &amp; digital sampling across all physical interfaces.</p>
            <div className="bloo-step-detail">DHT22 · Soil Moisture · Raindrop</div>
          </div>

          <div className="bloo-loop-step">
            <div className="bloo-step-header">
              <span className="bloo-step-num">02</span>
              <Cpu size={18} className="bloo-step-icon" />
            </div>
            <h4>PROCESS</h4>
            <p>Onboard signal calibration, noise filtering, and edge evaluation.</p>
            <div className="bloo-step-detail">ESP32 240MHz Dual-Core</div>
          </div>

          <div className="bloo-loop-step">
            <div className="bloo-step-header">
              <span className="bloo-step-num">03</span>
              <Sliders size={18} className="bloo-step-icon" />
            </div>
            <h4>DECIDE</h4>
            <p>Threshold comparison algorithms determining actuator states.</p>
            <div className="bloo-step-detail">Moisture &lt; 30% | Rain Alert</div>
          </div>

          <div className="bloo-loop-step">
            <div className="bloo-step-header">
              <span className="bloo-step-num">04</span>
              <Zap size={18} className="bloo-step-icon" />
            </div>
            <h4>ACT</h4>
            <p>Direct relay switching and PWM pulse-width position control.</p>
            <div className="bloo-step-detail">DC Pump · SG90 Servo Roof</div>
          </div>

          <div className="bloo-loop-step">
            <div className="bloo-step-header">
              <span className="bloo-step-num">05</span>
              <Cloud size={18} className="bloo-step-icon" />
            </div>
            <h4>SYNC</h4>
            <p>Sub-second bidirectional telemetry and remote command sync.</p>
            <div className="bloo-step-detail">Firebase Realtime DB</div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03 — MY ROLE (100% OWNERSHIP)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="role" className="reveal" data-delay="100">
        <div className="bloo-role-banner">
          <div className="bloo-role-eyebrow">
            <CheckCircle2 size={15} />
            03 / MY CONTRIBUTION · 100% SOLE OWNERSHIP
          </div>
          <h2 className="bloo-role-quote">
            &ldquo;I owned the entire IoT implementation end-to-end.&rdquo;
          </h2>
          <p className="bloo-role-subtext">
            I personally handled the complete IoT engineering lifecycle independently: from hardware sourcing, circuit schematic design, and voltage regulation, to C++/Arduino embedded firmware, sensor calibration, autonomous control logic, and two-way Firebase cloud synchronization.
          </p>
        </div>

        <div className="bloo-contribution-grid">
          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">01 · PHYSICAL LAYER</span>
            <h3>HARDWARE INTEGRATION</h3>
            <p>
              Selected, wired, and integrated all physical modules: ESP32 microcontroller, DHT22 sensor, soil moisture probe, raindrop plate, 5V relay module, DC water pump, SG90 servo motor, and 16x2 I2C LCD.
            </p>
          </div>

          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">02 · FIRMWARE ARCHITECTURE</span>
            <h3>EMBEDDED LOGIC</h3>
            <p>
              Authored robust C++ firmware for the ESP32. Implemented analog-to-digital sensor reading loops, debouncing, threshold evaluations, device state management, and reliable fail-safe recovery routines.
            </p>
          </div>

          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">03 · CLOSED-LOOP CONTROLS</span>
            <h3>AUTOMATION</h3>
            <p>
              Programmed autonomous irrigation activation when soil moisture drops below 30% and immediate motorized roof closure upon raindrop detection, protecting plants with zero human latency.
            </p>
          </div>

          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">04 · CLOUD SYNC</span>
            <h3>FIREBASE INTEGRATION</h3>
            <p>
              Engineered the two-way communication protocol between ESP32 and Firebase Realtime Database. Structured live JSON telemetry pushes and implemented asynchronous event listeners for mobile app commands.
            </p>
          </div>

          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">05 · END-TO-END</span>
            <h3>SYSTEM INTEGRATION</h3>
            <p>
              Bridged physical hardware states with the mobile application interface via Firebase, validating seamless command execution and sub-second telemetry feedback in field-style bench testing.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04 — HARDWARE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="hardware" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">04 / HARDWARE</span>
          <h2>The physical system behind BLOO.</h2>
          <p className="project-section-lead">
            A modular embedded architecture engineered for reliable continuous operation. The system balances 3.3V logic for the ESP32 and sensitive digital sensors alongside 5V power rails for inductive relay loads and high-draw servo actuation.
          </p>
        </div>

        {/* Visual Switcher Tabs */}
        <div className="bloo-tab-bar">
          <button
            type="button"
            className={`bloo-tab-btn ${activeTab === 'prototype' ? 'active' : ''}`}
            onClick={() => setActiveTab('prototype')}
          >
            Prototype Assembly
          </button>
          <button
            type="button"
            className={`bloo-tab-btn ${activeTab === 'circuit' ? 'active' : ''}`}
            onClick={() => setActiveTab('circuit')}
          >
            Circuit Schematic
          </button>
          <button
            type="button"
            className={`bloo-tab-btn ${activeTab === 'components' ? 'active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            Core Components
          </button>
          <button
            type="button"
            className={`bloo-tab-btn ${activeTab === 'accessories' ? 'active' : ''}`}
            onClick={() => setActiveTab('accessories')}
          >
            Prototyping Gear
          </button>
        </div>

        {/* Visual Frame */}
        <div className="bloo-showcase-frame">
          <div className="bloo-frame-bar">
            <div className="bloo-frame-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="bloo-frame-title">
              {activeTab === 'prototype' && 'PHYSICAL PROTOTYPE ENCLOSURE & LABELED SENSORS'}
              {activeTab === 'circuit' && 'ESP32 CIRCUIT BREADBOARD & WIRING SCHEMATIC'}
              {activeTab === 'components' && 'DISCRETE SENSOR & ACTUATOR MODULES'}
              {activeTab === 'accessories' && 'PROTOTYPING ACCESSORIES & DUAL POWER SUPPLY'}
            </span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: '#2d6a4f', fontWeight: 700 }}>
              100% INDEPENDENT WIRING
            </span>
          </div>

          <div className="bloo-frame-img-wrapper" style={{ padding: '1.25rem' }}>
            {activeTab === 'prototype' && (
              <Image
                src="/projects/bloo/prototype-showcase.png"
                alt="BLOO Prototype Greenhouse Frame"
                width={1000}
                height={550}
                className="bloo-showcase-img"
              />
            )}
            {activeTab === 'circuit' && (
              <Image
                src="/projects/bloo/circuit-diagram.png"
                alt="BLOO Wiring Circuit Schematic with ESP32"
                width={1000}
                height={550}
                className="bloo-showcase-img"
              />
            )}
            {activeTab === 'components' && (
              <Image
                src="/projects/bloo/hardware-components.png"
                alt="BLOO Core Electronic Components"
                width={1000}
                height={550}
                className="bloo-showcase-img"
              />
            )}
            {activeTab === 'accessories' && (
              <Image
                src="/projects/bloo/hardware-accessories.png"
                alt="BLOO Breadboard and Power Accessories"
                width={1000}
                height={550}
                className="bloo-showcase-img"
              />
            )}
          </div>
        </div>

        {/* Component Technical Grid */}
        <div className="bloo-hardware-grid">
          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">PROCESSING UNIT</span>
            <h4>ESP32 Microcontroller</h4>
            <p>
              Dual-core Xtensa 32-bit MCU with integrated 2.4 GHz Wi-Fi. Executes local threshold loops and maintains persistent TCP sockets to Firebase.
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">CLIMATE SENSING</span>
            <h4>DHT22 Sensor</h4>
            <p>
              Calibrated capacitive humidity sensor and thermistor providing high-accuracy ambient readings (Temp ±0.5°C, Humidity ±2% RH).
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">HYDRATION PROBE</span>
            <h4>Soil Moisture Sensor</h4>
            <p>
              Measures soil dielectric permittivity to accurately calculate volumetric water content and trigger irrigation when moisture &lt; 30%.
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">WEATHER DETECTION</span>
            <h4>Raindrop Sensor Plate</h4>
            <p>
              Nickel-coated serpentine trace sensor detecting water droplet conductivity for instantaneous automated roof shutter closure.
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">IRRIGATION ACTUATOR</span>
            <h4>Mini Water Pump</h4>
            <p>
              5V DC submersible centrifugal pump providing targeted drip irrigation directly to plant root zones upon relay contact closure.
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">POWER SWITCHING</span>
            <h4>Electromechanical Relay</h4>
            <p>
              Optocoupler-isolated relay module providing galvanic isolation between the sensitive ESP32 GPIOs and the inductive pump motor.
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">PROTECTION SHUTTER</span>
            <h4>SG90 Micro Servo</h4>
            <p>
              High-torque miniature servo receiving 50 Hz PWM position pulses to physically rotate the acrylic roof shutter between 0° and 90°.
            </p>
          </div>

          <div className="bloo-hardware-item">
            <span className="bloo-hardware-tag">LOCAL TELEMETRY</span>
            <h4>16x2 I2C LCD Display</h4>
            <p>
              On-device alphanumeric display rendering real-time temperature, humidity, and soil moisture metrics for immediate offline inspection.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05 — SYSTEM ARCHITECTURE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="architecture" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">05 / SYSTEM ARCHITECTURE</span>
          <h2>Connecting physical sensors to a remote control layer.</h2>
          <p className="project-section-lead">
            BLOO unites embedded hardware with a reactive cloud data layer. By treating Firebase as the central synchronization bus, sensor telemetry flows effortlessly from edge devices to mobile clients while remote commands reach the ESP32 in real time.
          </p>
        </div>

        {/* Architecture Visual */}
        <div className="bloo-showcase-frame">
          <div className="bloo-frame-bar">
            <div className="bloo-frame-dots">
              <span />
              <span />
              <span />
            </div>
            <span className="bloo-frame-title">IOT ↔ FIREBASE ↔ MOBILE APPLICATION ARCHITECTURE</span>
            <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.65rem', color: '#0284c7', fontWeight: 700 }}>
              BIDIRECTIONAL REAL-TIME BUS
            </span>
          </div>

          <div className="bloo-frame-img-wrapper" style={{ padding: '1.5rem' }}>
            <Image
              src="/projects/bloo/system-architecture.png"
              alt="BLOO System Architecture: IoT Device to Firebase to Mobile Application"
              width={1100}
              height={500}
              className="bloo-showcase-img"
            />
          </div>
        </div>

        {/* Dual Flow Breakdown */}
        <div className="bloo-arch-grid">
          <div className="bloo-arch-card">
            <span className="bloo-arch-badge upstream">
              <Activity size={14} /> DEVICE → FIREBASE (UPSTREAM TELEMETRY)
            </span>
            <h3>Continuous Environmental Streaming</h3>
            <p>
              The ESP32 samples connected sensors on scheduled intervals, packages readings into JSON payloads, and pushes structured telemetry to Firebase Realtime Database over secure Wi-Fi sockets.
            </p>
            <div className="bloo-arch-flow-box">
              <div className="bloo-flow-node">
                <span className="node-tag">SENSORS</span>
                <span>DHT22, Soil Probe, Rain Plate generate analog/digital signals</span>
              </div>
              <div className="bloo-flow-arrow">↓</div>
              <div className="bloo-flow-node">
                <span className="node-tag">ESP32</span>
                <span>Firmware serializes floats &amp; booleans into JSON document</span>
              </div>
              <div className="bloo-flow-arrow">↓</div>
              <div className="bloo-flow-node">
                <span className="node-tag">FIREBASE</span>
                <span>Realtime Database updates node /bloo/telemetry</span>
              </div>
              <div className="bloo-flow-arrow">↓</div>
              <div className="bloo-flow-node">
                <span className="node-tag">MOBILE APP</span>
                <span>App re-renders live gauges with sub-second latency</span>
              </div>
            </div>
          </div>

          <div className="bloo-arch-card">
            <span className="bloo-arch-badge downstream">
              <Zap size={14} /> FIREBASE → DEVICE (DOWNSTREAM CONTROL)
            </span>
            <h3>Real-Time Actuator Command Dispatch</h3>
            <p>
              When a caregiver triggers a manual pump cycle or forces a roof shutter adjustment via the mobile application, commands are written to Firebase and consumed instantly by the ESP32 event listener.
            </p>
            <div className="bloo-arch-flow-box">
              <div className="bloo-flow-node">
                <span className="node-tag">CAREGIVER</span>
                <span>Toggles Manual Water Pump or Roof Override in App UI</span>
              </div>
              <div className="bloo-flow-arrow">↓</div>
              <div className="bloo-flow-node">
                <span className="node-tag">FIREBASE</span>
                <span>Value update written to /bloo/controls/pump_override</span>
              </div>
              <div className="bloo-flow-arrow">↓</div>
              <div className="bloo-flow-node">
                <span className="node-tag">ESP32</span>
                <span>Stream listener receives event callback within milliseconds</span>
              </div>
              <div className="bloo-flow-arrow">↓</div>
              <div className="bloo-flow-node">
                <span className="node-tag">ACTUATORS</span>
                <span>GPIO pulses trigger relay contact or SG90 servo motor</span>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06 — AUTOMATION LOGIC
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="automation" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">06 / AUTOMATION LOGIC</span>
          <h2>Turning sensor readings into automatic actions.</h2>
          <p className="project-section-lead">
            The microcontroller evaluates deterministic environmental thresholds to preserve ideal botanical growth parameters. Below is the exact logical execution cycle programmed into the ESP32.
          </p>
        </div>

        {/* Step-by-Step Logic Timeline */}
        <div className="bloo-timeline">
          <div className="bloo-timeline-item">
            <div className="bloo-timeline-step">01</div>
            <div className="bloo-timeline-content">
              <h4>Poll Ambient Temperature &amp; Relative Humidity</h4>
              <p>ESP32 communicates over single-bus protocol to read calibrated DHT22 metrics.</p>
              <span className="bloo-code-badge">dht.readTemperature() · dht.readHumidity()</span>
            </div>
          </div>

          <div className="bloo-timeline-item">
            <div className="bloo-timeline-step">02</div>
            <div className="bloo-timeline-content">
              <h4>Sample Soil Moisture Voltage</h4>
              <p>Analog pin samples resistive/capacitive voltage level, mapping raw ADC (0–4095) into calibrated percentage.</p>
              <span className="bloo-code-badge">map(analogRead(SOIL_PIN), DRY_ADC, WET_ADC, 0, 100)</span>
            </div>
          </div>

          <div className="bloo-timeline-item">
            <div className="bloo-timeline-step">03</div>
            <div className="bloo-timeline-content">
              <h4>Evaluate Irrigation Threshold (&lt; 30%)</h4>
              <p>System assesses current hydration. If moisture is critically low (&lt; 30%), the irrigation cycle engages.</p>
              <span className="bloo-code-badge">if (soilMoisture &lt; 30) -&gt; PUMP_ON; else -&gt; PUMP_OFF;</span>
            </div>
          </div>

          <div className="bloo-timeline-item">
            <div className="bloo-timeline-step">04</div>
            <div className="bloo-timeline-content">
              <h4>Detect Precipitation &amp; Adjust Roof Shutter</h4>
              <p>Raindrop plate detects water conductivity. If rain is detected, SG90 servo rotates to 90° (closed). When clear, roof resets to 0° (open).</p>
              <span className="bloo-code-badge">if (isRaining) servo.write(90); else servo.write(0);</span>
            </div>
          </div>

          <div className="bloo-timeline-item">
            <div className="bloo-timeline-step">05</div>
            <div className="bloo-timeline-content">
              <h4>Push Synchronized Telemetry to Firebase &amp; Update LCD</h4>
              <p>Current metrics and actuator states are committed to cloud storage and refreshed on the local 16x2 character LCD.</p>
              <span className="bloo-code-badge">Firebase.setJSON(&quot;/bloo/telemetry&quot;, payload) · lcd.print()</span>
            </div>
          </div>
        </div>

        {/* Interactive Automation Simulator */}
        <div className="bloo-sim-box">
          <div className="bloo-sim-header">
            <div className="bloo-sim-title">
              <h3>Interactive Embedded Logic Simulator</h3>
              <p>Toggle environmental conditions to see how the ESP32 automation algorithm responds in real time.</p>
            </div>
            <div className="bloo-status-pill" style={{ background: 'rgba(255,255,255,0.08)', color: '#5eead4', borderColor: 'rgba(94,234,212,0.3)' }}>
              <span className="bloo-pulse-dot" style={{ background: '#5eead4', boxShadow: '0 0 8px #5eead4' }} />
              <span>SIMULATED FIRMWARE LOOP</span>
            </div>
          </div>

          <div className="bloo-sim-controls">
            <div className="bloo-sim-ctrl-card">
              <span className="bloo-sim-ctrl-label">1. SOIL MOISTURE CONDITION</span>
              <div className="bloo-sim-btn-group">
                <button
                  type="button"
                  className={`bloo-sim-btn ${simMoisture === 'dry' ? 'active' : ''}`}
                  onClick={() => setSimMoisture('dry')}
                >
                  Moisture &lt; 30% (Dry)
                </button>
                <button
                  type="button"
                  className={`bloo-sim-btn ${simMoisture === 'wet' ? 'active' : ''}`}
                  onClick={() => setSimMoisture('wet')}
                >
                  Moisture ≥ 30% (Hydrated)
                </button>
              </div>
            </div>

            <div className="bloo-sim-ctrl-card">
              <span className="bloo-sim-ctrl-label">2. RAINDROP SENSOR STATUS</span>
              <div className="bloo-sim-btn-group">
                <button
                  type="button"
                  className={`bloo-sim-btn ${simRain === 'rain' ? 'active' : ''}`}
                  onClick={() => setSimRain('rain')}
                >
                  Rain Detected (Wet)
                </button>
                <button
                  type="button"
                  className={`bloo-sim-btn ${simRain === 'clear' ? 'active' : ''}`}
                  onClick={() => setSimRain('clear')}
                >
                  No Rain (Clear Sky)
                </button>
              </div>
            </div>
          </div>

          <div className="bloo-sim-outputs">
            <div className="bloo-sim-out-item">
              <span className="bloo-sim-out-lbl">WATER PUMP RELAY</span>
              <span
                className="bloo-sim-out-val"
                style={{ color: pumpActive ? '#34d399' : '#94a3b8' }}
              >
                {pumpActive ? '● ON (IRRIGATING)' : '○ OFF (STANDBY)'}
              </span>
            </div>

            <div className="bloo-sim-out-item">
              <span className="bloo-sim-out-lbl">SG90 SERVO ROOF</span>
              <span
                className="bloo-sim-out-val"
                style={{ color: roofClosed ? '#60a5fa' : '#34d399' }}
              >
                {roofClosed ? 'CLOSED (90° PROTECT)' : 'OPEN (0° SUNLIGHT)'}
              </span>
            </div>

            <div className="bloo-sim-out-item">
              <span className="bloo-sim-out-lbl">FIREBASE CLOUD STATUS</span>
              <span className="bloo-sim-out-val" style={{ color: '#5eead4' }}>
                SYNCED (SUB-SECOND)
              </span>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 07 — FIREBASE INTEGRATION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="firebase" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">07 / FIREBASE INTEGRATION</span>
          <h2>The communication layer between hardware and application.</h2>
          <p className="project-section-lead">
            Firebase Realtime Database serves as the real-time synchronization broker. By leveraging WebSocket protocols, the physical ESP32 and remote application communicate bidirectionally with minimal overhead and zero public IP routing complications.
          </p>
        </div>

        <div className="bloo-schema-grid">
          <div className="bloo-schema-card">
            <div className="bloo-schema-header">
              <span className="bloo-schema-title">UPSTREAM: /bloo/telemetry</span>
              <span style={{ fontSize: '0.68rem', color: '#6ee7b7' }}>ESP32 → FIREBASE</span>
            </div>
            <pre className="bloo-schema-pre">
{`{
  "timestamp": 1788532000,
  "device_id": "esp32_smartfarm_01",
  "sensors": {
    "temperature_c": 28.4,
    "humidity_pct": 65.2,
    "soil_moisture_pct": 24.5,
    "is_raining": true
  },
  "actuators": {
    "pump_relay_active": true,
    "roof_servo_deg": 90
  }
}`}
            </pre>
          </div>

          <div className="bloo-schema-card">
            <div className="bloo-schema-header">
              <span className="bloo-schema-title">DOWNSTREAM: /bloo/controls</span>
              <span style={{ fontSize: '0.68rem', color: '#60a5fa' }}>APP → FIREBASE → ESP32</span>
            </div>
            <pre className="bloo-schema-pre">
{`{
  "manual_override": {
    "force_pump": false,
    "force_roof_open": false
  },
  "thresholds": {
    "soil_trigger_pct": 30.0,
    "auto_roof_enabled": true
  },
  "command_id": "cmd_82581e",
  "issued_at": 1788532050
}`}
            </pre>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08 — APPLICATION CONNECTION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="application" className="reveal" data-delay="100">
        <div className="project-split-intro">
          <div>
            <span className="project-tag">08 / APPLICATION CONNECTION</span>
            <h2>From physical sensors to a remote control interface.</h2>
          </div>
          <div>
            <p>
              The mobile application interfaces directly with Firebase nodes, abstracting low-level micro-controller logic into an intuitive monitoring cockpit. Farmers and gardeners can inspect health metrics, view live status flags, and trigger physical actuators anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="bloo-contribution-grid">
          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">DISPLAY METRICS</span>
            <h3>Real-Time Telemetry Dashboard</h3>
            <p>
              Renders live readings for ambient temperature (°C), air humidity (%), soil moisture percentage, and binary rain detection with clear visual status indicators.
            </p>
          </div>

          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">REMOTE OVERRIDES</span>
            <h3>Interactive Actuator Toggles</h3>
            <p>
              Allows users to manually command the water pump relay or override the roof position, writing immediate commands to Firebase that the ESP32 consumes.
            </p>
          </div>

          <div className="bloo-contrib-card">
            <span className="bloo-contrib-badge">DEVICE STATUS</span>
            <h3>Heartbeat &amp; Connection Health</h3>
            <p>
              Monitors the ESP32 heartbeat timestamp in Firebase to confirm that the hardware system is actively connected and sampling the physical garden bed.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 09 — SYSTEM FLOW
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="flow" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">09 / SYSTEM FLOW</span>
          <h2>Complete end-to-end telemetry and actuation loop.</h2>
          <p className="project-section-lead">
            The complete cyclical data path connecting human intention, cloud persistence, embedded computation, and physical greenhouse actuators.
          </p>
        </div>

        <div className="bloo-flow-pipeline">
          <div className="bloo-flow-row">
            <span className="bloo-row-origin">USER INTERACTION</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">Caregiver monitors live soil conditions or toggles irrigation on mobile device.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">MOBILE APP</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">App formats user commands and dispatches them over HTTPS/WSS to Firebase.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">FIREBASE REALTIME DB</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">Cloud broker updates data nodes and fires websocket push notifications.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">ESP32 MICROCONTROLLER</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">Firmware listener receives payload and executes localized threshold routines.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">SENSORS + LOGIC</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">Continuously samples DHT22, soil moisture, and rain plate to verify plant needs.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">PUMP / SERVO ACTUATORS</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">Relay engages DC water pump for irrigation; SG90 servo motor pivots protective roof.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">NEW SENSOR TELEMETRY</span>
            <span className="bloo-row-arrow">→</span>
            <span className="bloo-row-desc">Updated moisture levels and actuator states pushed back into Firebase Realtime DB.</span>
          </div>

          <div className="bloo-flow-row">
            <span className="bloo-row-origin">MOBILE REFRESH</span>
            <span className="bloo-row-arrow">✓</span>
            <span className="bloo-row-desc">Mobile UI synchronizes instantly, confirming hydration and greenhouse protection.</span>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10 — RESULT
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="results" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">10 / RESULT</span>
          <h2>A connected system for monitoring and automated plant care.</h2>
          <p className="project-section-lead">
            The operational BLOO prototype validates that targeted embedded engineering and responsive cloud architectures can eliminate common agriculture failure points.
          </p>
        </div>

        <div className="bloo-result-grid">
          <div className="bloo-result-card">
            <h3>
              <CheckCircle2 size={18} color="#2d6a4f" />
              REAL-TIME MONITORING
            </h3>
            <p>
              Environmental parameters are synchronized continuously through Firebase, giving owners comprehensive visibility into crop climate stability.
            </p>
          </div>

          <div className="bloo-result-card">
            <h3>
              <CheckCircle2 size={18} color="#2d6a4f" />
              AUTOMATED IRRIGATION
            </h3>
            <p>
              Pump activation responds autonomously to soil moisture conditions (&lt; 30%), preventing both destructive dehydration and root suffocation.
            </p>
          </div>

          <div className="bloo-result-card">
            <h3>
              <CheckCircle2 size={18} color="#2d6a4f" />
              AUTOMATED ROOF CONTROL
            </h3>
            <p>
              Roof shutter position reacts immediately to rain plate detection, automatically sheltering delicate flora from violent squalls.
            </p>
          </div>

          <div className="bloo-result-card">
            <h3>
              <CheckCircle2 size={18} color="#2d6a4f" />
              REMOTE CONTROL
            </h3>
            <p>
              Users can issue manual override commands through the connected mobile application to adjust pump intervals or roof status at will.
            </p>
          </div>

          <div className="bloo-result-card">
            <h3>
              <CheckCircle2 size={18} color="#2d6a4f" />
              CONNECTED IoT SYSTEM
            </h3>
            <p>
              Physical hardware and the digital application layer communicate cohesively through Firebase, creating a proven smart agriculture foundation.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 11 — PROJECT SHOWCASE (GALLERY)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="showcase" className="reveal" data-delay="100">
        <div className="project-section-heading">
          <span className="project-tag">11 / PROJECT SHOWCASE</span>
          <h2>Visual gallery &amp; engineering artifacts.</h2>
          <p className="project-section-lead">
            Explore the physical build, circuit wiring, cloud architecture diagrams, and hardware components behind the BLOO SmartFarm project. Click any card to inspect in high resolution.
          </p>
        </div>

        <div className="bloo-gallery-grid">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`bloo-gallery-card ${item.span}`}
              onClick={() => setLightboxImg(item)}
            >
              <div className="bloo-gallery-img-box">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  height={500}
                  className="bloo-gallery-img"
                />
              </div>
              <div className="bloo-gallery-meta">
                <h4>{item.title}</h4>
                <p>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="bloo-lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="bloo-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="bloo-lightbox-header">
              <h4>{lightboxImg.title}</h4>
              <button
                type="button"
                className="bloo-lightbox-close"
                onClick={() => setLightboxImg(null)}
              >
                &times;
              </button>
            </div>
            <div className="bloo-lightbox-body">
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                width={1200}
                height={800}
                className="bloo-lightbox-img"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          GITHUB CTA CARD
      ───────────────────────────────────────────────────────────── */}
      <ProjectGithubCTA
        githubUrl="https://github.com/DeanFebrio/Bloo---SmartFarm"
        title="Explore the Implementation"
        description="View the BLOO SmartFarm IoT implementation and application integration on GitHub."
        buttonLabel="VIEW ON GITHUB ↗"
      />

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM NAVIGATION (PREV / NEXT)
      ───────────────────────────────────────────────────────────── */}
      <ProjectNavFooter currentId="bloo" />
    </main>
  )
}
