'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowLeft, Cpu, Cloud, Database, Layers, CheckCircle2, ShieldCheck, Activity, Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { type PortfolioProject, projects } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
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

    // Fallback trigger for initial elements in viewport on mount
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
    }, 50)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return ref
}

/* ─────────────────────────────────────────────
   FIELD CAROUSEL COMPONENT
───────────────────────────────────────────── */
interface SlideData {
  src: string
  alt: string
  title: string
  caption: string
  index: string
}

function FieldCarousel({ slides }: { slides: SlideData[] }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrent(idx)
      setTimeout(() => setIsTransitioning(false), 650)
    },
    [isTransitioning]
  )

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  // Slow auto-play (4 seconds), pause on hover
  useEffect(() => {
    if (isPaused) return
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 4000)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
    }
  }, [isPaused, slides.length])

  // Touch / swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      className="field-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="field-carousel-track">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`field-carousel-slide ${i === current ? 'slide-active' : 'slide-hidden'}`}
            aria-hidden={i !== current}
          >
            <div className="carousel-img-wrapper">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={900}
                height={560}
                quality={95}
                className={`carousel-slide-img ${i === current ? 'img-active' : ''}`}
              />
              {/* Slide index badge */}
              <span className="carousel-slide-badge">{slide.index}</span>
            </div>
            <div className="carousel-caption-block">
              <strong className="carousel-caption-title">{slide.title}</strong>
              <p className="carousel-caption-text">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls row */}
      <div className="carousel-controls-row">
        {/* Prev */}
        <button
          className="carousel-nav-btn"
          onClick={prev}
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dots */}
        <div className="carousel-dots" role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel-dot ${i === current ? 'dot-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Next */}
        <button
          className="carousel-nav-btn"
          onClick={next}
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PIPELINE FLOW (Architecture Diagram)
───────────────────────────────────────────── */
const PIPELINE_STEPS = [
  { num: '01', label: 'Goat Vocalization', sub: 'Acoustic Signal', owned: false },
  { num: '02', label: 'INMP441 Mic', sub: 'I2S Digital Audio', owned: false },
  { num: '03', label: 'ESP32-S3 Node', sub: 'Buffer & Wi-Fi Upload', owned: true },
  { num: '04', label: 'Google Cloud Storage', sub: 'goat-audio-bucket/raw/', owned: true },
  { num: '05', label: 'GCP Cloud Run', sub: 'CNN Inference API', owned: true },
  { num: '06', label: 'Firestore DB', sub: 'Realtime Result Sync', owned: false },
  { num: '07', label: 'Mbelys App', sub: 'Smart Alert & Action', owned: false },
]

function PipelineFlow() {
  return (
    <div className="mbelys-pipeline-wrapper">
      <div className="mbelys-pipeline">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.num} className="pipeline-node-group">
            <div className={`pipeline-node ${step.owned ? 'pipeline-node--owned' : ''}`}>
              <span className="pipeline-num">{step.num}</span>
              <span className="pipeline-label">{step.label}</span>
              <span className="pipeline-sub">{step.sub}</span>
              {step.owned && <span className="pipeline-owner-dot" aria-hidden="true" />}
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <div className="pipeline-connector" aria-hidden="true">
                <div className="pipeline-line" />
                <div className="pipeline-pulse" />
                <svg className="pipeline-arrow-icon" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M0 5H8M8 5L5 2M8 5L5 8" stroke="#C87A58" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ownership callout */}
      <div className="mbelys-ownership-callout">
        <div className="ownership-left">
          <ShieldCheck size={18} className="ownership-icon" />
          <div>
            <span className="ownership-role-label">IoT &amp; Cloud Engineering</span>
            <p className="ownership-text">
              <strong>My Integration Ownership:</strong> Steps 03, 04, and 05 represent the core IoT-to-Cloud architecture I engineered and deployed to ensure low-latency audio transmission and automated ML prediction sync.
            </p>
          </div>
        </div>
        <div className="ownership-steps-ref">
          <span className="ownership-step-tag">03</span>
          <span className="ownership-step-tag">04</span>
          <span className="ownership-step-tag">05</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export function MbelysCaseStudyPage({ project }: { project: PortfolioProject }) {
  const index = projects.findIndex((p) => p.id === 'mbelys')
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  // Attach reveal observer to the entire <main>
  const mainRef = useReveal()

  const fieldSlides: SlideData[] = [
    {
      src: '/projects/mbelys/field-testing.png',
      alt: 'Richelle testing hardware at goat pen facility',
      title: 'Hardware Calibration & Signal Debugging',
      caption:
        'On-site testing at goat pen facilities, debugging the ESP32-S3 audio buffer transmission to Google Cloud Storage.',
      index: '01 / 02',
    },
    {
      src: '/projects/mbelys/team-field.png',
      alt: 'Mbelys Team at Goat Farm Facility',
      title: 'Mbelys Team Field Deployment',
      caption:
        'Team collaboration at the goat farming facility for hardware installation and system evaluation.',
      index: '02 / 02',
    },
  ]

  return (
    <main
      className="project-page-root case-study case-mbelys"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#C87A58',
          '--project-accent-rgb': '200, 122, 88',
          '--project-title-color': '#2C1D14',
          '--project-muted': '#5c4537',
          '--project-val-color': '#2C1D14',
          '--project-card-bg': '#ffffff',
          '--project-card-border': 'rgba(200, 122, 88, 0.18)',
          '--project-kicker-bg': 'rgba(200, 122, 88, 0.1)',
          '--project-kicker-border': 'rgba(200, 122, 88, 0.25)',
        } as React.CSSProperties
      }
    >
      {/* SECTION 1: HERO */}
      <header className="mbelys-hero-section">
        <div className="mbelys-container">
          <ProjectBackButton />

          <div className="mbelys-hero-content">
            <div className="mbelys-kicker reveal" data-delay="0">
              <span className="mbelys-kicker-dot" />
              IoT • CLOUD • MACHINE LEARNING
            </div>

            <h1 className="mbelys-hero-title reveal" data-delay="80">Mbelys</h1>

            <p className="mbelys-hero-subtitle reveal" data-delay="160">
              IoT-Based Goat Vocal Analysis for Real-Time Stress &amp; Reproductive Activity Detection
            </p>

            <p className="mbelys-hero-lead reveal" data-delay="220">
              Mbelys combines IoT audio sensing, machine learning classification, Google Cloud Platform infrastructure, and a mobile application to monitor goat vocalizations in real time, transforming biological acoustic signals into actionable livestock health insights.
            </p>

            {/* Recruiter-First Metadata Grid */}
            <div className="mbelys-meta-grid reveal" data-delay="300">
              <div className="mbelys-meta-item">
                <span className="meta-label">ROLE</span>
                <strong className="meta-val">IoT &amp; Cloud Engineer</strong>
              </div>
              <div className="mbelys-meta-item">
                <span className="meta-label">RESPONSIBILITIES</span>
                <strong className="meta-val">ESP32-S3 Firmware · Cloud Run API · Firebase Sync</strong>
              </div>
              <div className="mbelys-meta-item">
                <span className="meta-label">TECH STACK</span>
                <strong className="meta-val">ESP32-S3 • GCP • Firebase • CNN</strong>
              </div>
              <div className="mbelys-meta-item">
                <span className="meta-label">PROJECT SCOPE</span>
                <strong className="meta-val">PKM-KC Funded Project · 2025–2026</strong>
              </div>
            </div>
          </div>

          {/* Hero Banner Showcase */}
          <div className="mbelys-hero-visual-frame reveal" data-delay="200">
            <Image
              src="/projects/mbelys/hero-banner.png"
              alt="Mbelys Goat Vocal Analysis System Poster"
              width={1200}
              height={675}
              priority
              quality={95}
              className="mbelys-hero-banner-img"
            />
          </div>
        </div>
      </header>

      {/* SECTION 2: OVERVIEW, PROBLEM & SOLUTION */}
      <section className="mbelys-section mbelys-overview-section">
        <div className="mbelys-container">
          <div className="mbelys-grid-2col">
            <div className="mbelys-col">
              <span className="mbelys-tag reveal" data-delay="0">01 / THE PROBLEM</span>
              <h2 className="reveal" data-delay="80">Manual inspection misses critical reproductive &amp; health windows.</h2>
              <p className="reveal" data-delay="150">
                Traditional livestock management relies on periodic physical inspection. In goat farming, identifying estrus (Masa Subur) and acute stress signals requires constant observation. Farmers often miss narrow fertile windows or early injury distress, leading to lower breeding success rates and delayed medical care.
              </p>
            </div>
            <div className="mbelys-col">
              <span className="mbelys-tag reveal" data-delay="80">02 / THE SOLUTION</span>
              <h2 className="reveal" data-delay="150">24/7 Continuous acoustic sensing with instant cloud AI alerts.</h2>
              <p className="reveal" data-delay="220">
                Mbelys places an ESP32-S3 digital microphone node directly in goat pens. Captured vocalizations stream directly into a Google Cloud pipeline where a 2-stage Convolutional Neural Network (CNN) model classifies sound patterns into 8 specific physical states—delivering real-time alerts and smart recommendations straight to the farmer&apos;s smartphone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MY ROLE */}
      <section className="mbelys-section mbelys-role-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">03 / TECHNICAL OWNERSHIP</span>
            <h2 className="reveal" data-delay="80">MY ROLE — BUILDING THE SYSTEM BEHIND MBELYS</h2>
            <p className="mbelys-lead-desc reveal" data-delay="150">
              I owned the hardware engineering and end-to-end cloud pipeline, bridging physical acoustic sensing, GCP infrastructure, machine learning inference, and database triggers for the mobile app.
            </p>
          </div>

          <div className="mbelys-role-grid">
            {/* Card 1 */}
            <div className="mbelys-role-card reveal" data-delay="80">
              <div className="role-card-header">
                <span className="role-num">01</span>
                <Cpu className="role-icon" size={20} />
              </div>
              <h3>IoT ENGINEERING</h3>
              <p className="role-summary">
                Built and handled the complete IoT hardware device used to capture high-fidelity goat vocalization data in farm environments.
              </p>
              <ul className="role-bullets">
                <li><CheckCircle2 size={14} /> <strong>Microcontroller:</strong> ESP32-S3 N16R8 module configuration</li>
                <li><CheckCircle2 size={14} /> <strong>Acoustic Sensor:</strong> INMP441 I2S digital omnidirectional mic</li>
                <li><CheckCircle2 size={14} /> <strong>Hardware Assembly:</strong> Enclosure wiring &amp; power management</li>
                <li><CheckCircle2 size={14} /> <strong>Data Acquisition:</strong> 22kHz 16-bit PCM raw audio sampling</li>
                <li><CheckCircle2 size={14} /> <strong>IoT Connectivity:</strong> Wi-Fi transmission &amp; field testing</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="mbelys-role-card featured reveal" data-delay="160">
              <div className="role-card-header">
                <span className="role-num">02</span>
                <Cloud className="role-icon" size={20} />
              </div>
              <h3>CLOUD ENGINEERING</h3>
              <p className="role-summary">
                Designed and maintained the cloud pipeline connecting the IoT device, machine learning system, and mobile application.
              </p>
              <ul className="role-bullets">
                <li><CheckCircle2 size={14} /> <strong>Cloud Microservices:</strong> Google Cloud Run container hosting</li>
                <li><CheckCircle2 size={14} /> <strong>Object Storage:</strong> Google Cloud Storage audio buckets</li>
                <li><CheckCircle2 size={14} /> <strong>Database Sync:</strong> Firebase Realtime &amp; Firestore integration</li>
                <li><CheckCircle2 size={14} /> <strong>Data Pipeline:</strong> Secure IoT-to-Cloud streaming architecture</li>
                <li><CheckCircle2 size={14} /> <strong>Ops &amp; Maintenance:</strong> GCP infrastructure monitoring &amp; IAM</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="mbelys-role-card reveal" data-delay="240">
              <div className="role-card-header">
                <span className="role-num">03</span>
                <Layers className="role-icon" size={20} />
              </div>
              <h3>ML &amp; CLOUD INTEGRATION</h3>
              <p className="role-summary">
                Integrated the machine learning inference pipeline into the cloud environment and connected its outputs to the mobile app.
              </p>
              <ul className="role-bullets">
                <li><CheckCircle2 size={14} /> <strong>Model Hosting:</strong> Containerized CNN model endpoint on Cloud Run</li>
                <li><CheckCircle2 size={14} /> <strong>Payload Parser:</strong> Structured JSON prediction payload builder</li>
                <li><CheckCircle2 size={14} /> <strong>Event Triggers:</strong> GCS bucket event triggers on file upload</li>
                <li><CheckCircle2 size={14} /> <strong>Firestore Writes:</strong> Automated real-time result database updates</li>
                <li><CheckCircle2 size={14} /> <strong>App Pipeline:</strong> Feeding smart recommendations to Android client</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PHYSICAL HARDWARE */}
      <section className="mbelys-section mbelys-hardware-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">04 / PHYSICAL HARDWARE</span>
            <h2 className="reveal" data-delay="80">THE DEVICE</h2>
            <p className="mbelys-lead-desc reveal" data-delay="150">
              An ESP32-S3-based IoT device equipped with an INMP441 digital microphone captures goat vocalizations in farm environments and sends collected audio data through the cloud pipeline for analysis.
            </p>
          </div>

          <div className="mbelys-hardware-showcase">
            <div className="hardware-single-device-box reveal" data-delay="80">
              <Image
                src="/projects/mbelys/device-only.png"
                alt="Mbelys ESP32-S3 IoT Hardware Device Enclosure"
                width={550}
                height={700}
                quality={95}
                className="device-only-img"
              />
            </div>

            {/* Technical Annotations */}
            <div className="hardware-specs-row" style={{ marginTop: '2rem' }}>
              {[
                { label: 'ESP32-S3 N16R8', sub: 'Microcontroller Unit' },
                { label: 'INMP441', sub: 'I2S Digital Microphone' },
                { label: '22kHz Sampling', sub: 'Raw PCM Audio' },
                { label: 'Wi-Fi IoT Stream', sub: 'HTTP Upload' },
                { label: 'Google Cloud Storage', sub: 'Direct Ingestion' },
              ].map((chip, i) => (
                <div className="hw-spec-chip reveal" key={chip.label} data-delay={`${i * 60}`}>
                  <span className="spec-dot" />
                  <strong>{chip.label}</strong> {chip.sub}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4B: FIELD TESTING CAROUSEL */}
      <section className="mbelys-section mbelys-field-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">FIELD TESTING &amp; DEPLOYMENT</span>
            <h2 className="reveal" data-delay="80">REAL-WORLD FARM TESTING</h2>
            <p className="mbelys-lead-desc reveal" data-delay="150">
              Hardware calibration and acoustic signal verification conducted directly at goat farm facilities, testing device durability, Wi-Fi streaming stability, and cloud pipeline sync under real environmental conditions.
            </p>
          </div>

          <div className="reveal" data-delay="200">
            <FieldCarousel slides={fieldSlides} />
          </div>
        </div>
      </section>

      {/* SECTION 5: ARCHITECTURE & DATA FLOW */}
      <section className="mbelys-section mbelys-arch-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">05 / ARCHITECTURE &amp; DATA FLOW</span>
            <h2 className="reveal" data-delay="80">FROM GOAT VOCALIZATION TO ACTIONABLE INSIGHT</h2>
            <p className="mbelys-lead-desc reveal" data-delay="150">
              End-to-end data pipeline connecting hardware audio capture, cloud object storage, machine learning inference container, Firestore database, and mobile user interface.
            </p>
          </div>

          <div className="reveal" data-delay="200">
            <PipelineFlow />
          </div>
        </div>
      </section>

      {/* SECTION 6: MACHINE LEARNING */}
      <section className="mbelys-section mbelys-ml-section">
        <div className="mbelys-container">
          <div className="mbelys-grid-2col">
            <div>
              <span className="mbelys-tag reveal" data-delay="0">06 / MACHINE LEARNING PIPELINE</span>
              <h2 className="reveal" data-delay="80">2-Stage CNN Audio Classification</h2>
              <p className="reveal" data-delay="150">
                The acoustic classification engine uses a Convolutional Neural Network (CNN) trained on spectrogram representations of goat bleats to detect overall physical state and specific stress conditions.
              </p>

              <div className="ml-cloud-note reveal" data-delay="220">
                <Zap size={18} />
                <p>
                  <strong>Cloud Deployment Note:</strong> The CNN model was containerized and hosted on GCP Cloud Run. I built the API wrapper that receives audio buffers from Google Cloud Storage and outputs formatted JSON predictions to Firestore.
                </p>
              </div>
            </div>

            <div className="ml-stages-wrapper">
              <div className="ml-stage-card reveal" data-delay="80">
                <div className="stage-header">
                  <span className="stage-pill">STAGE 1 — CORE STATE</span>
                  <span className="stage-accuracy">85% ACCURACY</span>
                </div>
                <h3>Primary Health &amp; Heat Detection</h3>
                <div className="stage-classes">
                  <span className="class-tag">Kondisi Baik</span>
                  <span className="class-tag highlight">Masa Subur (Heat)</span>
                  <span className="class-tag alert">Stres (Stress)</span>
                </div>
              </div>

              <div className="ml-stage-card reveal" data-delay="160">
                <div className="stage-header">
                  <span className="stage-pill">STAGE 2 — SPECIFIC STRESSORS</span>
                  <span className="stage-accuracy">88% ACCURACY</span>
                </div>
                <h3>Fine-Grained Condition Diagnosis</h3>
                <div className="stage-classes">
                  <span className="class-tag">Cedera (Injury)</span>
                  <span className="class-tag">Pemisahan Induk &amp; Anak</span>
                  <span className="class-tag">Melahirkan (Birthing)</span>
                  <span className="class-tag">Kehadiran Orang Asing</span>
                  <span className="class-tag">Isolasi Sosial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: DATA & CLOUD EVIDENCE */}
      <section className="mbelys-section mbelys-evidence-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">07 / WORKING SYSTEM EVIDENCE</span>
            <h2 className="reveal" data-delay="80">THE DATA PIPELINE IN ACTION</h2>
            <p className="mbelys-lead-desc reveal" data-delay="150">
              Raw audio captured by the IoT device is transferred to the cloud, stored in Google Cloud Storage buckets, processed via Cloud Run, and synchronized live in Firestore database collections.
            </p>
          </div>

          <div className="evidence-card reveal" data-delay="200">
            <div className="evidence-img-box">
              <Image
                src="/projects/mbelys/evidence-grid.png"
                alt="Firestore Database and GCS Evidence"
                width={1100}
                height={500}
                quality={95}
                className="evidence-img"
              />
            </div>
            <div className="evidence-caption">
              <strong>Real Project Evidence:</strong> (Left) ESP32-S3 IoT Hardware Node in protective housing; (Center) Live Firestore Database collections storing real-time prediction outputs; (Right Top) CNN Classification Report; (Right Bottom) Google Cloud Storage audio file bucket (<code>goat-audio-bucket/raw/</code>).
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: MOBILE APPLICATION */}
      <section className="mbelys-section mbelys-app-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">08 / MOBILE USER EXPERIENCE</span>
            <h2 className="reveal" data-delay="80">MBELYS MOBILE APPLICATION</h2>
            <p className="mbelys-lead-desc reveal" data-delay="150">
              Android application providing livestock farmers with real-time pen status alerts, heat detection notifications, and environmental condition recommendations.
            </p>
          </div>

          <div className="mbelys-app-grid">
            {[
              {
                src: '/projects/mbelys/app-kandang-list.png',
                alt: 'Mbelys App - Daftar Kandang',
                num: 'SCREEN 01',
                title: 'Daftar Kandang Overview',
                desc: 'Lists all monitored goat pens with real-time health badges (e.g. "Masa Subur" detected) synced instantly from Firestore.',
              },
              {
                src: '/projects/mbelys/app-kandang-detail.png',
                alt: 'Mbelys App - Detail Kandang Setup',
                num: 'SCREEN 02',
                title: 'Pen Management & Pairing',
                desc: 'Allows farmers to register new pens, configure location parameters, and pair ESP32-S3 IoT microphone hardware.',
              },
              {
                src: '/projects/mbelys/app-status-condition.png',
                alt: 'Mbelys App - Real-Time Condition Status',
                num: 'SCREEN 03',
                title: 'Real-Time Condition & Insights',
                desc: 'Displays detected vocal state ("Masa Subur terdeteksi"), current pen temperature/humidity, and AI recommendation advice.',
              },
            ].map((card, i) => (
              <div key={card.num} className="mbelys-app-card reveal" data-delay={`${i * 100}`}>
                <div className="app-phone-frame">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={340}
                    height={700}
                    quality={95}
                    className="app-screen-img"
                  />
                </div>
                <div className="app-card-caption">
                  <span className="app-screen-num">{card.num}</span>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: IMPACT */}
      <section className="mbelys-section mbelys-impact-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">09 / IMPACT &amp; RESULTS</span>
            <h2 className="reveal" data-delay="80">TRANSFORMING LIVESTOCK MONITORING</h2>
          </div>

          <div className="mbelys-impact-grid">
            <div className="impact-card before-card reveal" data-delay="80">
              <div className="impact-card-tag">BEFORE MBELYS</div>
              <h3>Traditional Manual Monitoring</h3>
              <ul>
                <li>Manual physical observation requiring full-time presence</li>
                <li>Time-consuming pen inspections across large farms</li>
                <li>High rate of missed estrus/heat windows (&quot;Masa Subur&quot;)</li>
                <li>Delayed injury or social isolation detection</li>
                <li>Subjective inspection with no historical data records</li>
              </ul>
            </div>

            <div className="impact-card after-card reveal" data-delay="160">
              <div className="impact-card-tag highlight">AFTER MBELYS</div>
              <h3>Cloud &amp; IoT Automated Intelligence</h3>
              <ul>
                <li>24/7 automated continuous acoustic monitoring</li>
                <li>Instant cloud-connected alerts streamed directly to smartphones</li>
                <li>85% – 88% accuracy in heat and stress classification</li>
                <li>Actionable smart recommendations for immediate farm interventions</li>
                <li>Scalable GCP infrastructure supporting multiple pens simultaneously</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: TECH STACK */}
      <section className="mbelys-section mbelys-stack-section">
        <div className="mbelys-container">
          <div className="mbelys-header-center">
            <span className="mbelys-tag reveal" data-delay="0">10 / TECHNICAL STACK</span>
            <h2 className="reveal" data-delay="80">TECHNOLOGY ARCHITECTURE</h2>
          </div>

          <div className="mbelys-stack-grid">
            {[
              {
                cat: 'IoT ENGINEERING',
                badges: ['ESP32-S3 N16R8', 'INMP441 Microphone', 'I2S Audio Protocol', 'C++ / Arduino'],
              },
              {
                cat: 'CLOUD INFRASTRUCTURE',
                badges: ['Google Cloud Run', 'Google Cloud Storage (GCS)', 'Firebase Firestore', 'GCP IAM & Logging'],
              },
              {
                cat: 'MACHINE LEARNING',
                badges: ['TensorFlow / Keras CNN', 'Mel-Spectrogram Feature Extraction', '2-Stage Classification Model', 'GCP Inference API Endpoint'],
              },
              {
                cat: 'MOBILE APPLICATION',
                badges: ['Android Studio', 'Java / Kotlin', 'Firebase SDK', 'Realtime Event Listeners'],
              },
            ].map((block, i) => (
              <div key={block.cat} className="stack-block reveal" data-delay={`${i * 80}`}>
                <span className="stack-cat">{block.cat}</span>
                <div className="stack-badges">
                  {block.badges.map((b) => (
                    <span key={b} className="tech-badge">{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {project.github && (
        <ProjectGithubCTA
          githubUrl={project.github}
          title="Explore the Mbelys Project Repository"
          description="View the firmware source, GCP cloud run inference API, and Firebase integration setup."
          buttonLabel="GITHUB REPOSITORY"
        />
      )}

      <ProjectNavFooter currentId="mbelys" previous={previous} next={next} />
    </main>
  )
}
