'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Layers,
  Palette,
  Layout,
  Smartphone,
  CheckCircle2,
  Compass,
  Store,
  MessageSquare,
  Mail,
  Maximize2,
  X,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Eye,
  Sliders,
  ChevronRight,
  FolderTree,
  Boxes,
  Sparkles,
  Monitor,
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

function FigmaIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83" />
      <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF" />
      <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E" />
      <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262" />
      <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    root.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ─────────────────────────────────────────────────────────────
   PAGE DATA & SCREENSHOTS
───────────────────────────────────────────────────────────── */
interface ScreenItem {
  id: string
  title: string
  category: string
  src: string
  caption: string
  description: string
  highlights: string[]
}

const JCI_SCREENS: ScreenItem[] = [
  {
    id: 'product',
    title: 'Product Catalog',
    category: 'Product Discovery',
    src: '/projects/jci/jci_product.png',
    caption: 'Product catalog — categorized drone discovery and card specifications',
    description:
      'Organizes JCI’s drone lineup into clear categories (Cinematography, Beginner, Search & Rescue) with consistent high-contrast product cards.',
    highlights: ['Category sidebar navigation', 'Card specs (SkyVision X7, AeroLite S3, Titan Pro R9, CineFly V2)', 'Buy Now & Learn More action triggers'],
  },
  {
    id: 'online-store',
    title: 'Online Store & Mobile App',
    category: 'Digital Retail',
    src: '/projects/jci/jci_online_store.png',
    caption: 'Store experience — digital purchasing channels and mobile app showcase',
    description:
      'Presents the digital shopping ecosystem featuring the JCI Mobile App, warranty & tracking guarantees, and direct e-commerce marketplace links.',
    highlights: ['Online/Offline tab switcher', 'JCI Mobile App feature showcase', 'Marketplace hubs (Shopee, Tokopedia, Blibli)', 'Delivery & warranty badges'],
  },
  {
    id: 'offline-store',
    title: 'Offline Store & Retailers',
    category: 'Physical Retail',
    src: '/projects/jci/jci_offline_store.png',
    caption: 'Offline Store — authorized flagship retailers and regional directory',
    description:
      'Connects customers with physical retail flagships, providing searchable regional listings, country filtering, and interactive world map graphics.',
    highlights: ['Flagship store directory (Jakarta KGM, IG, PC)', 'Country filter & store search bar', 'World retail coverage graphic'],
  },
  {
    id: 'home',
    title: 'Home & Brand Vision',
    category: 'Brand Experience',
    src: '/projects/jci/jci_home.png',
    caption: 'Home page — dynamic hero carousel, brand narrative, and innovation achievements',
    description:
      'The central brand gateway introducing the SkyVision X7 flagship drone, customer flight statistics (2,500,123+ flights), awards, and core expertise.',
    highlights: ['Full-bleed cinematic hero carousel', 'Flight counter & brand narrative', 'Droning Awards & Photo Awards badges', 'Feature highlights grid'],
  },
  {
    id: 'contact',
    title: 'Contact & Support',
    category: 'Customer Care',
    src: '/projects/jci/jci_contact.png',
    caption: 'Contact — customer support inquiry form and physical campus location',
    description:
      'Provides a clean, accessible support channel with structured input fields, Terms of Service validation, and location mapping for Binus University Anggrek.',
    highlights: ['Structured support inquiry form', 'Terms of Service acknowledgement', 'Google Maps campus embed integration', 'Direct email & phone channels'],
  },
]

