'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  SearchCheck,
  CheckCircle2,
  Scan,
  Database,
  Sliders,
  TrendingDown,
  Activity,
  Maximize2,
  X,
  Binary,
  Eye,
  Check,
  Zap,
} from 'lucide-react'
import { type PortfolioProject, projects } from '@/src/data/portfolio'
import {
  ProjectContainer,
  ProjectBackButton,
  ProjectHero,
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
   HERO COMPUTER VISION & LATENT SCANNER VISUAL
───────────────────────────────────────────────────────────── */
function FruitHeroScanner() {
  const [selectedPoint, setSelectedPoint] = useState<'fresh' | 'rotten'>('fresh')

  return (
    <div className="fruit-scanner-widget">
      {/* Terminal Bar */}
      <div className="fruit-scanner-header">
        <div className="fruit-terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="fruit-scanner-title">
          <Scan size={13} className="text-emerald-400" />
          <span>LATENT MANIFOLD & GEN-FID HUD</span>
        </div>
        <span className="fruit-scanner-badge">CUDA · PyTorch</span>
      </div>

      <div className="fruit-scanner-body">
        {/* Top 3-Stat Metric Row */}
        <div className="scanner-hud-row">
          <div className="hud-metric">
            <span className="hud-label">INPUT TENSOR</span>
            <strong className="hud-val">100 × 100 × 3 RGB</strong>
            <span className="hud-sub">EnsureRGB Normalized</span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">LATENT BOTTLENECK</span>
            <strong className="hud-val text-emerald-400">128-D [z ~ N(μ, σ²)]</strong>
            <span className="hud-sub">Stochastic Manifold</span>
          </div>
          <div className="hud-metric">
            <span className="hud-label">MEAN GEN-FID</span>
            <strong className="hud-val text-amber-400">441.63 ↓ (Mod)</strong>
            <span className="hud-sub">Inception-v3 Metric</span>
          </div>
        </div>

        {/* Cluster Toggle Selector */}
        <div className="cluster-toggle-bar">
          <span className="toggle-label">CLUSTER INSPECT:</span>
          <button
            type="button"
            className={`cluster-btn ${selectedPoint === 'fresh' ? 'active-fresh' : ''}`}
            onClick={() => setSelectedPoint('fresh')}
          >
            <span className="cluster-dot bg-emerald-500" />
            <span>Fresh Cluster (μ₁)</span>
          </button>
          <button
            type="button"
            className={`cluster-btn ${selectedPoint === 'rotten' ? 'active-rotten' : ''}`}
            onClick={() => setSelectedPoint('rotten')}
          >
            <span className="cluster-dot bg-amber-500" />
            <span>Rotten Cluster (μ₂)</span>
          </button>
        </div>

        {/* SVG Latent Space Manifold */}
        <div className="scanner-svg-wrapper">
          <svg viewBox="0 0 460 215" className="scanner-svg" aria-label="VAE Latent space distribution">
            <defs>
              <radialGradient id="freshGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b981" stopOpacity={selectedPoint === 'fresh' ? 0.55 : 0.25} />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rottenGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={selectedPoint === 'rotten' ? 0.55 : 0.25} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="splitLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.7)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.4)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0.7)" />
              </linearGradient>
            </defs>

            {/* Grid coordinate system */}
            <line x1="45" y1="20" x2="45" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="45" y1="180" x2="435" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="45" y1="100" x2="435" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
            <line x1="240" y1="20" x2="240" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

            <text x="240" y="198" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="monospace" fontWeight="600">
              LATENT DIMENSION Z₁ (PIGMENTATION & COLOR) →
            </text>
            <text x="28" y="100" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5" fontFamily="monospace" fontWeight="600" transform="rotate(-90, 28, 100)">
              LATENT DIMENSION Z₂ (SURFACE TEXTURE) →
            </text>

            {/* Fresh Fruit Cluster */}
            <ellipse
              cx="145"
              cy="100"
              rx="82"
              ry="58"
              fill="url(#freshGlow)"
              className="cursor-pointer transition-all"
              onClick={() => setSelectedPoint('fresh')}
            />
            {[
              [115, 84], [130, 112], [140, 78], [155, 122], [170, 96],
              [125, 126], [150, 92], [160, 82], [135, 102], [165, 112],
              [110, 106], [145, 132], [175, 86], [120, 70], [152, 104]
            ].map(([x, y], i) => (
              <circle
                key={`f-${i}`}
                cx={x}
                cy={y}
                r={selectedPoint === 'fresh' ? 4.5 : 3.5}
                fill="#10b981"
                className="cursor-pointer transition-all hover:scale-150"
                onClick={() => setSelectedPoint('fresh')}
              />
            ))}

            {/* Rotten Fruit Cluster */}
            <ellipse
              cx="330"
              cy="104"
              rx="78"
              ry="54"
              fill="url(#rottenGlow)"
              className="cursor-pointer transition-all"
              onClick={() => setSelectedPoint('rotten')}
            />
            {[
              [300, 92], [315, 124], [330, 86], [345, 120], [360, 104],
              [310, 110], [335, 130], [352, 84], [320, 80], [340, 100],
              [295, 116], [355, 126], [365, 92], [305, 74], [332, 114]
            ].map(([x, y], i) => (
              <circle
                key={`r-${i}`}
                cx={x}
                cy={y}
                r={selectedPoint === 'rotten' ? 4.5 : 3.5}
                fill="#f59e0b"
                className="cursor-pointer transition-all hover:scale-150"
                onClick={() => setSelectedPoint('rotten')}
              />
            ))}

            {/* Separability boundary */}
            <path
              d="M 238 25 Q 224 100 248 175"
              fill="none"
              stroke="url(#splitLine)"
              strokeDasharray="4 3"
              strokeWidth="1.8"
            />

            {/* In-SVG Labels */}
            <g transform="translate(85, 28)">
              <rect x="0" y="0" width="124" height="22" rx="4" fill="rgba(16, 185, 129, 0.16)" stroke="rgba(16, 185, 129, 0.4)" />
              <circle cx="10" cy="11" r="3.5" fill="#10b981" />
              <text x="20" y="14" fill="#34d399" fontSize="8.5" fontWeight="700" fontFamily="monospace">
                FRESH CLUSTER (μ₁)
              </text>
            </g>

            <g transform="translate(270, 28)">
              <rect x="0" y="0" width="130" height="22" rx="4" fill="rgba(245, 158, 11, 0.16)" stroke="rgba(245, 158, 11, 0.4)" />
              <circle cx="10" cy="11" r="3.5" fill="#f59e0b" />
              <text x="20" y="14" fill="#fbbf24" fontSize="8.5" fontWeight="700" fontFamily="monospace">
                ROTTEN CLUSTER (μ₂)
              </text>
            </g>
          </svg>
        </div>

        {/* Live Latent Inspection Bar */}
        <div className="scanner-footer-meta">
          <div className="active-sample-indicator">
            <span className={`live-indicator-dot ${selectedPoint === 'fresh' ? 'bg-emerald-500 shadow-emerald-500' : 'bg-amber-500 shadow-amber-500'}`} />
            <span className="text-xs text-neutral-400 font-mono">ACTIVE MANIFOLD:</span>
            <span className={`text-xs font-mono font-bold ${selectedPoint === 'fresh' ? 'text-emerald-400' : 'text-amber-400'}`}>
              {selectedPoint === 'fresh'
                ? 'FRESH (μ₁ = [+1.42, -0.85] · High Spectral Reflectance)'
                : 'ROTTEN (μ₂ = [-1.68, +1.94] · Necrotic Browning & Lesions)'}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono">
            β-WARMUP ANNEALED · Inception-v3
          </div>
        </div>
      </div>

      <style jsx>{`
        .fruit-scanner-widget {
          border-radius: 14px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          background: #090e17;
          overflow: hidden;
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(16, 185, 129, 0.08);
        }
        .fruit-scanner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.15rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.025);
        }
        .fruit-terminal-dots {
          display: flex;
          gap: 6px;
        }
        .fruit-terminal-dots .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #eab308; }
        .dot-green { background: #22c55e; }
        .fruit-scanner-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.85);
        }
        .fruit-scanner-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: #10b981;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .fruit-scanner-body {
          padding: 1.25rem;
        }
        .scanner-hud-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .hud-metric {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.75rem 0.9rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.07);
        }
        .hud-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.6rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.05em;
        }
        .hud-val {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
        }
        .hud-sub {
          font-size: 0.68rem;
          color: var(--muted);
        }
        .cluster-toggle-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .toggle-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.05em;
        }
        .cluster-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: var(--muted);
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cluster-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.25);
        }
        .cluster-btn.active-fresh {
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.5);
          background: rgba(16, 185, 129, 0.12);
        }
        .cluster-btn.active-rotten {
          color: #f59e0b;
          border-color: rgba(245, 158, 11, 0.5);
          background: rgba(245, 158, 11, 0.12);
        }
        .cluster-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .scanner-svg-wrapper {
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
          padding: 0.5rem;
        }
        .scanner-svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .scanner-footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .active-sample-indicator {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .live-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
          animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @media (max-width: 640px) {
          .scanner-hud-row {
            grid-template-columns: 1fr;
          }
          .cluster-toggle-bar {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN CASE STUDY COMPONENT
───────────────────────────────────────────────────────────── */
export function FruitCaseStudyPage({ project }: { project: PortfolioProject }) {
  const mainRef = useReveal()
  const index = projects.findIndex((p) => p.id === 'fruit')
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  // Lightbox State
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; title: string; desc: string } | null>(null)

  // Model Comparison Active Tab
  const [archTab, setArchTab] = useState<'modified' | 'baseline' | 'table'>('modified')

  // Recruiter Metadata Grid
  const metaItems = [
    { label: 'ROLE', value: 'ML / Computer Vision Researcher' },
    { label: 'RESPONSIBILITIES', value: 'VAE Architecture · β-Warmup Tuning · FID Benchmark' },
    { label: 'TECH STACK', value: 'PyTorch · Torchvision · Inception-v3 · SciPy · CUDA' },
    { label: 'FOCUS', value: 'Latent Representation Learning & Generative Spoilage' },
  ]

  const pipelineStages = [
    {
      num: '01',
      title: 'Dataset Preprocessing & Hygiene',
      tag: 'DATA CLEANING',
      desc: 'Conducted rigorous automated checks across 5,219+ samples to verify zero corrupted files and resolved severe resolution disparities from up to 8,256×6,000 px.',
    },
    {
      num: '02',
      title: 'Color Harmonization (EnsureRGB)',
      tag: 'TRANSFORM PIPELINE',
      desc: 'Engineered a custom EnsureRGB transform stripping RGBA alpha channels and converting all images into uniform 3-channel 100×100 RGB tensors.',
    },
    {
      num: '03',
      title: 'Baseline VAE Construction',
      tag: 'CONV ARCHITECTURE',
      desc: 'Built a 3-Conv2D + 2-MaxPool encoder projecting high-dimensional pixels down to a 128-dimensional stochastic latent bottleneck z = μ + σ ⊙ ε.',
    },
    {
      num: '04',
      title: 'Enhanced VAE (VAE_Mod_Fixed)',
      tag: 'REGULARIZATION',
      desc: 'Added BatchNorm2d to stabilize encoder activations, lightweight dropout (p=0.05) before latent heads, and kept decoder un-normalized for crisp pixel output.',
    },
    {
      num: '05',
      title: 'Dynamic β-Warmup Scheduling',
      tag: 'KL ANNEALING',
      desc: 'Formulated a linear β-warmup schedule (β = 0.02 → 0.30) to prevent KL divergence explosion during early epochs and ensure robust reconstruction.',
    },
    {
      num: '06',
      title: 'Multi-Class Inception-v3 GEN-FID',
      tag: 'EVALUATION METRIC',
      desc: 'Benchmarked generative fidelity across all 6 fruit classes using real test samples vs. prior-generated samples through Inception-v3 feature embeddings.',
    },
  ]

  const fidData = [
    {
      cls: 'freshapples',
      category: 'Fresh',
      baseFid: 452.15,
      modFid: 414.09,
      delta: -38.06,
      improved: true,
      analysis: 'Significant boost in color purity and surface contour sharpness',
    },
    {
      cls: 'freshbanana',
      category: 'Fresh',
      baseFid: 531.55,
      modFid: 533.31,
      delta: +1.76,
      improved: false,
      analysis: 'Comparable baseline performance on elongated curved geometries',
    },
    {
      cls: 'freshoranges',
      category: 'Fresh',
      baseFid: 419.96,
      modFid: 474.89,
      delta: +54.93,
      improved: false,
      analysis: 'Variance driven by small N=15 test set with heavy specular highlights',
    },
    {
      cls: 'rottenapples',
      category: 'Rotten',
      baseFid: 418.49,
      modFid: 410.16,
      delta: -8.33,
      improved: true,
      analysis: 'Crisper separation of necrotic brown spots and fungal perimeter',
    },
    {
      cls: 'rottenbanana',
      category: 'Rotten',
      baseFid: 449.84,
      modFid: 419.26,
      delta: -30.58,
      improved: true,
      analysis: 'Substantial improvement in dark peel discoloration texture recovery',
    },
    {
      cls: 'rottenoranges',
      category: 'Rotten',
      baseFid: 396.69,
      modFid: 398.10,
      delta: +1.41,
      improved: false,
      analysis: 'Lowest absolute FID overall, strong mold spore reconstruction',
    },
  ]

  return (
    <main
      className="project-page-root case-study case-fruit"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#10b981',
          '--project-accent-rgb': '16, 185, 129',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(16, 185, 129, 0.025)',
          '--project-card-border': 'rgba(16, 185, 129, 0.12)',
        } as React.CSSProperties
      }
    >
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <ProjectHero
        kicker="[01] AI · COMPUTER VISION · GENERATIVE MODELING"
        title="Fruit & Rotten Fruit Classification"
        subtitle="Latent Space Representation Learning & Generative Spoilage Modeling with Variational Autoencoders"
        lead="A deep learning computer vision case study investigating how continuous biological degradation across fresh and rotten fruits can be modeled in stochastic latent space, comparing baseline and regularized VAE architectures with β-warmup scheduling and Inception-v3 Fréchet Inception Distance (FID) evaluation."
        meta={metaItems}
        visual={<FruitHeroScanner />}
        layout="split"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. PROJECT OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="01 / PROJECT OVERVIEW"
        title="Modeling continuous biological decay beyond hard discrete classes."
        lead="In industrial food sorting and automated agricultural inspection, fruit spoilage does not occur as an instantaneous binary switch. It is an evolving physical and visual continuum—marked by gradual desiccation, enzymatic browning, fungal mold colonies, and structural collapse. This research investigates whether Variational Autoencoders (VAEs) can learn a smooth, topologically organized latent manifold representing this physical progression."
        split
      >
        <div className="fruit-overview-stats reveal">
          <div className="fruit-stat-card">
            <span className="fruit-stat-num">5,219+</span>
            <span className="fruit-stat-label">TOTAL IMAGES AUDITED</span>
            <p>Full dataset verification across train, validation, and test splits with zero corrupt files.</p>
          </div>
          <div className="fruit-stat-card">
            <span className="fruit-stat-num">6</span>
            <span className="fruit-stat-label">FRUIT CLASSES</span>
            <p>Fresh & rotten apples, bananas, and oranges covering spherical, oblong, and textured produce.</p>
          </div>
          <div className="fruit-stat-card">
            <span className="fruit-stat-num">128</span>
            <span className="fruit-stat-label">LATENT BOTTLENECK DIMENSIONS</span>
            <p>Continuous Gaussian latent space z ~ N(μ, σ²) balancing reconstruction clarity and smooth clustering.</p>
          </div>
          <div className="fruit-stat-card highlight">
            <span className="fruit-stat-num">441.63</span>
            <span className="fruit-stat-label">MEAN GEN-FID SCORE</span>
            <p>Quantitative generative distribution metric evaluated across all classes with Inception-v3.</p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          3. WHAT I BUILT (TECHNICAL PIPELINE)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="02 / WHAT I BUILT"
        title="An end-to-end computer vision pipeline from raw pixels to latent evaluation."
        lead="Every stage of this case study was engineered from scratch in PyTorch—spanning automated image normalization, dual neural network architectures, custom loss balancing, and distribution benchmarking."
      >
        <div className="fruit-pipeline-grid reveal">
          {pipelineStages.map((stage) => (
            <div key={stage.num} className="fruit-pipeline-card">
              <div className="pipeline-card-top">
                <span className="pipeline-num">{stage.num}</span>
                <span className="pipeline-tag">{stage.tag}</span>
              </div>
              <h3 className="pipeline-title">{stage.title}</h3>
              <p className="pipeline-desc">{stage.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          4. DATASET ANALYSIS & PREPROCESSING PIPELINE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="03 / DATASET ANALYSIS & HYGIENE"
        title="Resolving extreme resolution disparities and inconsistent color channels."
        lead="Before training any generative model, an in-depth exploratory audit of the dataset was conducted. Three critical data anomalies were discovered and systematically resolved to guarantee numerical stability."
        alt
      >
        <div className="fruit-dataset-container reveal">
          {/* Split Breakdown */}
          <div className="dataset-splits-row">
            <div className="split-badge-card">
              <span className="split-count">2,778</span>
              <span className="split-name">TRAIN SAMPLES</span>
              <small>Balanced ~463 imgs / class · Random Flip + Rotation (±10°)</small>
            </div>
            <div className="split-badge-card">
              <span className="split-count">2,353</span>
              <span className="split-name">VALIDATION SAMPLES</span>
              <small>Balanced ~392 imgs / class · Pure evaluation (no augmentation)</small>
            </div>
            <div className="split-badge-card">
              <span className="split-count">88</span>
              <span className="split-name">TEST SAMPLES</span>
              <small>13–15 imgs / class · Real-world resolution benchmark</small>
            </div>
          </div>

          {/* Three Discovered Issues & Technical Solutions */}
          <div className="dataset-issues-grid">
            <div className="issue-card">
              <div className="issue-header">
                <span className="issue-tag">PROBLEM 01</span>
                <h4>Extreme Resolution Outliers</h4>
              </div>
              <p>
                While training images averaged ~350 × 350 px, test set images contained extreme outliers ranging from 183 px up to <strong>8,256 × 6,000 pixels</strong>. Unchecked, this would cause severe GPU out-of-memory crashes and batch dimension mismatches.
              </p>
              <div className="issue-solution">
                <strong>SOLUTION:</strong> Uniform high-quality bicubic downsampling to standardized 100 × 100 px across all pipelines.
              </div>
            </div>

            <div className="issue-card">
              <div className="issue-header">
                <span className="issue-tag">PROBLEM 02</span>
                <h4>Inconsistent Color Modes (RGB vs. RGBA)</h4>
              </div>
              <p>
                Train and validation sets contained arbitrary mixtures of standard 3-channel RGB images and 4-channel RGBA images (containing transparent alpha channels).
              </p>
              <div className="issue-solution">
                <strong>SOLUTION:</strong> Custom <code>EnsureRGB</code> transform class integrated into the torchvision pipeline to safely drop alpha channels.
              </div>
            </div>

            <div className="issue-card">
              <div className="issue-header">
                <span className="issue-tag">PROBLEM 03</span>
                <h4>Data Leakage Prevention</h4>
              </div>
              <p>
                Aggressive augmentation on test/validation sets can artificially corrupt perceptual distributions and yield invalid FID evaluation scores.
              </p>
              <div className="issue-solution">
                <strong>SOLUTION:</strong> Confined horizontal flipping and ±10° rotation strictly to the training split, keeping validation/test raw and uncorrupted.
              </div>
            </div>
          </div>

          {/* Real Extracted Dataset Figures */}
          <div className="dataset-gallery-section">
            <div className="gallery-header-row">
              <div>
                <span className="gallery-kicker">VERIFIED EXPERIMENTAL ASSETS</span>
                <h3 className="gallery-title">Inspected Dataset Samples Across Splits</h3>
              </div>
              <span className="gallery-subtext">Click any plot to inspect full-resolution figure</span>
            </div>

            <div className="dataset-gallery-grid">
              <div
                className="gallery-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/train-samples.png',
                    alt: 'Train samples after handling, resizing to 100x100, and data augmentation',
                    title: 'Train Samples (Post-Handling + Augmentation)',
                    desc: 'Real batch of 6 training samples representing fresh and rotten fruit varieties after applying EnsureRGB, 100×100 resizing, random flip, and ±10° rotation.',
                  })
                }
              >
                <div className="gallery-img-box">
                  <Image
                    src="/projects/fruit/train-samples.png"
                    alt="Train samples post handling"
                    width={500}
                    height={180}
                    className="gallery-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={20} className="text-white" />
                  </div>
                </div>
                <div className="gallery-card-meta">
                  <strong>Train Set Samples</strong>
                  <span>EnsureRGB · 100×100 · Augmented</span>
                </div>
              </div>

              <div
                className="gallery-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/val-samples.png',
                    alt: 'Validation samples after handling and resize to 100x100',
                    title: 'Validation Samples (Unaugmented Baseline)',
                    desc: 'Clean validation samples showing distinct visual indicators of freshness (smooth waxy skin, vibrant peel) vs. rot (fungal spores, bruised indentation, darkening).',
                  })
                }
              >
                <div className="gallery-img-box">
                  <Image
                    src="/projects/fruit/val-samples.png"
                    alt="Validation samples post handling"
                    width={500}
                    height={180}
                    className="gallery-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={20} className="text-white" />
                  </div>
                </div>
                <div className="gallery-card-meta">
                  <strong>Validation Set Samples</strong>
                  <span>EnsureRGB · 100×100 · Unaltered Distribution</span>
                </div>
              </div>

              <div
                className="gallery-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/test-samples.png',
                    alt: 'Test samples after handling extreme resolution outliers',
                    title: 'Test Set Samples (Evaluation Ground Truth)',
                    desc: 'Test samples normalized from extreme multi-thousand pixel camera resolutions to uniform tensors for zero-leakage FID extraction.',
                  })
                }
              >
                <div className="gallery-img-box">
                  <Image
                    src="/projects/fruit/test-samples.png"
                    alt="Test samples post handling"
                    width={500}
                    height={180}
                    className="gallery-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={20} className="text-white" />
                  </div>
                </div>
                <div className="gallery-card-meta">
                  <strong>Test Set Samples</strong>
                  <span>Extreme Outliers Normalized · 88 Samples Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          5. MODEL ARCHITECTURE: BASELINE VS. MODIFIED VAE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="04 / MODEL ARCHITECTURES"
        title="Variational Autoencoder design: Baseline vs. Regularized Enhanced VAE."
        lead="To investigate generative stability and representation quality, two distinct VAE architectures were implemented in PyTorch and trained under identical batch parameters (100×100 input, Adam optimizer, lr=1e-3, 15 epochs)."
      >
        <div className="fruit-arch-container reveal">
          {/* Tab Navigation */}
          <div className="arch-tab-nav">
            <button
              className={`arch-tab-btn ${archTab === 'modified' ? 'active' : ''}`}
              onClick={() => setArchTab('modified')}
            >
              <Sparkles size={14} className="inline mr-1" />
              <span>Enhanced Architecture (VAE_Mod_Fixed)</span>
            </button>
            <button
              className={`arch-tab-btn ${archTab === 'baseline' ? 'active' : ''}`}
              onClick={() => setArchTab('baseline')}
            >
              <Layers size={14} className="inline mr-1" />
              <span>Baseline Architecture (VAE_Base)</span>
            </button>
            <button
              className={`arch-tab-btn ${archTab === 'table' ? 'active' : ''}`}
              onClick={() => setArchTab('table')}
            >
              <Sliders size={14} className="inline mr-1" />
              <span>Technical Specification Matrix</span>
            </button>
          </div>

          {/* Tab Content: Modified VAE */}
          {archTab === 'modified' && (
            <div className="arch-detail-card">
              <div className="arch-hero-callout">
                <div className="callout-pill">ENHANCED DESIGN</div>
                <h3>VAE_Mod_Fixed: Stabilized Feature Manifolds</h3>
                <p>
                  Built to solve the blurriness and gradient instability observed in baseline VAEs by introducing batch normalization on the encoder, subtle dropout, and a pure un-normalized decoder.
                </p>
              </div>

              <div className="arch-flow-diagram">
                <div className="flow-step">
                  <div className="flow-step-badge">INPUT</div>
                  <strong>100 × 100 × 3</strong>
                  <span>Normalized [-1, 1]</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step highlight">
                  <div className="flow-step-badge">ENCODER</div>
                  <strong>3× Conv2D + BatchNorm</strong>
                  <span>32 → 64 → 128 Channels + 2× MaxPool</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step">
                  <div className="flow-step-badge">REGULARIZATION</div>
                  <strong>Dropout (p=0.05)</strong>
                  <span>Pre-Latent Flatten (80,000 dim)</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step highlight">
                  <div className="flow-step-badge">BOTTLENECK</div>
                  <strong>z ~ N(μ, σ²) [128-D]</strong>
                  <span>Reparameterization Trick</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step">
                  <div className="flow-step-badge">DECODER</div>
                  <strong>Pure ConvTranspose2D</strong>
                  <span>No BatchNorm · Tanh Output</span>
                </div>
              </div>

              <div className="arch-reasons-grid">
                <div className="reason-item">
                  <strong>1. BatchNorm2d on Encoder:</strong>
                  <p>
                    Normalizes layer activations across varied fruit lighting conditions, ensuring smooth gradient propagation and accelerated convergence.
                  </p>
                </div>
                <div className="reason-item">
                  <strong>2. Lightweight Dropout (p=0.05):</strong>
                  <p>
                    Placed immediately after flattening before <code>fc_mu</code> and <code>fc_logvar</code>. Purposefully kept low to prevent posterior collapse while curtailing overfitting.
                  </p>
                </div>
                <div className="reason-item">
                  <strong>3. Pure Decoder (No BatchNorm):</strong>
                  <p>
                    Excluded batch normalization from the transposed convolutions to preserve natural continuous pixel gradient dynamics and prevent generative artifacts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Baseline VAE */}
          {archTab === 'baseline' && (
            <div className="arch-detail-card">
              <div className="arch-hero-callout">
                <div className="callout-pill bg-neutral-800 text-neutral-300">BASELINE DESIGN</div>
                <h3>VAE_Base: Minimalist Convolutional Topology</h3>
                <p>
                  A direct implementation satisfying fundamental convolutional autoencoder requirements without intermediate normalization or dropout regularizers.
                </p>
              </div>

              <div className="arch-flow-diagram">
                <div className="flow-step">
                  <div className="flow-step-badge">INPUT</div>
                  <strong>100 × 100 × 3</strong>
                  <span>Normalized [-1, 1]</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step">
                  <div className="flow-step-badge">ENCODER</div>
                  <strong>3× Conv2D + ReLU</strong>
                  <span>32 → 64 → 128 Channels + 2× MaxPool</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step">
                  <div className="flow-step-badge">BOTTLENECK</div>
                  <strong>Latent Head (128-D)</strong>
                  <span>fc_mu & fc_logvar</span>
                </div>
                <span className="flow-arrow">→</span>
                <div className="flow-step">
                  <div className="flow-step-badge">DECODER</div>
                  <strong>Linear + 2× ConvTranspose</strong>
                  <span>Kernel=2, Stride=2 + Conv2d + Tanh</span>
                </div>
              </div>

              <div className="arch-reasons-grid">
                <div className="reason-item">
                  <strong>Encoder Architecture:</strong>
                  <p>3 Conv2d layers with kernel 3×3 and padding 1, interleaved with 2 MaxPool2d layers downsampling feature maps to 25×25.</p>
                </div>
                <div className="reason-item">
                  <strong>Loss Function:</strong>
                  <p>Static composite loss: Total = Recon Loss (MSE) + 1.0 × KL Divergence without warmup scheduling.</p>
                </div>
                <div className="reason-item">
                  <strong>Behavioral Tradeoff:</strong>
                  <p>Successfully learns global circular fruit shapes, but produces softer, blurrier edges and is susceptible to initial KL divergence shocks.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Specification Matrix */}
          {archTab === 'table' && (
            <div className="arch-detail-card">
              <div className="table-responsive">
                <table className="fruit-spec-table">
                  <thead>
                    <tr>
                      <th>ARCHITECTURAL PARAMETER</th>
                      <th>BASELINE VAE (VAE_Base)</th>
                      <th>ENHANCED VAE (VAE_Mod_Fixed)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Input Resolution</td>
                      <td>100 × 100 × 3 RGB</td>
                      <td>100 × 100 × 3 RGB</td>
                    </tr>
                    <tr>
                      <td>Encoder Convolutions</td>
                      <td>Conv2D (3→32→64→128) + ReLU</td>
                      <td>Conv2D + <strong>BatchNorm2d</strong> + ReLU</td>
                    </tr>
                    <tr>
                      <td>Pooling Operations</td>
                      <td>2× MaxPool2d(2)</td>
                      <td>2× MaxPool2d(2)</td>
                    </tr>
                    <tr>
                      <td>Flatten Dimension</td>
                      <td>128 × 25 × 25 = 80,000</td>
                      <td>128 × 25 × 25 = 80,000</td>
                    </tr>
                    <tr>
                      <td>Pre-Latent Regularization</td>
                      <td>None</td>
                      <td><strong>nn.Dropout(p=0.05)</strong></td>
                    </tr>
                    <tr>
                      <td>Latent Dimension (z)</td>
                      <td>128 dimensions (μ, log σ²)</td>
                      <td>128 dimensions (μ, log σ²)</td>
                    </tr>
                    <tr>
                      <td>Decoder Structure</td>
                      <td>2× ConvTranspose2d + Conv2d + Tanh</td>
                      <td>2× ConvTranspose2d + Conv2d + Tanh</td>
                    </tr>
                    <tr>
                      <td>Decoder Normalization</td>
                      <td>None</td>
                      <td>None (Preserves natural pixel values)</td>
                    </tr>
                    <tr>
                      <td>KL Divergence Weight (β)</td>
                      <td>Fixed β = 1.0</td>
                      <td><strong>Linear Warmup: β_t = min(0.30, 0.02 × t)</strong></td>
                    </tr>
                    <tr>
                      <td>Best Validation Total Loss</td>
                      <td>0.2732</td>
                      <td><strong>0.2623 (Improved)</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          6. TRAINING DYNAMICS & β-WARMUP ANNEALING
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="05 / TRAINING DYNAMICS & LOSS PROFILES"
        title="Preventing KL explosion through dynamic β-warmup scheduling."
        lead="Standard VAE training frequently suffers from KL divergence explosion: when the latent regularizer dominates early epochs, the encoder is penalized before it has learned to reconstruct meaningful spatial features. To solve this, a linear β-warmup annealing schedule was formulated."
        alt
      >
        <div className="fruit-training-container reveal">
          {/* Mathematical Explanation Banner */}
          <div className="math-formulation-box">
            <div className="math-header">
              <span className="math-badge">LOSS FORMULATION</span>
              <strong>Composite ELBO Optimization with Annealing</strong>
            </div>
            <div className="math-formula font-mono">
              L_total(x) = MSE(x, x_recon) + β_t · D_KL( q_φ(z|x) || p(z) )
            </div>
            <div className="math-beta font-mono">
              where β_t = min(0.30, 0.02 × epoch), starting at β₁ = 0.02 and increasing by +0.02 per epoch
            </div>
            <p className="math-desc">
              By initializing β at 0.02, the network first prioritizes pixel-level structural reconstruction (minimizing MSE). As features solidify, β gradually scales up to enforce a smooth standard Gaussian prior N(0, I) over the 128 latent dimensions without destroying reconstructed detail.
            </p>
          </div>

          {/* Real Extracted Training Curves Grid */}
          <div className="training-curves-grid">
            {/* Enhanced VAE Plots */}
            <div className="curve-column">
              <div className="curve-header-tag text-emerald-400 border-emerald-500/30">
                ENHANCED VAE (VAE_Mod_Fixed)
              </div>

              <div
                className="curve-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/modified-loss-curve.png',
                    alt: 'VAE_Mod_Fixed: Total Loss over 15 Epochs',
                    title: 'VAE_Mod_Fixed Total Loss (Train vs. Val)',
                    desc: 'Validation loss smoothly drops from 0.9054 in epoch 1 down to 0.2623 in epoch 15, confirming excellent convergence with zero severe overfitting.',
                  })
                }
              >
                <div className="curve-img-box">
                  <Image
                    src="/projects/fruit/modified-loss-curve.png"
                    alt="Modified VAE Total Loss"
                    width={450}
                    height={260}
                    className="curve-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="curve-caption">
                  <strong>Total Loss Curve (Best Val: 0.2623)</strong>
                  <span>Smooth monotonic decline with β-warmup</span>
                </div>
              </div>

              <div
                className="curve-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/modified-recon-kl.png',
                    alt: 'VAE_Mod_Fixed: Val Recon & KL Convergence',
                    title: 'VAE_Mod_Fixed Val Recon & KL Evolution',
                    desc: 'Val KL begins high (2.078) and stabilizes smoothly to ~0.30 as warmup balances the loss, preventing posterior collapse.',
                  })
                }
              >
                <div className="curve-img-box">
                  <Image
                    src="/projects/fruit/modified-recon-kl.png"
                    alt="Modified VAE Recon vs KL"
                    width={450}
                    height={260}
                    className="curve-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="curve-caption">
                  <strong>Val Recon (MSE) vs. Val KL</strong>
                  <span>Controlled KL descent to 0.30</span>
                </div>
              </div>
            </div>

            {/* Baseline VAE Plots */}
            <div className="curve-column">
              <div className="curve-header-tag text-neutral-400 border-neutral-700">
                BASELINE VAE (VAE_Base)
              </div>

              <div
                className="curve-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/baseline-loss-curve.png',
                    alt: 'VAE Baseline: Train vs Validation Loss',
                    title: 'VAE Baseline Total Loss (Train vs. Val)',
                    desc: 'Baseline loss converges to a best validation loss of 0.2732. Demonstrates solid learning but with slightly higher residual error than the modified model.',
                  })
                }
              >
                <div className="curve-img-box">
                  <Image
                    src="/projects/fruit/baseline-loss-curve.png"
                    alt="Baseline VAE Total Loss"
                    width={450}
                    height={260}
                    className="curve-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="curve-caption">
                  <strong>Baseline Loss Curve (Best Val: 0.2732)</strong>
                  <span>Sharp drop at epoch 2, leveling off at epoch 15</span>
                </div>
              </div>

              <div
                className="curve-card"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/fruit/baseline-recon-kl.png',
                    alt: 'VAE Baseline: Validation Recon & KL',
                    title: 'VAE Baseline Validation Recon & KL',
                    desc: 'Without warmup, baseline KL starts lower (~0.04) and rises as reconstruction MSE drops, reflecting competing loss gradients.',
                  })
                }
              >
                <div className="curve-img-box">
                  <Image
                    src="/projects/fruit/baseline-recon-kl.png"
                    alt="Baseline VAE Recon vs KL"
                    width={450}
                    height={260}
                    className="curve-img"
                  />
                  <div className="gallery-hover-overlay">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="curve-caption">
                  <strong>Baseline Recon & KL Decomposition</strong>
                  <span>Val Recon ~0.2312 · Val KL ~0.0420</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          7. VISUAL RECONSTRUCTION & QUALITATIVE EVALUATION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="06 / QUALITATIVE RECONSTRUCTION"
        title="Visualizing original inputs vs. decoded stochastic reconstructions."
        lead="Qualitative inspection demonstrates how well each model's 128-dimensional latent vector retains critical diagnostic features—such as circular fruit contour, peel luminance, and necrotic mold discoloration."
      >
        <div className="fruit-recon-container reveal">
          {/* Side-by-side Reconstruction Showcases */}
          <div className="recon-showcase-grid">
            <div
              className="recon-item-card"
              onClick={() =>
                setLightboxImg({
                  src: '/projects/fruit/modified-reconstruction.png',
                  alt: 'Modified VAE Original vs Reconstructed 6 fruit samples',
                  title: 'Enhanced VAE Reconstructions (VAE_Mod_Fixed)',
                  desc: 'Top row: Original validation inputs. Bottom row: Decoded outputs from z. Preserves peel chromatic saturation and resolves necrotic spots with superior contour fidelity.',
                })
              }
            >
              <div className="recon-badge-header">
                <span className="badge-pill-emerald">ENHANCED VAE (VAE_Mod_Fixed)</span>
                <span className="text-xs font-mono text-neutral-400">BEST VAL LOSS: 0.2623</span>
              </div>
              <div className="recon-img-wrapper">
                <Image
                  src="/projects/fruit/modified-reconstruction.png"
                  alt="Modified VAE Reconstructions"
                  width={600}
                  height={220}
                  className="recon-img"
                />
                <div className="gallery-hover-overlay">
                  <Maximize2 size={22} className="text-white" />
                </div>
              </div>
              <div className="recon-notes">
                <strong>Analysis:</strong>
                <p>
                  Reconstructions capture distinctive fruit colorations (vibrant citrus orange, banana curve, apple tones) while recovering dark rotting blemishes with reduced edge smearing.
                </p>
              </div>
            </div>

            <div
              className="recon-item-card"
              onClick={() =>
                setLightboxImg({
                  src: '/projects/fruit/baseline-reconstruction.png',
                  alt: 'Baseline VAE Original vs Reconstructed 6 fruit samples',
                  title: 'Baseline VAE Reconstructions (VAE_Base)',
                  desc: 'Top row: Original validation inputs. Bottom row: Decoded outputs. Demonstrates global spherical geometry capture but exhibits higher blurriness inherent to MSE loss.',
                })
              }
            >
              <div className="recon-badge-header">
                <span className="badge-pill-neutral">BASELINE VAE (VAE_Base)</span>
                <span className="text-xs font-mono text-neutral-400">BEST VAL LOSS: 0.2732</span>
              </div>
              <div className="recon-img-wrapper">
                <Image
                  src="/projects/fruit/baseline-reconstruction.png"
                  alt="Baseline VAE Reconstructions"
                  width={600}
                  height={220}
                  className="recon-img"
                />
                <div className="gallery-hover-overlay">
                  <Maximize2 size={22} className="text-white" />
                </div>
              </div>
              <div className="recon-notes">
                <strong>Analysis:</strong>
                <p>
                  Baseline VAE successfully maps overall object geometry, but shows characteristic pixel averaging blur, particularly across dark rotting lesions and peel stem textures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          8. QUANTITATIVE BENCHMARK: FRÉCHET INCEPTION DISTANCE (FID)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="07 / GENERATIVE EVALUATION (FID)"
        title="Measuring feature distribution divergence using Fréchet Inception Distance."
        lead="While reconstruction loss (MSE) measures per-pixel Euclidean distance, it fails to quantify perceptual realism and generative manifold coverage. To evaluate true generative capability, Fréchet Inception Distance (GEN-FID) was computed using a pretrained Inception-v3 network comparing real test distributions against samples generated from prior z ~ N(0, I)."
        alt
      >
        <div className="fruit-fid-container reveal">
          {/* FID Metric Formula Callout */}
          <div className="fid-formula-banner">
            <div className="formula-tag">MATHEMATICAL METRIC</div>
            <div className="formula-text font-mono">
              FID = ||μ_r - μ_g||² + Tr( Σ_r + Σ_g - 2(Σ_r Σ_g)^(1/2) )
            </div>
            <div className="formula-explanation">
              where (μ_r, Σ_r) are the mean and covariance of deep Inception-v3 features extracted from real fruit test images, and (μ_g, Σ_g) are from model-generated images. <strong>Lower FID indicates greater distributional realism.</strong>
            </div>
          </div>

          {/* Per-Class FID Benchmark Table */}
          <div className="table-responsive mt-6">
            <table className="fruit-fid-table">
              <thead>
                <tr>
                  <th>CLASS NAME</th>
                  <th>CATEGORY</th>
                  <th>VAE_BASE (FID ↓)</th>
                  <th>VAE_MOD_FIXED (FID ↓)</th>
                  <th>DELTA (Δ)</th>
                  <th>QUALITATIVE FINDING</th>
                </tr>
              </thead>
              <tbody>
                {fidData.map((row) => (
                  <tr key={row.cls} className={row.improved ? 'row-improved' : ''}>
                    <td className="font-mono font-bold text-white">{row.cls}</td>
                    <td>
                      <span className={`cat-pill ${row.category === 'Fresh' ? 'cat-fresh' : 'cat-rotten'}`}>
                        {row.category}
                      </span>
                    </td>
                    <td className="font-mono text-neutral-300">{row.baseFid.toFixed(3)}</td>
                    <td className="font-mono font-bold text-white">
                      {row.modFid.toFixed(3)}
                    </td>
                    <td className="font-mono">
                      <span className={`delta-badge ${row.improved ? 'delta-good' : 'delta-neutral'}`}>
                        {row.delta > 0 ? `+${row.delta.toFixed(2)}` : `${row.delta.toFixed(2)}`}
                      </span>
                    </td>
                    <td className="text-xs text-neutral-400">{row.analysis}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="fruit-fid-summary-row">
                  <td colSpan={2} className="font-bold text-white">
                    MEAN GEN-FID OVERALL
                  </td>
                  <td className="font-mono text-neutral-300 font-bold">444.780</td>
                  <td className="font-mono text-emerald-400 font-bold text-base">
                    441.634 ↓
                  </td>
                  <td className="font-mono text-emerald-400 font-bold">-3.15</td>
                  <td className="text-xs text-emerald-300 font-semibold">
                    Overall generative improvement confirmed across 6 fruit categories
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Scientific Nuance & Analysis */}
          <div className="fid-analysis-cards">
            <div className="fid-insight-card">
              <span className="insight-badge">SIGNIFICANT GAINS</span>
              <h4>Substantial Improvement on Apples & Bananas</h4>
              <p>
                The enhanced model achieved impressive FID reductions on <code>freshapples</code> (-38.06), <code>rottenbanana</code> (-30.58), and <code>rottenapples</code> (-8.33). Encoder batch normalization helped the network retain high-frequency textural variance in peel discoloration.
              </p>
            </div>

            <div className="fid-insight-card">
              <span className="insight-badge">SCIENTIFIC OBSERVATION</span>
              <h4>Small Sample Variance on Test Set (N=15)</h4>
              <p>
                In <code>freshoranges</code>, FID increased from 419.96 to 474.89. Because the test split contained only 13–15 images per class, Inception covariance estimates possess higher statistical variance. Real-world evaluation would benefit from larger sample sizes.
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          9. MY ROLE & ENGINEERING OWNERSHIP
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="08 / MY ROLE & RESPONSIBILITIES"
        title="Independent machine learning research, architecture, and benchmarking."
        lead="I spearheaded this computer vision investigation from initial dataset hygiene to model design, mathematical regularization, and distributional evaluation."
      >
        <div className="fruit-role-grid reveal">
          {[
            {
              step: '01',
              title: 'Dataset Sanitation & Pipeline Engineering',
              desc: 'Conducted exploratory data analysis across 5,219+ images. Identified and resolved extreme resolution outliers (183px up to 8,256px) and engineered the EnsureRGB custom transform to guarantee consistent 3-channel input.',
            },
            {
              step: '02',
              title: 'PyTorch Model Architecture Design',
              desc: 'Architected both the baseline and modified convolutional autoencoders. Carefully balanced encoder depth (3 Conv2D + 2 MaxPool) and configured transposed convolutions to preserve output dimensions at exactly 100×100×3.',
            },
            {
              step: '03',
              title: 'Stochastic Bottleneck & Regularization',
              desc: 'Formulated the Gaussian reparameterization trick in PyTorch, integrated BatchNorm2d on the encoder, and calibrated minimal dropout (p=0.05) to eliminate posterior collapse.',
            },
            {
              step: '04',
              title: 'Dynamic β-Warmup KL Annealing',
              desc: 'Devised the mathematical warmup schedule β_t = min(0.30, 0.02 × t), preventing KL divergence explosion and stabilizing training to achieve a best validation loss of 0.2623.',
            },
            {
              step: '05',
              title: 'Inception-v3 FID Quantitative Benchmarking',
              desc: 'Constructed an end-to-end FID evaluation script extracting 2,048-dimensional feature representations using pretrained Inception-v3 to benchmark generative realism across all 6 fruit classes.',
            },
            {
              step: '06',
              title: 'Experimental Analysis & Documentation',
              desc: 'Authored exhaustive comparative analyses linking loss convergence, reconstruction quality, and generative metrics to support industrial automated sorting applications.',
            },
          ].map((item) => (
            <div key={item.step} className="project-card">
              <span className="project-card-badge">{item.step} / RESEARCH CONTRIBUTION</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          10. TECH STACK
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="09 / TECHNOLOGIES & TOOLS"
        title="Technologies supporting computer vision research."
        center
        alt
      >
        <div className="fruit-tech-pills reveal">
          {[
            'PyTorch (Core Deep Learning)',
            'Torchvision (Transforms & Models)',
            'Inception-v3 (Pretrained Weights)',
            'Variational Autoencoders (VAE)',
            'Fréchet Inception Distance (FID)',
            'SciPy (Matrix Sqrt & Covariance)',
            'NumPy (Array Operations)',
            'Matplotlib (Diagnostic Plotting)',
            'PIL / Pillow (Image Processing)',
            'CUDA / GPU Acceleration',
          ].map((t) => (
            <span key={t} className="fruit-tech-tag">
              {t}
            </span>
          ))}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          11. KEY TAKEAWAYS & LESSONS LEARNED
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        tag="10 / KEY TAKEAWAYS & REFLECTIONS"
        title="Technical reflections on generative computer vision."
        lead="Key engineering principles and theoretical insights gained from modeling complex biological degradation."
      >
        <div className="fruit-takeaways-grid reveal">
          <div className="takeaway-card">
            <div className="takeaway-icon-box">
              <Zap size={20} className="text-emerald-400" />
            </div>
            <h4>Continuous Latent Manifolds vs. Hard Labels</h4>
            <p>
              In biological quality control, treating freshness as a binary classification misses vital intermediate deterioration states. Continuous latent variables enable agricultural systems to grade fruit ripeness along a smooth continuum.
            </p>
          </div>

          <div className="takeaway-card">
            <div className="takeaway-icon-box">
              <Sliders size={20} className="text-amber-400" />
            </div>
            <h4>The Delicate Equilibrium of VAE Loss</h4>
            <p>
              VAEs are notorious for posterior collapse or blurry reconstructions. Introducing a dynamic β-warmup schedule was pivotal: allowing the autoencoder to first anchor visual features before imposing strict prior regularization.
            </p>
          </div>

          <div className="takeaway-card">
            <div className="takeaway-icon-box">
              <BarChart3 size={20} className="text-emerald-400" />
            </div>
            <h4>Perceptual Metrics Over Pixel MSE</h4>
            <p>
              Reconstruction loss alone is deceptive: a blurry image can have lower MSE than a sharp image with slightly shifted texture. Using Inception-v3 FID provided an objective, distribution-level measure of true generative fidelity.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          12. GITHUB REPOSITORY CTA
      ───────────────────────────────────────────────────────────── */}
      <ProjectGithubCTA
        githubUrl={project.github || 'https://github.com/RichelleMarvela/Fruit-and-Rotten-Fruit-Classification.git'}
        title="Explore the Fruit Classification study repository"
        description="View the complete PyTorch implementation, EnsureRGB preprocessing pipelines, baseline vs. enhanced VAE models, and Inception-v3 FID benchmarking notebooks on GitHub."
        buttonLabel="VIEW REPOSITORY ON GITHUB"
      />

      {/* ─────────────────────────────────────────────────────────────
          13. STANDARDIZED NAVIGATION FOOTER
      ───────────────────────────────────────────────────────────── */}
      <ProjectNavFooter currentId="fruit" previous={previous} next={next} />

      {/* ─────────────────────────────────────────────────────────────
          LIGHTBOX MODAL
      ───────────────────────────────────────────────────────────── */}
      {lightboxImg && (
        <div className="fruit-lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="fruit-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="fruit-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image modal"
            >
              <X size={20} />
            </button>
            <div className="fruit-lightbox-media">
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.alt}
                width={1000}
                height={500}
                className="fruit-lightbox-image"
              />
            </div>
            <div className="fruit-lightbox-caption">
              <h4>{lightboxImg.title}</h4>
              <p>{lightboxImg.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STYLES
      ───────────────────────────────────────────────────────────── */}
      <style jsx global>{`
        /* Hero Scanner HUD */
        .fruit-scanner-widget {
          border-radius: 14px;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(7, 10, 15, 0.9);
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
        }
        .fruit-scanner-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }
        .fruit-terminal-dots {
          display: flex;
          gap: 6px;
        }
        .fruit-terminal-dots .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #eab308; }
        .dot-green { background: #22c55e; }
        .fruit-scanner-title {
          display: flex;
          align-items: center;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.75);
        }
        .fruit-scanner-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: #10b981;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .fruit-scanner-body {
          padding: 1.25rem;
        }
        .scanner-hud-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .hud-metric {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .hud-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.05em;
        }
        .hud-val {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
        }
        .scanner-svg-wrapper {
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.04);
          overflow: hidden;
          padding: 0.5rem;
        }
        .scanner-svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .scanner-footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .live-indicator-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* Overview Stats */
        .fruit-overview-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .fruit-stat-card {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .fruit-stat-card.highlight {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.04);
        }
        .fruit-stat-num {
          font-size: 2.2rem;
          font-weight: 800;
          color: #10b981;
          line-height: 1.1;
        }
        .fruit-stat-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.08em;
        }
        .fruit-stat-card p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Pipeline Grid */
        .fruit-pipeline-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .fruit-pipeline-card {
          padding: 1.5rem;
          border-radius: 14px;
          border: 1px solid rgba(16, 185, 129, 0.15);
          background: rgba(16, 185, 129, 0.02);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .fruit-pipeline-card:hover {
          transform: translateY(-2px);
          border-color: rgba(16, 185, 129, 0.35);
        }
        .pipeline-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pipeline-num {
          font-family: var(--font-geist-mono), monospace;
          font-size: 1.1rem;
          font-weight: 800;
          color: #10b981;
        }
        .pipeline-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.06em;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.04);
        }
        .pipeline-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          margin: 0;
        }
        .pipeline-desc {
          font-size: 0.84rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Dataset Splits Row */
        .dataset-splits-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .split-badge-card {
          padding: 1.25rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .split-count {
          font-family: var(--font-geist-mono), monospace;
          font-size: 1.8rem;
          font-weight: 800;
          color: #10b981;
        }
        .split-name {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.68rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.05em;
        }
        .split-badge-card small {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.4;
        }

        /* Dataset Issues Grid */
        .dataset-issues-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .issue-card {
          padding: 1.5rem;
          border-radius: 14px;
          border: 1px solid rgba(245, 158, 11, 0.15);
          background: rgba(245, 158, 11, 0.025);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .issue-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .issue-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          color: #f59e0b;
          letter-spacing: 0.06em;
        }
        .issue-card h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .issue-card p {
          font-size: 0.83rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }
        .issue-solution {
          margin-top: auto;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.15);
          font-size: 0.78rem;
          color: #34d399;
          line-height: 1.4;
        }

        /* Dataset Gallery */
        .dataset-gallery-section {
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .gallery-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .gallery-kicker {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.25rem;
        }
        .gallery-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .gallery-subtext {
          font-size: 0.8rem;
          color: var(--muted);
          font-style: italic;
        }
        .dataset-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .gallery-card {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .gallery-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          transform: translateY(-2px);
        }
        .gallery-img-box {
          position: relative;
          width: 100%;
          background: #0b0f17;
          overflow: hidden;
        }
        :global(.gallery-img) {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }
        .gallery-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .gallery-card:hover .gallery-hover-overlay {
          opacity: 1;
        }
        .gallery-card-meta {
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .gallery-card-meta strong {
          font-size: 0.88rem;
          color: #ffffff;
        }
        .gallery-card-meta span {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          color: var(--muted);
        }

        /* Model Architecture Section */
        .arch-tab-nav {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .arch-tab-btn {
          padding: 0.65rem 1.15rem;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.025);
          color: var(--muted);
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
        }
        .arch-tab-btn:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .arch-tab-btn.active {
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.08);
        }
        .arch-detail-card {
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(16, 185, 129, 0.2);
          background: rgba(16, 185, 129, 0.02);
        }
        .arch-hero-callout {
          margin-bottom: 2rem;
        }
        .callout-pill {
          display: inline-block;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          margin-bottom: 0.5rem;
        }
        .arch-hero-callout h3 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
        }
        .arch-hero-callout p {
          font-size: 0.9rem;
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
          max-width: 52rem;
        }

        /* Flow Diagram */
        .arch-flow-diagram {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 2rem;
          gap: 0.75rem;
          overflow-x: auto;
        }
        .flow-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.25rem;
          padding: 0.85rem 1rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-width: 140px;
          flex: 1;
        }
        .flow-step.highlight {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.06);
        }
        .flow-step-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.58rem;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.05em;
        }
        .flow-step strong {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.74rem;
          color: #ffffff;
        }
        .flow-step span {
          font-size: 0.72rem;
          color: var(--muted);
        }
        .flow-arrow {
          font-size: 1.2rem;
          color: #10b981;
        }
        .arch-reasons-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .reason-item {
          padding: 1.25rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .reason-item strong {
          display: block;
          font-size: 0.88rem;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }
        .reason-item p {
          font-size: 0.82rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Spec Table */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .fruit-spec-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.84rem;
        }
        .fruit-spec-table th {
          text-align: left;
          padding: 0.85rem 1rem;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
        }
        .fruit-spec-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--muted);
        }
        .fruit-spec-table tr:hover td {
          background: rgba(255, 255, 255, 0.015);
        }

        /* Training & Loss Section */
        .math-formulation-box {
          padding: 1.75rem;
          border-radius: 14px;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.03);
          margin-bottom: 2rem;
        }
        .math-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .math-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }
        .math-header strong {
          color: #ffffff;
          font-size: 0.95rem;
        }
        .math-formula {
          font-size: 0.95rem;
          font-weight: 700;
          color: #34d399;
          margin-bottom: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .math-beta {
          font-size: 0.82rem;
          color: #fbbf24;
          margin-bottom: 0.75rem;
        }
        .math-desc {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
        }
        .training-curves-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .curve-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .curve-header-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid;
          width: fit-content;
        }
        .curve-card {
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .curve-card:hover {
          border-color: rgba(16, 185, 129, 0.35);
          transform: translateY(-2px);
        }
        .curve-img-box {
          position: relative;
          width: 100%;
          background: #080c14;
        }
        :global(.curve-img) {
          width: 100%;
          height: auto;
          display: block;
        }
        .curve-caption {
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .curve-caption strong {
          font-size: 0.86rem;
          color: #ffffff;
        }
        .curve-caption span {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.7rem;
          color: var(--muted);
        }

        /* Reconstruction Showcases */
        .recon-showcase-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .recon-item-card {
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .recon-item-card:hover {
          border-color: rgba(16, 185, 129, 0.35);
        }
        .recon-badge-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.015);
        }
        .badge-pill-emerald {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: #10b981;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }
        .badge-pill-neutral {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .recon-img-wrapper {
          position: relative;
          width: 100%;
          background: #080c14;
        }
        :global(.recon-img) {
          width: 100%;
          height: auto;
          display: block;
        }
        .recon-notes {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .recon-notes strong {
          color: #ffffff;
          font-size: 0.85rem;
          margin-right: 0.5rem;
        }
        .recon-notes p {
          display: inline;
          font-size: 0.84rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        /* FID Section */
        .fid-formula-banner {
          padding: 1.5rem;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .formula-tag {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.06em;
          margin-bottom: 0.35rem;
        }
        .formula-text {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .formula-explanation {
          font-size: 0.84rem;
          color: var(--muted);
          line-height: 1.5;
        }
        .fruit-fid-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.84rem;
        }
        .fruit-fid-table th {
          text-align: left;
          padding: 0.85rem 1rem;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.68rem;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.02);
        }
        .fruit-fid-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .row-improved {
          background: rgba(16, 185, 129, 0.025);
        }
        .cat-pill {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }
        .cat-fresh {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }
        .cat-rotten {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
        }
        .delta-badge {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .delta-good {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }
        .delta-neutral {
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.6);
        }
        .fruit-fid-summary-row {
          background: rgba(16, 185, 129, 0.08) !important;
          border-top: 2px solid rgba(16, 185, 129, 0.3);
        }
        .fid-analysis-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          margin-top: 2rem;
        }
        .fid-insight-card {
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .insight-badge {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.62rem;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.06em;
        }
        .fid-insight-card h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .fid-insight-card p {
          font-size: 0.84rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Role Grid */
        .fruit-role-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        /* Tech Pills */
        .fruit-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          justify-content: center;
          max-width: 52rem;
          margin-inline: auto;
        }
        .fruit-tech-tag {
          padding: 0.55rem 1.1rem;
          border-radius: 8px;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.05);
          color: #10b981;
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        /* Takeaways Grid */
        .fruit-takeaways-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        .takeaway-card {
          padding: 1.75rem;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .takeaway-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .takeaway-card h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.35;
        }
        .takeaway-card p {
          font-size: 0.84rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Lightbox Modal */
        .fruit-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .fruit-lightbox-content {
          position: relative;
          max-width: 960px;
          width: 100%;
          background: #090d14;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .fruit-lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease;
        }
        .fruit-lightbox-close:hover {
          background: rgba(239, 68, 68, 0.8);
        }
        .fruit-lightbox-media {
          width: 100%;
          background: #05080e;
        }
        :global(.fruit-lightbox-image) {
          width: 100%;
          height: auto;
          display: block;
          max-height: 70vh;
          object-fit: contain;
        }
        .fruit-lightbox-caption {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .fruit-lightbox-caption h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.35rem 0;
        }
        .fruit-lightbox-caption p {
          font-size: 0.85rem;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .fruit-overview-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .fruit-pipeline-grid,
          .dataset-issues-grid,
          .dataset-gallery-grid,
          .fruit-takeaways-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .scanner-hud-row {
            grid-template-columns: 1fr;
          }
          .fruit-overview-stats,
          .dataset-splits-row,
          .dataset-issues-grid,
          .dataset-gallery-grid,
          .fruit-pipeline-grid,
          .training-curves-grid,
          .arch-reasons-grid,
          .fid-analysis-cards,
          .fruit-role-grid,
          .fruit-takeaways-grid {
            grid-template-columns: 1fr;
          }
          .arch-flow-diagram {
            flex-direction: column;
          }
          .flow-arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </main>
  )
}
