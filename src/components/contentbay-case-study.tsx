'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, GitBranch, ShieldCheck, Database, Layers, Cpu, CheckCircle2, Video, Code, Terminal, Sparkles } from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import { ContentBayShowcaseVideo } from '@/src/components/contentbay-showcase-video'
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

export function ContentBayCaseStudyPage({ project }: { project: PortfolioProject }) {
  const index = projects.findIndex((item) => item.id === 'contentbay')
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const mainRef = useReveal()

  return (
    <main
      className="project-page-root case-study contentbay-case-study"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#0284c7',
          '--project-accent-rgb': '2, 132, 199',
          '--project-title-color': '#0f172a',
          '--project-subtitle-color': '#1e293b',
          '--project-muted': '#334155',
          '--project-val-color': '#0f172a',
          '--project-card-bg': '#ffffff',
          '--project-card-border': 'rgba(2, 132, 199, 0.18)',
          '--project-card-shadow': '0 4px 20px rgba(0, 0, 0, 0.06)',
          '--project-kicker-bg': 'rgba(2, 132, 199, 0.08)',
          '--project-kicker-border': 'rgba(2, 132, 199, 0.25)',
        } as React.CSSProperties
      }
    >
      {/* ── 1. HERO SECTION ── */}
      <header className="contentbay-hero-section">
        <div className="contentbay-container">
          <ProjectBackButton />

          <div className="contentbay-kicker reveal" data-delay="0">
            <span className="contentbay-kicker-dot" />
            API-FIRST • HEADLESS CMS • CONTENT INFRASTRUCTURE
          </div>

          <h1 className="contentbay-hero-title reveal" data-delay="80">
            ContentBay
          </h1>

          <p className="contentbay-hero-subtitle reveal" data-delay="160">
            API-First Headless CMS Platform for Centralized &amp; Flexible Content Management
          </p>

          <p className="contentbay-hero-lead reveal" data-delay="220">
            ContentBay is a modern headless CMS that decouples content management from frontend presentation, empowering developers to build fast with flexible REST/GraphQL APIs and giving content creators intuitive tools to manage structured content at scale.
          </p>

          {/* Recruiter-First Metadata Grid */}
          <div className="contentbay-meta-grid reveal" data-delay="300">
            <div className="contentbay-meta-item">
              <span className="meta-label">ROLE</span>
              <strong className="meta-val">Developer &amp; System Analyst</strong>
            </div>
            <div className="contentbay-meta-item">
              <span className="meta-label">RESPONSIBILITIES</span>
              <strong className="meta-val">Requirements · Workflow Design · Frontend/Backend</strong>
            </div>
            <div className="contentbay-meta-item">
              <span className="meta-label">TECH STACK</span>
              <strong className="meta-val">Next.js · Node.js · REST / GraphQL · TypeScript</strong>
            </div>
            <div className="contentbay-meta-item">
              <span className="meta-label">ARCHITECTURE</span>
              <strong className="meta-val">Headless • API-First • Decoupled Platform</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. PRODUCT SHOWCASE VIDEO (HERO PRODUCT HIGHLIGHT) ── */}
      <section className="contentbay-section showcase-video-section">
        <div className="contentbay-container">
          <div className="contentbay-header-center">
            <span className="contentbay-tag reveal" data-delay="0">PRODUCT SHOWCASE</span>
            <h2 className="reveal" data-delay="80">EXPERIENCE THE CONTENTBAY INTERFACE</h2>
            <p className="contentbay-lead-desc reveal" data-delay="150">
              Explore the actual working ContentBay UI through an interactive product showcase video, highlighting landing experience, workspace architecture, and content schema configuration.
            </p>
          </div>

          {/* Product Showcase Video Component */}
          <div className="reveal" data-delay="200">
            <ContentBayShowcaseVideo />
          </div>

          <div className="video-caption-note reveal" data-delay="260">
            <Video size={16} />
            <span>
              <strong>Authentic SaaS Showcase:</strong> Demonstrates the actual ContentBay web application layout, typography, navigation, and workspace modeling interface with smooth camera dolly-in, cursor tracking, and scene highlights.
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. OVERVIEW: THE PROBLEM & SOLUTION ── */}
      <section className="contentbay-section contentbay-overview-section">
        <div className="contentbay-container">
          <div className="contentbay-grid-2col">
            <div className="contentbay-col">
              <span className="contentbay-tag reveal" data-delay="0">01 / THE CHALLENGE</span>
              <h2 className="reveal" data-delay="80">Traditional Monolithic CMS Creates Developer Bottlenecks</h2>
              <p className="reveal" data-delay="150">
                Traditional content management systems couple backend data tightly to specific web HTML templates. This makes cross-platform delivery to mobile apps, modern Jamstack sites, and IoT devices tedious, slow, and expensive to maintain.
              </p>
            </div>
            <div className="contentbay-col">
              <span className="contentbay-tag reveal" data-delay="80">02 / THE SOLUTION</span>
              <h2 className="reveal" data-delay="150">Centralized API-First Headless Content Infrastructure</h2>
              <p className="reveal" data-delay="220">
                ContentBay acts as a centralized content repository. Content managers model structured schemas once, author content in a clean visual interface, and serve structured JSON payloads instantly to any frontend framework via high-speed APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. TECHNICAL OWNERSHIP & CORE CAPABILITIES ── */}
      <section className="contentbay-section contentbay-features-section">
        <div className="contentbay-container">
          <div className="contentbay-header-center">
            <span className="contentbay-tag reveal" data-delay="0">03 / TECHNICAL CAPABILITIES</span>
            <h2 className="reveal" data-delay="80">SYSTEM ARCHITECTURE &amp; WORKFLOWS</h2>
            <p className="contentbay-lead-desc reveal" data-delay="150">
              Key platform capabilities engineered to provide developer agility and effortless content administration.
            </p>
          </div>

          <div className="contentbay-cards-grid">
            {/* Card 1 */}
            <div className="contentbay-card reveal" data-delay="80">
              <div className="card-header">
                <span className="card-num">01</span>
                <Layers className="card-icon" size={20} />
              </div>
              <h3>Headless Content Modeling</h3>
              <p className="card-desc">
                Define reusable content types and field schemas with granular property validation (Title, RichText, Assets, Relations, Toggles).
              </p>
              <ul className="card-bullets">
                <li><CheckCircle2 size={14} /> Custom field ID configuration</li>
                <li><CheckCircle2 size={14} /> Validation rules &amp; required field flags</li>
                <li><CheckCircle2 size={14} /> Modular component nesting</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="contentbay-card featured reveal" data-delay="160">
              <div className="card-header">
                <span className="card-num">02</span>
                <Code className="card-icon" size={20} />
              </div>
              <h3>API-First Delivery Pipeline</h3>
              <p className="card-desc">
                High-performance REST &amp; GraphQL endpoints serving structured JSON payloads with low latency.
              </p>
              <ul className="card-bullets">
                <li><CheckCircle2 size={14} /> Automated API endpoint generation</li>
                <li><CheckCircle2 size={14} /> Token-based API access key scoping</li>
                <li><CheckCircle2 size={14} /> Fast CDN cache purging on publish</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="contentbay-card reveal" data-delay="240">
              <div className="card-header">
                <span className="card-num">03</span>
                <Database className="card-icon" size={20} />
              </div>
              <h3>Workspace Isolation</h3>
              <p className="card-desc">
                Multi-tenant workspace management for segregating organizational projects and delivery environments.
              </p>
              <ul className="card-bullets">
                <li><CheckCircle2 size={14} /> Environment staging (Dev, Prod)</li>
                <li><CheckCircle2 size={14} /> Role-based permission controls</li>
                <li><CheckCircle2 size={14} /> Organization content architectures</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. REAL UI INTERFACE GALLERY ── */}
      <section className="contentbay-section contentbay-gallery-section">
        <div className="contentbay-container">
          <div className="contentbay-header-center">
            <span className="contentbay-tag reveal" data-delay="0">04 / INTERFACE GALLERY</span>
            <h2 className="reveal" data-delay="80">AUTHENTIC PRODUCT SCREENS</h2>
            <p className="contentbay-lead-desc reveal" data-delay="150">
              Detailed breakdown of ContentBay interface views as designed and deployed.
            </p>
          </div>

          <div className="gallery-grid">
            {/* Screen 1 */}
            <div className="gallery-card reveal" data-delay="80">
              <div className="gallery-frame">
                <Image
                  src="/projects/contentbay/hero-landing.png"
                  alt="ContentBay Platform Landing Page Interface"
                  width={1200}
                  height={675}
                  quality={95}
                  className="gallery-img"
                />
              </div>
              <div className="gallery-caption">
                <strong>01. Platform Landing Page:</strong> Visual Editor 2.0 hero spotlight, developer freedom copy, and action buttons (&quot;Start Building for Free&quot;, &quot;Book a Demo&quot;).
              </div>
            </div>

            {/* Screen 2 & 3 row */}
            <div className="gallery-row-2col">
              <div className="gallery-card reveal" data-delay="140">
                <div className="gallery-frame">
                  <Image
                    src="/projects/contentbay/workspace-dashboard.png"
                    alt="ContentBay Workspace Management Dashboard"
                    width={1000}
                    height={560}
                    quality={95}
                    className="gallery-img"
                  />
                </div>
                <div className="gallery-caption">
                  <strong>02. Workspace Management Dashboard:</strong> Centralized organization environment list displaying models, contents count, search, and &quot;+ Add new workspace&quot; control.
                </div>
              </div>

              <div className="gallery-card reveal" data-delay="200">
                <div className="gallery-frame">
                  <Image
                    src="/projects/contentbay/content-model-modal.png"
                    alt="ContentBay Content Model Field Configuration Overlay"
                    width={1000}
                    height={560}
                    quality={95}
                    className="gallery-img"
                  />
                </div>
                <div className="gallery-caption">
                  <strong>03. Content Field Property Configuration:</strong> Modal configuration overlay for customizing field Name, Field ID, List &amp; Entry Title toggles, and schema confirmation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TECH STACK ── */}
      <section className="contentbay-section contentbay-stack-section">
        <div className="contentbay-container">
          <div className="contentbay-header-center">
            <span className="contentbay-tag reveal" data-delay="0">05 / TECH STACK</span>
            <h2 className="reveal" data-delay="80">TECHNOLOGY STACK &amp; METHODOLOGY</h2>
          </div>

          <div className="stack-grid">
            {[
              {
                cat: 'FRONTEND & APPLICATION UI',
                badges: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Lucide Icons'],
              },
              {
                cat: 'API & BACKEND SERVICES',
                badges: ['Node.js', 'REST API', 'GraphQL', 'JSON Schema Validation'],
              },
              {
                cat: 'SYSTEM ANALYSIS & DESIGN',
                badges: ['Headless CMS Architecture', 'Workspace Isolation', 'RBAC Permissions', 'System Workflows'],
              },
              {
                cat: 'DEPLOYMENT & DEVOPS',
                badges: ['Vercel', 'CDN Content Delivery', 'Git Version Control'],
              },
            ].map((block, i) => (
              <div key={block.cat} className="stack-card reveal" data-delay={`${i * 80}`}>
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

      {/* Standardized GitHub CTA */}
      <ProjectGithubCTA
        githubUrl={project.github}
        demoUrl={project.demo}
        title="Explore the ContentBay Headless CMS"
        description="View the source code, system workflows, and developer API documentation on GitHub."
        buttonLabel="GITHUB REPOSITORY"
      />

      <ProjectNavFooter currentId="contentbay" previous={previous} next={next} />
    </main>
  )
}
