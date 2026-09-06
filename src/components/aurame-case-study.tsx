'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ExternalLink, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

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

export function AurameCaseStudyPage({ project }: { project: PortfolioProject }) {
  const index = projects.findIndex((item) => item.id === project.id)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const mainRef = useReveal()

  return (
    <main
      className="project-page-root aurame-case-study"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#800020',
          '--project-accent-rgb': '128, 0, 32',
          '--project-title-color': '#2b1018',
          '--project-card-bg': '#ffffff',
          '--project-card-border': 'rgba(128, 0, 32, 0.15)',
          '--project-muted': '#5c454d',
          '--project-val-color': '#2b1018',
        } as React.CSSProperties
      }
    >
      {/* ── 1. PROJECT HEADER ── */}
      <section className="aurame-header-section">
        <div className="aurame-header-container">
          <ProjectBackButton />

          <div className="aurame-meta-badge-row reveal" data-delay="0">
            <span className="aurame-meta-badge">UI/UX DESIGN</span>
            <span className="aurame-meta-badge">WEB DESIGN</span>
            <span className="aurame-meta-badge">2026</span>
          </div>

          <div className="aurame-title-row">
            <h1 className="aurame-project-title reveal" data-delay="80">
              <span className="aurame-wordmark-hero">Auramé</span>
            </h1>
            <p className="aurame-project-subtitle reveal" data-delay="160">
              E-Commerce Experience for Beauty, Fashion &amp; Local Artisans (UMKM)
            </p>
          </div>

          <p className="aurame-lead-description reveal" data-delay="220">
            Auramé is a beauty and fashion web platform designed to combine editorial visual elegance with an inclusive shopping journey. Built around product clarity, intuitive curation, and a dedicated spotlight for local UMKM creators.
          </p>

          <div className="aurame-specs-grid reveal" data-delay="300">
            <div className="aurame-spec-item">
              <span className="aurame-spec-label">ROLE</span>
              <strong className="aurame-spec-value">UI/UX Designer</strong>
            </div>
            <div className="aurame-spec-item">
              <span className="aurame-spec-label">RESPONSIBILITIES</span>
              <strong className="aurame-spec-value">User Flows · Figma Design System · Prototyping</strong>
            </div>
            <div className="aurame-spec-item">
              <span className="aurame-spec-label">TOOLS</span>
              <strong className="aurame-spec-value">Figma · Auto-Layout · Design Tokens</strong>
            </div>
            <div className="aurame-spec-item">
              <span className="aurame-spec-label">FOCUS AREAS</span>
              <strong className="aurame-spec-value">Beauty E-Commerce · Local Artisans (UMKM)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. HERO VISUAL SHOWCASE ── */}
      <section className="aurame-hero-visual-section">
        <div className="aurame-container">
          <div className="aurame-hero-visual-container reveal" data-delay="200">
            <div className="aurame-frame-header">
              <div className="aurame-frame-dots">
                <span /> <span /> <span />
              </div>
              <span className="aurame-frame-url">aurame.com / showcase-overview</span>
            </div>
            <div className="aurame-hero-image-wrapper">
              <Image
                src="/projects/aurame/mockup-isometric.png"
                alt="Auramé Website UI Screens Overview"
                width={1600}
                height={900}
                priority
                className="aurame-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROJECT OVERVIEW ── */}
      <section className="aurame-section aurame-overview-section">
        <div className="aurame-container">
          <div className="aurame-two-col-grid">
            <div className="aurame-col-left">
              <span className="aurame-section-num reveal" data-delay="0">01 / CONCEPT</span>
              <h2 className="aurame-section-title reveal" data-delay="80">
                Elevating the beauty e-commerce experience.
              </h2>
            </div>
            <div className="aurame-col-right">
              <p className="aurame-body-text reveal" data-delay="100">
                The core challenge in designing Auramé was creating a digital space that feels simultaneously high-end and welcoming to local business initiatives. Traditional luxury beauty websites can feel cold or overwhelming, while community marketplaces often lack visual polish.
              </p>
              <p className="aurame-body-text reveal" data-delay="150">
                Our design direction balances generous whitespace, rich editorial imagery, and structured product taxonomy to guide users effortlessly from inspiration to checkout.
              </p>

              <div className="aurame-pillars-grid">
                <div className="aurame-pillar-card reveal" data-delay="80">
                  <h3>Refined Aesthetic</h3>
                  <p>Soft rose tones and deep burgundy accents complement clean white surfaces.</p>
                </div>
                <div className="aurame-pillar-card reveal" data-delay="140">
                  <h3>UMKM Curation</h3>
                  <p>Dedicated storytelling banners highlighting Indonesian local artisan craft.</p>
                </div>
                <div className="aurame-pillar-card reveal" data-delay="200">
                  <h3>Intuitive Browsing</h3>
                  <p>Streamlined category filters, flash deals, and persistent wishlist access.</p>
                </div>
                <div className="aurame-pillar-card reveal" data-delay="260">
                  <h3>Frictionless Checkout</h3>
                  <p>Minimal forms and clear bill summaries designed for modern shoppers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BRAND & DESIGN SYSTEM ── */}
      <section className="aurame-section aurame-design-system-section">
        <div className="aurame-container">
          <div className="aurame-section-header">
            <span className="aurame-section-num reveal" data-delay="0">02 / VISUAL IDENTITY</span>
            <h2 className="aurame-section-title reveal" data-delay="80">Design System &amp; Brand Language</h2>
            <p className="aurame-section-lead reveal" data-delay="140">
              Every element was crafted to reinforce trust, elegance, and product readability.
            </p>
          </div>

          {/* Brand Logo Banner */}
          <div className="aurame-brand-display-box reveal" data-delay="180">
            <div className="aurame-brand-display-left">
              <span className="aurame-wordmark-display">Auramé</span>
              <p className="aurame-brand-tagline">Elevate Your Look. Empower Your Style.</p>
            </div>
            <div className="aurame-brand-display-right">
              <span className="aurame-serif-note">Exclusive Brand Serif: Merriweather</span>
            </div>
          </div>

          {/* Typography System */}
          <div className="aurame-sub-grid">
            <div className="aurame-sys-card reveal" data-delay="100">
              <span className="aurame-sys-label">TYPOGRAPHY HIERARCHY</span>
              <div className="aurame-type-samples">
                <div className="type-sample">
                  <span className="type-role">Brand Logo / Wordmark</span>
                  <span className="type-spec font-merriweather">Merriweather Bold</span>
                  <p className="type-preview font-merriweather">Auramé</p>
                </div>
                <div className="type-sample">
                  <span className="type-role">Headings &amp; Section Titles</span>
                  <span className="type-spec font-poppins">Poppins SemiBold / Medium</span>
                  <p className="type-preview font-poppins">Elevate Your Look</p>
                </div>
                <div className="type-sample">
                  <span className="type-role">Body Text, Labels &amp; Navigation</span>
                  <span className="type-spec font-open-sans">Open Sans Regular / Light</span>
                  <p className="type-preview font-open-sans">Discover the latest trends in fashion and beauty curated just for you.</p>
                </div>
              </div>
            </div>

            {/* Color Palette */}
            <div className="aurame-sys-card reveal" data-delay="180">
              <span className="aurame-sys-label">COLOR PALETTE</span>
              <div className="aurame-swatches-list">
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#800A38' }} />
                  <div className="swatch-meta">
                    <strong>Deep Burgundy</strong>
                    <span>#800A38 · Primary Accent</span>
                  </div>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#F5EBEB' }} />
                  <div className="swatch-meta">
                    <strong>Soft Rose</strong>
                    <span>#F5EBEB · Surface Tint</span>
                  </div>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#121212' }} />
                  <div className="swatch-meta">
                    <strong>Charcoal Dark</strong>
                    <span>#121212 · Deep Background</span>
                  </div>
                </div>
                <div className="swatch-item">
                  <div className="swatch-color" style={{ background: '#FFFFFF', border: '1px solid #ddd' }} />
                  <div className="swatch-meta">
                    <strong>Pure White</strong>
                    <span>#FFFFFF · Content Surface</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UI Elements Showcase */}
          <div className="aurame-ui-elements-box reveal" data-delay="220">
            <span className="aurame-sys-label">UI COMPONENTS &amp; BUTTONS</span>
            <div className="aurame-components-row">
              <button className="aurame-demo-btn-primary">Shop Now</button>
              <button className="aurame-demo-btn-secondary">Explore Here</button>
              <button className="aurame-demo-btn-outline">See More</button>
              <span className="aurame-demo-badge">40% OFF</span>
              <span className="aurame-demo-badge-umkm">UMKM SPOTLIGHT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SELECTED SCREENS GALLERY ── */}
      <section className="aurame-section aurame-screens-section">
        <div className="aurame-container">
          <div className="aurame-section-header">
            <span className="aurame-section-num reveal" data-delay="0">03 / KEY INTERFACES</span>
            <h2 className="aurame-section-title reveal" data-delay="80">Selected Interface Screens</h2>
            <p className="aurame-section-lead reveal" data-delay="140">
              Curated views showcasing the landing experience, local creator stories, and wishlist management.
            </p>
          </div>

          {/* Screen 1: Homepage Showcase */}
          <div className="aurame-screen-card full-width reveal" data-delay="180">
            <div className="aurame-screen-meta">
              <span className="aurame-screen-tag">01. HOMEPAGE &amp; CATEGORY DISCOVERY</span>
              <p>Featuring hero editorial video, category tabs, flash sale carousel, and UMKM narrative banner.</p>
            </div>
            <div className="aurame-screen-frame homepage-frame scrollable-frame">
              <Image
                src="/projects/aurame/home-screen.png"
                alt="Auramé Homepage Interface Screen"
                width={880}
                height={1600}
                quality={95}
                className="aurame-screen-img crisp-screen-img"
              />
            </div>
          </div>

          {/* Screen 2 & 3 Grid */}
          <div className="aurame-two-screens-grid">
            {/* Screen 2: UMKM Products */}
            <div className="aurame-screen-card reveal" data-delay="100">
              <div className="aurame-screen-meta">
                <span className="aurame-screen-tag">02. UMKM PRODUCTS &amp; SPOTLIGHT</span>
                <p>Dedicated portal celebrating local creator craftsmanship and curated lookbooks.</p>
              </div>
              <div className="aurame-screen-frame scrollable-frame">
                <Image
                  src="/projects/aurame/umkm-screen.png"
                  alt="Auramé UMKM Products Screen"
                  width={1200}
                  height={2000}
                  className="aurame-screen-img"
                />
              </div>
            </div>

            {/* Screen 3: Wishlist */}
            <div className="aurame-screen-card reveal" data-delay="180">
              <div className="aurame-screen-meta">
                <span className="aurame-screen-tag">03. WISHLIST &amp; DISCOVERY GRID</span>
                <p>Clean product catalog with price tags, rating counters, and quick add-to-favorites.</p>
              </div>
              <div className="aurame-screen-frame scrollable-frame">
                <Image
                  src="/projects/aurame/wishlist-screen.png"
                  alt="Auramé Wishlist Screen"
                  width={1200}
                  height={2000}
                  className="aurame-screen-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. UX / INTERACTION FLOW ── */}
      <section className="aurame-section aurame-flow-section">
        <div className="aurame-container">
          <div className="aurame-section-header">
            <span className="aurame-section-num reveal" data-delay="0">04 / INTERACTION</span>
            <h2 className="aurame-section-title reveal" data-delay="80">The User Journey</h2>
            <p className="aurame-section-lead reveal" data-delay="140">
              Guiding customers through discovery, storytelling, and purchase with minimal friction.
            </p>
          </div>

          <div className="aurame-flow-diagram reveal" data-delay="200">
            <div className="flow-step">
              <span className="step-num">01</span>
              <h4>DISCOVER</h4>
              <p>Engage via editorial hero banner &amp; seasonal trend highlights.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="step-num">02</span>
              <h4>EXPLORE</h4>
              <p>Filter by fashion, beauty, or local UMKM artisan collections.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="step-num">03</span>
              <h4>SELECT</h4>
              <p>Review product details, save to wishlist, or check size charts.</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <span className="step-num">04</span>
              <h4>PURCHASE</h4>
              <p>Transparent billing summary &amp; express payment options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. RESPONSIVE DESIGN ── */}
      <section className="aurame-section aurame-responsive-section">
        <div className="aurame-container">
          <div className="aurame-two-col-grid">
            <div className="aurame-col-left">
              <span className="aurame-section-num reveal" data-delay="0">05 / ADAPTABILITY</span>
              <h2 className="aurame-section-title reveal" data-delay="80">Responsive Across Devices</h2>
              <p className="aurame-body-text reveal" data-delay="140">
                From desktop widescreen browsing to mobile quick shopping, the design system scales seamlessly while maintaining typographic harmony and tactile interaction states.
              </p>
              <ul className="aurame-check-list reveal" data-delay="200">
                <li><CheckCircle2 size={16} /> Fluid typographic scaling using CSS clamp</li>
                <li><CheckCircle2 size={16} /> Touch-optimized product card touch targets</li>
                <li><CheckCircle2 size={16} /> High-contrast image accessibility</li>
              </ul>
            </div>

            <div className="aurame-col-right">
              <div className="aurame-device-mockup-frame reveal" data-delay="180">
                <Image
                  src="/projects/aurame/mockup-isometric.png"
                  alt="Auramé Mobile and Desktop Multi-Device View"
                  width={1000}
                  height={650}
                  className="aurame-responsive-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FINAL SHOWCASE & CTA ── */}
      <section className="aurame-final-cta-section">
        <div className="aurame-container">
          <div className="aurame-final-container reveal" data-delay="100">
            <span className="aurame-wordmark-large">Auramé</span>
            <h2 className="aurame-final-quote">
              &ldquo;Designed to feel as refined as the brand itself.&rdquo;
            </h2>
            <p className="aurame-final-sub">
              Explore the complete interactive prototype, component library, and design files directly in Figma.
            </p>

            <div className="aurame-cta-actions">
              {project.figma && (
                <a
                  href={project.figma}
                  target="_blank"
                  rel="noreferrer"
                  className="aurame-primary-cta-btn"
                >
                  View Live Figma Project <ExternalLink size={18} />
                </a>
              )}
              <Link href="/showcase/projects" className="aurame-secondary-cta-btn">
                Explore All Projects <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Navigation Footer ── */}
      <ProjectNavFooter currentId="aurame" previous={previous} next={next} />
    </main>
  )
}