/* ─────────────────────────────────────────────────────────────
   HERO EDITORIAL VISUAL WIDGET
───────────────────────────────────────────────────────────── */
function HeroEditorialVisual({ onExpand }: { onExpand: (screen: ScreenItem) => void }) {
  const [selectedScreen, setSelectedScreen] = useState<ScreenItem>(JCI_SCREENS[0])

  return (
    <div className="jci-hero-widget">
      {/* Top Browser Bar */}
      <div className="jci-browser-bar">
        <div className="jci-browser-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="jci-browser-url">
          <span className="text-gray-400">https://</span>
          <span className="text-gray-200">jci-drone.com</span>
          <span className="text-red-400">/{selectedScreen.id}</span>
        </div>
        <div className="jci-badge-workflow">
          <span>FIGMA</span>
          <span className="arrow">→</span>
          <span>PROTOTYPE</span>
          <span className="arrow">→</span>
          <span className="active">CODE</span>
        </div>
      </div>

      {/* Main Showcase Image */}
      <div className="jci-browser-viewport">
        <div className="jci-viewport-screen-wrap">
          <Image
            src={selectedScreen.src}
            alt={selectedScreen.title}
            width={800}
            height={500}
            className="jci-viewport-img"
            priority
          />
        </div>

        <button
          type="button"
          className="jci-viewport-expand-btn"
          onClick={() => onExpand(selectedScreen)}
          aria-label="Expand full screen"
        >
          <Maximize2 size={14} /> <span>View Full Screen</span>
        </button>
      </div>

      {/* Screen Selector Strip */}
      <div className="jci-screen-tabs-bar">
        <span className="tabs-bar-label">INSPECT PAGES:</span>
        <div className="jci-screen-tabs">
          {JCI_SCREENS.map((screen) => (
            <button
              key={screen.id}
              type="button"
              className={`jci-screen-tab-btn ${selectedScreen.id === screen.id ? 'active' : ''}`}
              onClick={() => setSelectedScreen(screen)}
            >
              <span className="tab-dot" />
              <span>{screen.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX MODAL
───────────────────────────────────────────────────────────── */
function ImageLightbox({
  screen,
  onClose,
}: {
  screen: ScreenItem | null
  onClose: () => void
}) {
  if (!screen) return null

  return (
    <div className="jci-lightbox-backdrop" onClick={onClose}>
      <div className="jci-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="jci-lightbox-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div className="jci-lightbox-scrollable">
          <Image
            src={screen.src}
            alt={screen.title}
            width={1200}
            height={2400}
            className="jci-lightbox-img"
          />
        </div>
        <div className="jci-lightbox-footer">
          <div>
            <span className="footer-category">{screen.category}</span>
            <h4 className="footer-title">{screen.title}</h4>
            <p className="footer-caption">{screen.caption}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export function JciCaseStudyPage({ project }: { project: PortfolioProject }) {
  const ref = useReveal()
  const [activeLightbox, setActiveLightbox] = useState<ScreenItem | null>(null)
  const [activeIaTab, setActiveIaTab] = useState<'home' | 'product' | 'store' | 'forum' | 'contact'>('store')

  const index = projects.findIndex((p) => p.id === 'jci')
  const previous = index !== -1 ? projects[(index - 1 + projects.length) % projects.length] : null
  const next = index !== -1 ? projects[(index + 1) % projects.length] : null

  return (
    <main
      className="project-page-root case-study jci-case-page"
      ref={ref as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#dc2626',
          '--project-accent-rgb': '220, 38, 38',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(220, 38, 38, 0.03)',
          '--project-card-border': 'rgba(220, 38, 38, 0.15)',
        } as React.CSSProperties
      }
    >
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <header className="project-hero-section jci-hero">
        <ProjectContainer>
          <ProjectBackButton />

          <div className="project-hero-layout-split">
            <div className="project-hero-copy">
              <div className="project-kicker reveal">
                <span className="project-kicker-dot" style={{ backgroundColor: '#dc2626' }} />
                WEB DESIGN / FRONTEND DEVELOPMENT
              </div>
              <h1 className="project-hero-title reveal">JCI — Drone Innovation</h1>
              <p className="project-hero-subtitle reveal">
                UI/UX Design & Frontend Development
              </p>
              <p className="project-hero-lead reveal">
                From Figma concepts and interactive prototypes to a responsive HTML, CSS, and JavaScript
                implementation for a modern aerial technology brand.
              </p>

              <div className="reveal">
                <ProjectMetaGrid
                  items={[
                    { label: 'ROLE', value: 'UI/UX Designer · Frontend Developer' },
                    { label: 'PLATFORM', value: 'Responsive Multi-Page Website' },
                    { label: 'TOOLS', value: 'Figma · HTML5 · CSS3 · JavaScript' },
                    { label: 'DELIVERABLES', value: 'Figma Prototype · Production Codebase' },
                  ]}
                />
              </div>

              <div
                className="project-hero-actions reveal"
                style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
              >
                <a
                  href="https://github.com/RichelleMarvela/JCI-Drone-Website.git"
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-button"
                >
                  <GitBranch size={16} /> VIEW GITHUB <ArrowUpRight size={16} />
                </a>

                <a
                  href="https://www.figma.com/design/s3Fghxvf4ySWYQvQfZH7nV/LAB_2702208543?node-id=0-1&t=TTAxipLSmkXdGxXN-1"
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-button project-github-button-alt"
                >
                  <FigmaIcon size={16} /> FIGMA DESIGN <ExternalLink size={16} />
                </a>

                <a
                  href="https://www.figma.com/proto/s3Fghxvf4ySWYQvQfZH7nV/LAB_2702208543?node-id=54-87&p=f&t=msEjp0SxyaS2HFks-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=134%3A1478"
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-button project-github-button-alt"
                >
                  <Smartphone size={16} /> PROTOTYPE <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="project-hero-visual-slot reveal">
              <HeroEditorialVisual onExpand={(screen) => setActiveLightbox(screen)} />
            </div>
          </div>
        </ProjectContainer>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          01 — OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="overview"
        tag="01 — OVERVIEW"
        title="From Interface Design to Frontend Implementation"
        lead="JCI Drone Innovation is a multi-page website concept created to present a modern drone brand and its digital ecosystem."
      >
        <div className="jci-overview-grid reveal">
          <div className="jci-overview-card">
            <div className="overview-badge">THE DESIGN-TO-CODE WORKFLOW</div>
            <h3>Building a Cohesive Aerial Tech Brand Experience</h3>
            <p className="overview-p">
              The project encapsulates a complete digital experience for a fictional high-performance drone manufacturer.
              Rather than stopping at static mockups, the design was translated into an interactive Figma prototype and
              subsequently engineered into a responsive multi-page web implementation using semantic HTML5, clean CSS3,
              and vanilla JavaScript.
            </p>
            <p className="overview-p">
              The platform addresses key user touchpoints across the entire customer lifecycle: discovering advanced
              cinematography drones, exploring retail channels, engaging in community discussions, and reaching customer care.
            </p>
          </div>

          <div className="jci-ecosystem-cards">
            <div className="eco-card">
              <div className="eco-icon text-red-500">
                <Compass size={20} />
              </div>
              <div className="eco-info">
                <strong>Product Discovery</strong>
                <span>Categorized drone catalogs with visual specs and high-contrast action cards.</span>
              </div>
            </div>

            <div className="eco-card">
              <div className="eco-icon text-blue-500">
                <Store size={20} />
              </div>
              <div className="eco-info">
                <strong>Dual Retail Paths</strong>
                <span>Dedicated online app purchasing flows and physical flagship store locator.</span>
              </div>
            </div>

            <div className="eco-card">
              <div className="eco-icon text-amber-500">
                <MessageSquare size={20} />
              </div>
              <div className="eco-info">
                <strong>Community Forum</strong>
                <span>Categorized discussion boards, trending topics, and pilot recommendations.</span>
              </div>
            </div>

            <div className="eco-card">
              <div className="eco-icon text-emerald-500">
                <Mail size={20} />
              </div>
              <div className="eco-info">
                <strong>Customer Support</strong>
                <span>Direct inquiry submission, Terms of Service validation, and interactive map embed.</span>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          02 — DESIGN PROCESS
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="process"
        tag="02 — DESIGN PROCESS"
        title="Structured 5-Stage Design & Development Methodology"
        lead="A structured progression ensuring design fidelity and seamless frontend translation."
        alt
      >
        <div className="jci-process-timeline reveal">
          {[
            {
              step: '01',
              title: 'DISCOVER',
              desc: 'Analyzed the aerial technology brand identity, user personas (filmmakers, beginners, enterprise pilots), and core user journey goals.',
              icon: Compass,
              tag: 'Research & Strategy',
            },
            {
              step: '02',
              title: 'DESIGN',
              desc: 'Created responsive layout grids, high-contrast visual hierarchy, dark-accented hero headers, product cards, and forms in Figma.',
              icon: FigmaIcon,
              tag: 'Figma Design',
            },
            {
              step: '03',
              title: 'PROTOTYPE',
              desc: 'Connected screens into an interactive prototype to validate navigation flows, tab switching, and mobile app presentation.',
              icon: Smartphone,
              tag: 'Interactive Flow',
            },
            {
              step: '04',
              title: 'DEVELOP',
              desc: 'Implemented semantic HTML5 structures, centralized CSS3 variables, Grid/Flexbox layouts, and vanilla JavaScript handlers.',
              icon: Code2,
              tag: 'Frontend Code',
            },
            {
              step: '05',
              title: 'REFINE',
              desc: 'Tested cross-browser responsiveness, spacing balance, image scaling, form input states, and touch-friendly mobile navigation.',
              icon: CheckCircle2,
              tag: 'QA & Polish',
            },
          ].map((item) => {
            const IconComponent = item.icon
            return (
              <div key={item.step} className="process-card">
                <div className="pcard-header">
                  <span className="pcard-step">{item.step}</span>
                  <span className="pcard-tag">{item.tag}</span>
                </div>
                <div className="pcard-icon-wrap">
                  <IconComponent size={20} className="text-red-500" />
                </div>
                <h4 className="pcard-title">{item.title}</h4>
                <p className="pcard-desc">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          03 — UI/UX DESIGN (SCREEN GALLERY)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="screens"
        tag="03 — UI/UX DESIGN"
        title="Comprehensive Multi-Page Interface Showcase"
        lead="High-resolution visual execution across all core destinations in the JCI digital ecosystem."
      >
        <div className="jci-gallery-grid reveal">
          {JCI_SCREENS.map((screen) => (
            <div key={screen.id} className="gallery-item-card">
              <div className="gallery-img-frame" onClick={() => setActiveLightbox(screen)}>
                <Image
                  src={screen.src}
                  alt={screen.title}
                  width={600}
                  height={380}
                  className="gallery-thumb-img"
                />
                <div className="gallery-hover-overlay">
                  <Maximize2 size={20} />
                  <span>Expand Screen</span>
                </div>
              </div>

              <div className="gallery-caption-block">
                <div className="caption-top">
                  <span className="caption-category">{screen.category}</span>
                  <h4 className="caption-title">{screen.title}</h4>
                </div>
                <p className="caption-p">{screen.caption}</p>
                <div className="caption-highlights">
                  {screen.highlights.map((h, i) => (
                    <span key={i} className="highlight-pill">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          04 — INFORMATION ARCHITECTURE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="architecture"
        tag="04 — INFORMATION ARCHITECTURE"
        title="Multi-Page Website Structure & Navigation Flow"
        lead="A logical hierarchy connecting high-impact brand storytelling with clear transactional and community pathways."
        alt
      >
        <div className="jci-ia-container reveal">
          <div className="ia-tree-card">
            <div className="ia-root-node">
              <div className="root-pill">
                <Layout size={16} />
                <span>HOME (Brand Portal & Hero Carousel)</span>
              </div>
            </div>

            <div className="ia-branches-grid">
              <div
                className={`ia-branch-card ${activeIaTab === 'product' ? 'active' : ''}`}
                onClick={() => setActiveIaTab('product')}
              >
                <div className="branch-header">
                  <Compass size={16} className="text-red-500" />
                  <strong>/product</strong>
                </div>
                <h4>Product Catalog</h4>
                <ul className="branch-sublist">
                  <li>Cinematography Drones</li>
                  <li>Beginner Drones</li>
                  <li>Search & Rescue Drones</li>
                  <li>Specification Cards</li>
                </ul>
              </div>

              <div
                className={`ia-branch-card ${activeIaTab === 'store' ? 'active' : ''}`}
                onClick={() => setActiveIaTab('store')}
              >
                <div className="branch-header">
                  <Store size={16} className="text-blue-500" />
                  <strong>/store</strong>
                </div>
                <h4>Store Experience</h4>
                <ul className="branch-sublist">
                  <li>Online Store & Mobile App</li>
                  <li>Marketplace Hubs</li>
                  <li>Offline Flagship Directory</li>
                  <li>Global Retail Map</li>
                </ul>
              </div>

              <div
                className={`ia-branch-card ${activeIaTab === 'forum' ? 'active' : ''}`}
                onClick={() => setActiveIaTab('forum')}
              >
                <div className="branch-header">
                  <MessageSquare size={16} className="text-amber-500" />
                  <strong>/forum</strong>
                </div>
                <h4>Community Forum</h4>
                <ul className="branch-sublist">
                  <li>Category Discussions</li>
                  <li>Hot & Popular Topics</li>
                  <li>Search & Tagging</li>
                  <li>Create Post Action</li>
                </ul>
              </div>

              <div
                className={`ia-branch-card ${activeIaTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveIaTab('contact')}
              >
                <div className="branch-header">
                  <Mail size={16} className="text-emerald-500" />
                  <strong>/contact</strong>
                </div>
                <h4>Contact & Support</h4>
                <ul className="branch-sublist">
                  <li>Inquiry Submission Form</li>
                  <li>TOS Acknowledgement</li>
                  <li>Google Maps Embed</li>
                  <li>Direct Communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          05 — KEY EXPERIENCES (EDITORIAL CASE-STUDY BLOCKS)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="experiences"
        tag="05 — KEY EXPERIENCES"
        title="Deep Dive into Core User Touchpoints"
        lead="Detailed examination of the four foundational feature destinations across the JCI digital platform."
      >
        <div className="jci-blocks-container reveal">
          {/* BLOCK 01 — PRODUCT DISCOVERY */}
          <div className="editorial-block-row">
            <div className="block-visual-col" onClick={() => setActiveLightbox(JCI_SCREENS[0])}>
              <div className="block-img-frame">
                <Image
                  src="/projects/jci/jci_product.png"
                  alt="Product Catalog"
                  width={650}
                  height={400}
                  className="block-screen-img"
                />
                <span className="block-badge">BLOCK 01</span>
              </div>
            </div>

            <div className="block-copy-col">
              <span className="block-tag text-red-500">PRODUCT DISCOVERY</span>
              <h3>Structured Drone Catalog & Specifications</h3>
              <p className="block-lead">
                The Product experience organizes JCI’s drone lineup into clear categories, allowing users to
                explore different drone types and compare products through consistent product cards.
              </p>
              <div className="block-features-list">
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Category Navigation:</strong> Instant filtering between Cinematography, Beginner, and Search & Rescue models.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Structured Cards:</strong> High-definition drone silhouettes with 6K resolution badges, flight times, and AI stabilization notes.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Action Triggers:</strong> High-contrast &quot;Buy Now&quot; primary buttons paired with secondary &quot;Learn More&quot; details.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 02 — STORE EXPERIENCE */}
          <div className="editorial-block-row reverse">
            <div className="block-visual-col" onClick={() => setActiveLightbox(JCI_SCREENS[1])}>
              <div className="block-img-frame">
                <Image
                  src="/projects/jci/jci_online_store.png"
                  alt="Store Experience"
                  width={650}
                  height={400}
                  className="block-screen-img"
                />
                <span className="block-badge">BLOCK 02</span>
              </div>
            </div>

            <div className="block-copy-col">
              <span className="block-tag text-blue-500">STORE EXPERIENCE</span>
              <h3>Dual Retail & Official Mobile Ecosystem</h3>
              <p className="block-lead">
                The Store experience connects customers with both online and offline purchasing channels,
                blending app convenience with retail accessibility.
              </p>
              <div className="block-features-list">
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Online / Offline Switching:</strong> Interactive tab toggles separating digital app access from physical store locators.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Mobile App Showcase:</strong> Promotes official mobile drone control, telemetry pairing, and Google Play / App Store badges.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Marketplace Hubs:</strong> Direct verified vendor portals for Shopee, Tokopedia, and Blibli with secure warranty assurances.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 03 — COMMUNITY FORUM */}
          <div className="editorial-block-row">
            <div className="block-visual-col" onClick={() => setActiveLightbox(JCI_SCREENS[3])}>
              <div className="block-img-frame">
                <Image
                  src="/projects/jci/jci_home.png"
                  alt="Community & Home"
                  width={650}
                  height={400}
                  className="block-screen-img"
                />
                <span className="block-badge">BLOCK 03</span>
              </div>
            </div>

            <div className="block-copy-col">
              <span className="block-tag text-amber-500">COMMUNITY ENGAGEMENT</span>
              <h3>Pilot Discussions, Tutorials & Announcements</h3>
              <p className="block-lead">
                The Forum page introduces a community-driven experience where users can discover discussions,
                tutorials, announcements, and popular topics.
              </p>
              <div className="block-features-list">
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Discussion Cards:</strong> User avatar badges, reply counters, timestamp indexing, and category tags.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Hot Topics & Search:</strong> Rapid topic discovery with tag clouds, keyword search, and pinned developer notes.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Create Post CTA:</strong> Prominent call-to-action encouraging pilots to ask technical questions and share flight footage.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BLOCK 04 — CUSTOMER SUPPORT */}
          <div className="editorial-block-row reverse">
            <div className="block-visual-col" onClick={() => setActiveLightbox(JCI_SCREENS[4])}>
              <div className="block-img-frame">
                <Image
                  src="/projects/jci/jci_contact.png"
                  alt="Contact Us"
                  width={650}
                  height={400}
                  className="block-screen-img"
                />
                <span className="block-badge">BLOCK 04</span>
              </div>
            </div>

            <div className="block-copy-col">
              <span className="block-tag text-emerald-500">CUSTOMER SUPPORT</span>
              <h3>Accessible Inquiry Channels & Campus Map</h3>
              <p className="block-lead">
                The Contact experience provides a direct support channel through a structured contact form and
                location information.
              </p>
              <div className="block-features-list">
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Structured Form:</strong> Validated fields for Full Name, Email, Phone, Message, and Terms of Service acknowledgement.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Location Mapping:</strong> Interactive Google Maps embed spotlighting Binus University Anggrek campus.
                  </div>
                </div>
                <div className="bfeature-item">
                  <span className="bfeature-bullet" />
                  <div>
                    <strong>Multi-Channel Reach:</strong> Direct email support, WhatsApp message hotline, and operational hours.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          06 — UX DECISIONS
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="ux-decisions"
        tag="06 — UX DECISIONS"
        title="Design Rationale & Usability Strategies"
        lead="Intentional design principles engineered to reduce cognitive friction and heighten product desirability."
        alt
      >
        <div className="jci-ux-grid reveal">
          <div className="ux-decision-card">
            <span className="ux-dec-num">01</span>
            <h4>Clear Global Navigation</h4>
            <p>
              The persistent sticky navbar consistently exposes all 5 core sections (Home, Product, Forum, Store, Contact Us),
              ensuring pilots never lose their position within the multi-page journey.
            </p>
          </div>

          <div className="ux-decision-card">
            <span className="ux-dec-num">02</span>
            <h4>Visual-First Product Discovery</h4>
            <p>
              Drone photography and product cards prioritize high-resolution transparency cutouts and bold specs over dense text,
              enabling quick visual comparison across price points.
            </p>
          </div>

          <div className="ux-decision-card">
            <span className="ux-dec-num">03</span>
            <h4>Separated Purchase Paths</h4>
            <p>
              By dividing the Store into distinct Online (App/Marketplaces) and Offline (Retail Locator) tabs, the UI prevents
              confusion between instant digital ordering and physical test-flight visits.
            </p>
          </div>

          <div className="ux-decision-card">
            <span className="ux-dec-num">04</span>
            <h4>Community + Support Separation</h4>
            <p>
              Decoupling peer-to-peer discussions (Forum) from formal customer inquiries (Contact) maintains a clean,
              searchable knowledge hub while offering private assistance channels.
            </p>
          </div>

          <div className="ux-decision-card">
            <span className="ux-dec-num">05</span>
            <h4>Consistent Black, White & Red Identity</h4>
            <p>
              A unified dark/light contrast palette anchored with crimson red accents reinforces the premium engineering
              ethos of the JCI brand across every page.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          07 — DESIGN SYSTEM
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="design-system"
        tag="07 — DESIGN SYSTEM"
        title="Design Tokens & Component Architecture"
        lead="The exact design system rules and CSS variables established in the project codebase."
      >
        <div className="jci-ds-container reveal">
          {/* Color Palette Grid */}
          <div className="ds-card">
            <span className="ds-eyebrow">COLOR PALETTE (CSS VARIABLES)</span>
            <div className="swatches-grid">
              <div className="swatch-item">
                <div className="swatch-color" style={{ backgroundColor: '#0f172a' }} />
                <strong>--dark-bg</strong>
                <span>#0f172a (Slate Dark)</span>
              </div>
              <div className="swatch-item">
                <div className="swatch-color" style={{ backgroundColor: '#1e3a8a' }} />
                <strong>--primary-color</strong>
                <span>#1e3a8a (Deep Blue)</span>
              </div>
              <div className="swatch-item">
                <div className="swatch-color" style={{ backgroundColor: '#2563eb' }} />
                <strong>--secondary-color</strong>
                <span>#2563eb (Royal Blue)</span>
              </div>
              <div className="swatch-item">
                <div className="swatch-color" style={{ backgroundColor: '#dc2626' }} />
                <strong>--accent-color</strong>
                <span>#dc2626 (Crimson Red)</span>
              </div>
              <div className="swatch-item">
                <div className="swatch-color" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} />
                <strong>--light-bg</strong>
                <span>#f8fafc (Clean Light)</span>
              </div>
              <div className="swatch-item">
                <div className="swatch-color" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }} />
                <strong>--white</strong>
                <span>#ffffff (Pure White)</span>
              </div>
            </div>
          </div>

          {/* Typography & Layout Tokens */}
          <div className="ds-card">
            <span className="ds-eyebrow">TYPOGRAPHY & LAYOUT TOKENS</span>
            <div className="type-tokens-grid">
              <div className="type-box">
                <span className="type-label">PRIMARY TYPEFACE</span>
                <strong className="type-font-name">Poppins</strong>
                <p className="type-preview">
                  Geometric, modern, and highly legible across display headings, spec sheets, and body copy.
                </p>
              </div>

              <div className="type-box">
                <span className="type-label">LAYOUT SYSTEM</span>
                <strong className="type-font-name">Grid & Flexbox</strong>
                <p className="type-preview">
                  1400px max-width container, 12-column responsive grid patterns, and sticky header positioning.
                </p>
              </div>
            </div>
          </div>

          {/* Reusable Components Grid */}
          <div className="ds-card full-width">
            <span className="ds-eyebrow">REUSABLE UI COMPONENTS</span>
            <div className="components-pills-grid">
              {[
                { name: 'Sticky Navbar', desc: 'Logo, navigation links, search, profile trigger & mobile toggle' },
                { name: 'Product Cards', desc: 'Model image, title, specs summary, Buy Now and Learn More buttons' },
                { name: 'Store Tabs', desc: 'Online / Offline pill toggle with active state and smooth view transition' },
                { name: 'Hero Carousel', desc: 'Auto-rotating full-bleed slider with dot indicators and next/prev controls' },
                { name: 'Inquiry Form', desc: 'Floating field inputs, validation borders, checkbox acknowledgement' },
                { name: 'Footer Hub', desc: 'Brand narrative, content links, support index, and social channels' },
              ].map((comp, idx) => (
                <div key={idx} className="comp-pill-item">
                  <Boxes size={16} className="text-red-500 flex-shrink-0" />
                  <div>
                    <strong>{comp.name}</strong>
                    <span>{comp.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          08 — FROM FIGMA TO CODE (FRONTEND IMPLEMENTATION)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="code"
        tag="08 — FROM FIGMA TO CODE"
        title="Frontend Architecture & Code Translation"
        lead="The final interface was translated from the Figma design into a static multi-page website using semantic HTML, centralized CSS styling, and lightweight JavaScript interactions."
        alt
      >
        <div className="jci-code-showcase reveal">
          <div className="code-flow-header">
            <div className="cflow-step">
              <FigmaIcon size={18} />
              <span>FIGMA MOCKUPS</span>
            </div>
            <span className="cflow-arrow">→</span>
            <div className="cflow-step">
              <Smartphone size={18} />
              <span>INTERACTIVE PROTOTYPE</span>
            </div>
            <span className="cflow-arrow">→</span>
            <div className="cflow-step">
              <Code2 size={18} />
              <span>HTML5 / CSS3 / JS</span>
            </div>
            <span className="cflow-arrow">→</span>
            <div className="cflow-step active">
              <Monitor size={18} />
              <span>RESPONSIVE SITE</span>
            </div>
          </div>

          <div className="code-cards-grid">
            <div className="code-tech-card">
              <div className="code-card-top">
                <span className="tech-badge">HTML5</span>
                <h4>Semantic Document Structure</h4>
              </div>
              <p>
                Each page (<code>home2.html</code>, <code>product.html</code>, <code>store.html</code>, <code>forum.html</code>, <code>contact.html</code>)
                was authored using clean semantic tags: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;section&gt;</code>,
                <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code>.
              </p>
              <ul className="code-bullets">
                <li>Accessible anchor link hierarchy</li>
                <li>Search & profile modal triggers</li>
                <li>Proper form labels and required input validations</li>
              </ul>
            </div>

            <div className="code-tech-card">
              <div className="code-card-top">
                <span className="tech-badge">CSS3</span>
                <h4>Centralized Styling & Variables</h4>
              </div>
              <p>
                A single unified <code>styles.css</code> stylesheet utilizes CSS Custom Properties (<code>--primary-color</code>, <code>--accent-color</code>)
                and modern CSS Grid / Flexbox for layout consistency.
              </p>
              <ul className="code-bullets">
                <li>Responsive media queries (1024px, 768px, 480px)</li>
                <li>Hover transitions, elevation shadows, and button states</li>
                <li>Seamless overlay headers for full-bleed hero banners</li>
              </ul>
            </div>

            <div className="code-tech-card">
              <div className="code-card-top">
                <span className="tech-badge">JavaScript</span>
                <h4>Lightweight UI Interactions</h4>
              </div>
              <p>
                Modular vanilla JavaScript in <code>script.js</code> drives interactive state transitions without external heavy frameworks.
              </p>
              <ul className="code-bullets">
                <li>Auto-rotating & draggable hero carousel slider with interval timer</li>
                <li>Online vs. Offline store tab switching</li>
                <li>Mobile hamburger menu open/close toggling</li>
              </ul>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          09 — RESPONSIVE EXPERIENCE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="responsive"
        tag="09 — RESPONSIVE EXPERIENCE"
        title="Adaptive Layouts Across Device Viewports"
        lead="The website was engineered to gracefully adapt from wide desktop monitors down to mobile handsets."
      >
        <div className="jci-responsive-grid reveal">
          <div className="resp-card">
            <div className="resp-icon">
              <Monitor size={22} className="text-red-500" />
            </div>
            <h4>Desktop (1024px+)</h4>
            <p>Full 1400px container width, multi-column product grids (4 columns), horizontal global navigation, and split-column contact layouts.</p>
          </div>

          <div className="resp-card">
            <div className="resp-icon">
              <Layout size={22} className="text-blue-500" />
            </div>
            <h4>Tablet (768px – 1023px)</h4>
            <p>2-column adaptive product cards, stacked store promotional banners, flexible form layouts, and condensed map views.</p>
          </div>

          <div className="resp-card">
            <div className="resp-icon">
              <Smartphone size={22} className="text-emerald-500" />
            </div>
            <h4>Mobile (&lt;768px)</h4>
            <p>Hamburger navigation drawer, single-column full-width product and forum cards, touch-friendly tap targets, and streamlined typography.</p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          10 — TECH STACK
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="tech"
        tag="10 — TECH STACK"
        title="Tools & Technologies Used"
        lead="Clean, standard-compliant frontend technologies utilized to design, prototype, and build the project."
        alt
      >
        <div className="jci-tech-cards-grid reveal">
          <div className="tech-item-box">
            <span className="tech-cat">DESIGN & PROTOTYPING</span>
            <h4>Figma</h4>
            <p>Wireframing, UI component design system, color styles, and interactive prototyping.</p>
          </div>

          <div className="tech-item-box">
            <span className="tech-cat">MARKUP</span>
            <h4>HTML5</h4>
            <p>Semantic page structure, form elements, accessible link trees, and metadata.</p>
          </div>

          <div className="tech-item-box">
            <span className="tech-cat">STYLING</span>
            <h4>CSS3</h4>
            <p>CSS variables, Flexbox, CSS Grid, media queries, keyframe transitions, and custom cards.</p>
          </div>

          <div className="tech-item-box">
            <span className="tech-cat">SCRIPTING</span>
            <h4>Vanilla JavaScript</h4>
            <p>DOM manipulation, carousel auto-play, tab toggling, and mobile navigation states.</p>
          </div>

          <div className="tech-item-box">
            <span className="tech-cat">TYPOGRAPHY</span>
            <h4>Google Fonts (Poppins)</h4>
            <p>Clean modern sans-serif typography across headings, spec tables, and buttons.</p>
          </div>

          <div className="tech-item-box">
            <span className="tech-cat">MAP INTEGRATION</span>
            <h4>Google Maps Embed</h4>
            <p>Interactive iframe map integration displaying the Binus University Anggrek location.</p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          11 — MY ROLE (CONTRIBUTION)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="role"
        tag="11 — MY ROLE"
        title="Individual Engineering & Design Contributions"
        lead="Core areas architected, designed, and developed throughout this project."
      >
        <div className="jci-contrib-list reveal">
          {[
            { num: '01', title: 'UI/UX Design', desc: 'Designed the complete website visual identity, interface layouts, and high-contrast typography hierarchy in Figma.' },
            { num: '02', title: 'User Flow Architecture', desc: 'Structured the multi-page navigation and user journey across Product, Forum, Store (Online/Offline), and Contact.' },
            { num: '03', title: 'Interactive Prototype', desc: 'Created the interactive Figma prototype to validate screen transitions, app promotions, and mobile flow logic.' },
            { num: '04', title: 'Frontend Development', desc: 'Implemented the approved multi-page interface using semantic HTML5, centralized CSS3, and vanilla JavaScript.' },
            { num: '05', title: 'Responsive Implementation', desc: 'Engineered responsive CSS Grid and media queries ensuring flawless presentation across mobile, tablet, and desktop.' },
            { num: '06', title: 'UI Consistency', desc: 'Maintained reusable styling patterns, CSS variables, buttons, cards, and navigation components across all 5 pages.' },
          ].map((c) => (
            <div key={c.num} className="contrib-row">
              <span className="contrib-num">{c.num}</span>
              <div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          12 — CHALLENGES & SOLUTIONS
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="challenges"
        tag="12 — CHALLENGES"
        title="Technical & Design Challenges Solved"
        lead="Key friction points encountered during development and the engineering solutions implemented."
        alt
      >
        <div className="jci-challenges-grid reveal">
          <div className="chal-card">
            <span className="chal-badge">CHALLENGE 01</span>
            <h4>Multi-Page Visual Consistency</h4>
            <p>
              <strong>Problem:</strong> Maintaining consistent spacing, header overlays, and colors across 5 standalone HTML files.
            </p>
            <p className="chal-sol">
              <strong>Solution:</strong> Established centralized CSS variables in <code>styles.css</code> and modular class naming conventions for cards, buttons, and navbars.
            </p>
          </div>

          <div className="chal-card">
            <span className="chal-badge">CHALLENGE 02</span>
            <h4>Full-Bleed Hero Banners with Responsive Text</h4>
            <p>
              <strong>Problem:</strong> High-impact hero imagery required transparent navigation overlays without breaking mobile layout stacking.
            </p>
            <p className="chal-sol">
              <strong>Solution:</strong> Applied CSS <code>object-fit: cover</code>, responsive padding clamping, and media-query position resets.
            </p>
          </div>

          <div className="chal-card">
            <span className="chal-badge">CHALLENGE 03</span>
            <h4>Figma to Code Layout Fidelity</h4>
            <p>
              <strong>Problem:</strong> Preserving pixel-accurate Figma component alignment when translated to fluid browser viewports.
            </p>
            <p className="chal-sol">
              <strong>Solution:</strong> Deconstructed designs into reusable CSS Grid templates and auto-fit flex layouts before authoring markup.
            </p>
          </div>

          <div className="chal-card">
            <span className="chal-badge">CHALLENGE 04</span>
            <h4>Content Readability in Dense Specs</h4>
            <p>
              <strong>Problem:</strong> Presenting extensive technical specifications and marketplace links without visual clutter.
            </p>
            <p className="chal-sol">
              <strong>Solution:</strong> Utilized whitespace, subtle border dividers, tabbed switches, and structured card components.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          13 — OUTCOME & IMPACT
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="outcome" tag="13 — OUTCOME" title="Project Summary & Deliverables">
        <div className="jci-outcome-card reveal">
          <div className="outcome-quote-box">
            <Sparkles size={24} className="text-red-500 mb-3" />
            <h3 className="outcome-statement">
              &ldquo;JCI demonstrates a complete design-to-code workflow, combining UI/UX design, interactive
              prototyping, responsive frontend development, and multi-page information architecture.&rdquo;
            </h3>
          </div>

          <div className="outcome-three-grid">
            <div className="outcome-pillar">
              <span className="opillar-tag">DESIGN</span>
              <h4>Cohesive Visual System</h4>
              <p>A unified brand identity, high-contrast dark/light contrast, and responsive layout system in Figma.</p>
            </div>

            <div className="outcome-pillar">
              <span className="opillar-tag">PROTOTYPE</span>
              <h4>Interactive User Flows</h4>
              <p>Fully functional Figma prototype validating screen transitions, app promotions, and inquiry journeys.</p>
            </div>

            <div className="outcome-pillar">
              <span className="opillar-tag">DEVELOPMENT</span>
              <h4>Working Multi-Page Codebase</h4>
              <p>Clean, semantic HTML5, centralized CSS3, and vanilla JavaScript implementation ready for deployment.</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          FIGMA & GITHUB CTAs
      ───────────────────────────────────────────────────────────── */}
      <section className="jci-figma-cta-section reveal">
        <ProjectContainer>
          <div className="jci-figma-cta-card">
            <div className="figma-cta-content">
              <div className="figma-cta-icon">
                <FigmaIcon size={28} className="text-red-500" />
              </div>
              <div>
                <span className="figma-cta-eyebrow">DESIGNED IN FIGMA</span>
                <h3>Explore the Original Design & Prototype</h3>
                <p>Inspect the complete Figma design canvas, wireframes, and interactive prototype flows.</p>
              </div>
            </div>

            <div className="figma-cta-actions">
              <a
                href="https://www.figma.com/design/s3Fghxvf4ySWYQvQfZH7nV/LAB_2702208543?node-id=0-1&t=TTAxipLSmkXdGxXN-1"
                target="_blank"
                rel="noreferrer"
                className="project-github-button"
              >
                <FigmaIcon size={16} /> VIEW FIGMA DESIGN <ExternalLink size={16} />
              </a>

              <a
                href="https://www.figma.com/proto/s3Fghxvf4ySWYQvQfZH7nV/LAB_2702208543?node-id=54-87&p=f&t=msEjp0SxyaS2HFks-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=134%3A1478"
                target="_blank"
                rel="noreferrer"
                className="project-github-button project-github-button-alt"
              >
                <Smartphone size={16} /> VIEW PROTOTYPE <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </ProjectContainer>
      </section>

      <ProjectGithubCTA
        githubUrl="https://github.com/RichelleMarvela/JCI-Drone-Website.git"
        title="Inspect the JCI Drone Website Source Code"
        description="Explore the complete HTML5 markup, centralized CSS3 stylesheet, and JavaScript interaction code on GitHub."
        buttonLabel="VIEW SOURCE CODE ON GITHUB"
      />

      <ProjectNavFooter currentId="jci" previous={previous} next={next} />

      {/* Lightbox Modal */}
      <ImageLightbox screen={activeLightbox} onClose={() => setActiveLightbox(null)} />
    </main>
  )
}
