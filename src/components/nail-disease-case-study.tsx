'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Scan,
  Activity,
  BarChart3,
  Database,
  Cpu,
  Layers,
  GitBranch,
  Sliders,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Maximize2,
  X,
  ShieldCheck,
  FileSpreadsheet,
  Eye,
  Binary,
  Zap,
  Info,
  ChevronRight,
  Workflow,
  LineChart,
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
   DATASET CONSTANTS (EXACT VALUES FROM NOTEBOOK)
───────────────────────────────────────────────────────────── */
interface ClassInfo {
  id: string
  name: string
  rawCount: number
  percentage: string
  color: string
  tag: string
  testCount: number
  precision: string
  recall: string
  f1: string
  description: string
  clinicalNote: string
}

const CLASS_DATA: ClassInfo[] = [
  {
    id: 'alm',
    name: 'Acral Lentiginous Melanoma',
    rawCount: 21,
    percentage: '0.95%',
    color: '#ef4444',
    tag: 'Severe Minority (0.95%)',
    testCount: 3,
    precision: '0.50',
    recall: '0.67',
    f1: '0.57',
    description: 'Rare malignant melanoma variant affecting nail beds, palms, or soles. Extremely scarce in public datasets.',
    clinicalNote: 'Critical clinical risk; false negatives are dangerous, making recall crucial despite tiny sample support.',
  },
  {
    id: 'blue_finger',
    name: 'Blue Finger',
    rawCount: 612,
    percentage: '27.76%',
    color: '#0284c7',
    tag: 'Majority Class',
    testCount: 92,
    precision: '0.92',
    recall: '0.95',
    f1: '0.93',
    description: 'Cyanotic or vascular discoloration under digital imaging with distinct bluish-purple chromatic signatures.',
    clinicalNote: 'High visual distinctiveness allowed model to achieve robust 0.93 F1-score across 92 test cases.',
  },
  {
    id: 'healthy_nail',
    name: 'Healthy Nail',
    rawCount: 343,
    percentage: '15.56%',
    color: '#10b981',
    tag: 'Baseline Class',
    testCount: 51,
    precision: '1.00',
    recall: '0.98',
    f1: '0.99',
    description: 'Normal nail morphology without subungual discoloration, ridging, or severe dystrophic deformation.',
    clinicalNote: 'Highest classification performance with 1.00 precision and 0.99 F1-score on 51 test samples.',
  },
  {
    id: 'onychogryphosis',
    name: 'Onychogryphosis',
    rawCount: 600,
    percentage: '27.21%',
    color: '#d97706',
    tag: 'Majority Class',
    testCount: 90,
    precision: '0.97',
    recall: '0.96',
    f1: '0.96',
    description: 'Severe hypertrophy and claw-like curvature of the nail plate exhibiting prominent irregular textures.',
    clinicalNote: 'Distinctive morphological distortions provided salient features yielding 0.96 F1-score.',
  },
  {
    id: 'pitting',
    name: 'Pitting',
    rawCount: 629,
    percentage: '28.53%',
    color: '#8b5cf6',
    tag: 'Majority Class',
    testCount: 95,
    precision: '0.94',
    recall: '0.92',
    f1: '0.93',
    description: 'Small punctate depressions and indentations on the nail plate frequently associated with psoriasis or eczema.',
    clinicalNote: 'Subtle micro-texture pits recognized with 0.94 precision across 95 unseen test images.',
  },
]

/* ─────────────────────────────────────────────────────────────
   HERO INTERACTIVE CLASSIFICATION HUD
───────────────────────────────────────────────────────────── */
function HeroClassificationHUD() {
  const [activeClass, setActiveClass] = useState<ClassInfo>(CLASS_DATA[0])

  return (
    <div className="nail-hud-widget">
      {/* Top Terminal Header */}
      <div className="nail-hud-header">
        <div className="nail-terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="nail-hud-title">
          <Scan size={13} className="text-teal-400" />
          <span>EFFICIENTNET-B0 · 5-CLASS INFERENCE PIPELINE</span>
        </div>
        <span className="nail-hud-badge">PyTorch · Torchvision</span>
      </div>

      <div className="nail-hud-body">
        {/* Top 3 Metric Strip */}
        <div className="nail-hud-stats">
          <div className="nail-stat-cell">
            <span className="stat-label">INPUT TENSOR</span>
            <strong className="stat-value">224 × 224 × 3 RGB</strong>
            <span className="stat-sub">ImageNet Normalized</span>
          </div>
          <div className="nail-stat-cell">
            <span className="stat-label">BACKBONE MODEL</span>
            <strong className="stat-value text-teal-400">EfficientNet-B0</strong>
            <span className="stat-sub">5.3M Params (Frozen Backbone)</span>
          </div>
          <div className="nail-stat-cell">
            <span className="stat-label">VAL ACCURACY</span>
            <strong className="stat-value text-emerald-400">94.26%</strong>
            <span className="stat-sub">Early Stopped @ Epoch 67</span>
          </div>
        </div>

        {/* Interactive Pipeline Diagram */}
        <div className="nail-pipeline-interactive">
          <div className="pipeline-flow-row">
            {/* Step 1: Input */}
            <div className="pipeline-node input-node">
              <div className="node-badge">INPUT</div>
              <div className="node-icon-box">
                <Scan size={18} />
              </div>
              <span className="node-name">Digital Nail Image</span>
              <small>224 × 224 × 3</small>
            </div>

            <div className="pipeline-connector">
              <span className="conn-line" />
              <span className="conn-arrow">→</span>
            </div>

            {/* Step 2: Backbone */}
            <div className="pipeline-node model-node">
              <div className="node-badge">BACKBONE</div>
              <div className="node-icon-box text-teal-400">
                <Cpu size={18} />
              </div>
              <span className="node-name">EfficientNet-B0</span>
              <small>ImageNet Pretrained</small>
            </div>

            <div className="pipeline-connector">
              <span className="conn-line" />
              <span className="conn-arrow">→</span>
            </div>

            {/* Step 3: Classifier Head */}
            <div className="pipeline-node head-node">
              <div className="node-badge">HEAD</div>
              <div className="node-icon-box text-amber-400">
                <Layers size={18} />
              </div>
              <span className="node-name">Dropout + Linear</span>
              <small>1280 → 5 Classes</small>
            </div>

            <div className="pipeline-connector">
              <span className="conn-line" />
              <span className="conn-arrow">→</span>
            </div>

            {/* Step 4: Prediction Output */}
            <div className="pipeline-node output-node">
              <div className="node-badge">OUTPUT</div>
              <div className="node-icon-box text-emerald-400">
                <Activity size={18} />
              </div>
              <span className="node-name">5-Class Softmax</span>
              <small>Argmax Prediction</small>
            </div>
          </div>
        </div>

        {/* 5-Class Selector Buttons */}
        <div className="nail-class-selector-wrap">
          <span className="selector-title">SELECT CLASS TO INSPECT METRICS:</span>
          <div className="nail-class-pills">
            {CLASS_DATA.map((cls) => (
              <button
                key={cls.id}
                type="button"
                className={`nail-class-pill ${activeClass.id === cls.id ? 'active' : ''}`}
                onClick={() => setActiveClass(cls)}
                style={{
                  '--pill-color': cls.color,
                } as React.CSSProperties}
              >
                <span className="pill-dot" style={{ backgroundColor: cls.color }} />
                <span className="pill-text">{cls.name}</span>
                {cls.id === 'alm' && <span className="pill-mini-badge">21 imgs</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Active Class Inspection Box */}
        <div
          className="nail-class-detail-card"
          style={{
            borderColor: `${activeClass.color}40`,
            background: `linear-gradient(145deg, rgba(15, 23, 42, 0.7), ${activeClass.color}0a)`,
          }}
        >
          <div className="detail-header">
            <div>
              <div className="detail-tag-row">
                <span className="detail-tag" style={{ color: activeClass.color, borderColor: `${activeClass.color}40` }}>
                  {activeClass.tag}
                </span>
                <span className="detail-count-badge">
                  {activeClass.rawCount} Total Samples ({activeClass.percentage} of dataset)
                </span>
              </div>
              <h4 className="detail-class-name" style={{ color: '#ffffff' }}>
                {activeClass.name}
              </h4>
            </div>

            <div className="detail-scores">
              <div className="score-block">
                <span className="score-lbl">PRECISION</span>
                <strong className="score-val" style={{ color: activeClass.color }}>
                  {activeClass.precision}
                </strong>
              </div>
              <div className="score-block">
                <span className="score-lbl">RECALL</span>
                <strong className="score-val" style={{ color: activeClass.color }}>
                  {activeClass.recall}
                </strong>
              </div>
              <div className="score-block">
                <span className="score-lbl">F1-SCORE</span>
                <strong className="score-val" style={{ color: activeClass.color }}>
                  {activeClass.f1}
                </strong>
              </div>
            </div>
          </div>

          <p className="detail-desc">{activeClass.description}</p>
          <div className="detail-clinical">
            <Info size={14} className="flex-shrink-0 text-teal-400 mt-0.5" />
            <span>{activeClass.clinicalNote}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX MODAL FOR REAL ASSETS
───────────────────────────────────────────────────────────── */
function AssetLightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string
  alt: string
  caption: string
  onClose: () => void
}) {
  return (
    <div className="nail-lightbox-backdrop" onClick={onClose}>
      <div className="nail-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="nail-lightbox-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div className="nail-lightbox-image-wrap">
          <Image src={src} alt={alt} width={1200} height={800} className="nail-lightbox-img" />
        </div>
        <p className="nail-lightbox-caption">{caption}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export function NailDiseaseCaseStudyPage({ project }: { project: PortfolioProject }) {
  const ref = useReveal()
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string; caption: string } | null>(null)
  const [evalTab, setEvalTab] = useState<'efficientnet' | 'baseline' | 'modified'>('efficientnet')

  const index = projects.findIndex((p) => p.id === 'nail-disease')
  const previous = index !== -1 ? projects[(index - 1 + projects.length) % projects.length] : null
  const next = index !== -1 ? projects[(index + 1) % projects.length] : null

  return (
    <main
      className="project-page-root case-study nail-disease-page"
      ref={ref as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#0d9488',
          '--project-accent-rgb': '13, 148, 136',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(13, 148, 136, 0.03)',
          '--project-card-border': 'rgba(13, 148, 136, 0.18)',
        } as React.CSSProperties
      }
    >
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <header className="project-hero-section nail-hero">
        <ProjectContainer>
          <ProjectBackButton />

          <div className="project-hero-layout-split">
            <div className="project-hero-copy">
              <div className="project-kicker reveal">
                <span className="project-kicker-dot" />
                COMPUTER VISION / DEEP LEARNING
              </div>
              <h1 className="project-hero-title reveal">Nail Disease Classification</h1>
              <p className="project-hero-subtitle reveal">
                Transfer Learning with EfficientNet-B0
              </p>
              <p className="project-hero-lead reveal">
                An image classification project using EfficientNet-B0 transfer learning to classify five nail
                conditions from digital images, with a focus on class imbalance, augmentation, and rigorous
                model evaluation.
              </p>

              <div className="reveal">
                <ProjectMetaGrid
                  items={[
                    { label: 'ROLE', value: 'Machine Learning / Deep Learning' },
                    { label: 'TECHNOLOGY', value: 'PyTorch · EfficientNet-B0 · Scikit-learn' },
                    { label: 'DOMAIN', value: 'Computer Vision · Medical Imaging' },
                    { label: 'DATASET & TASK', value: '2,205 Images · 5 Conditions · 70/15/15 Split' },
                  ]}
                />
              </div>

              <div className="project-hero-actions reveal" style={{ marginTop: '1.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://github.com/RichelleMarvela/Nail-Disease-Classification-with-EfficientNet-B0.git"
                  target="_blank"
                  rel="noreferrer"
                  className="project-github-button"
                >
                  <GitBranch size={16} /> VIEW GITHUB <ArrowUpRight size={16} />
                </a>
                <Link href="/showcase/projects" className="project-github-button project-github-button-alt">
                  <ArrowLeft size={16} /> BACK TO PROJECTS
                </Link>
              </div>
            </div>

            <div className="project-hero-visual-slot reveal">
              <HeroClassificationHUD />
            </div>
          </div>
        </ProjectContainer>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          01 — PROJECT OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="overview"
        tag="01 — PROJECT OVERVIEW"
        title="Automated Image Classification for Imbalanced Medical Imaging"
        lead="This project explores automated classification of five nail conditions using a convolutional neural network based on EfficientNet-B0."
      >
        <div className="nail-overview-grid reveal">
          <div className="nail-overview-main-card">
            <div className="card-pill">THE CORE ML OBJECTIVE</div>
            <h3>Classification Under Severe Imbalance</h3>
            <p className="overview-text">
              The primary challenge is not simply image classification, but handling a highly imbalanced dataset
              where <strong>Acral Lentiginous Melanoma has only 21 images</strong> compared with hundreds of samples
              in the other classes. Standard deep learning classifiers trained on such distributions readily collapse
              into trivial majority-class predictors, achieving illusory high accuracy while failing entirely on
              the critical minority condition.
            </p>
            <p className="overview-text">
              To overcome this challenge, the pipeline combines <strong>stratified dataset partitioning</strong>,{' '}
              <strong>targeted minority data augmentation</strong>, <strong>pretrained feature extraction via EfficientNet-B0</strong>,{' '}
              <strong>regularized dropout & early stopping</strong>, and <strong>multi-metric per-class evaluation</strong>.
            </p>
          </div>

          <div className="nail-pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon text-teal-400">
                <Database size={18} />
              </div>
              <div className="pillar-content">
                <strong>Stratified Splitting</strong>
                <span>70% Train, 15% Val, 15% Test ensuring identical class ratios across all subsets.</span>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon text-amber-400">
                <Sparkles size={18} />
              </div>
              <div className="pillar-content">
                <strong>Targeted 10× Augmentation</strong>
                <span>Generated 10 realistic variations per ALM image, expanding train samples from 21 to 231.</span>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon text-emerald-400">
                <Cpu size={18} />
              </div>
              <div className="pillar-content">
                <strong>EfficientNet-B0 Backbone</strong>
                <span>Leveraged ImageNet feature transfer with frozen weights and a custom linear head.</span>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon text-blue-400">
                <BarChart3 size={18} />
              </div>
              <div className="pillar-content">
                <strong>Multi-Metric Evaluation</strong>
                <span>Assessed Precision, Recall, F1, Macro-average, Confusion Matrix, and ROC-AUC curves.</span>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          02 — DATASET DISTRIBUTION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="dataset"
        tag="02 — DATASET"
        title="2,205 Clinical Nail Images & Class Distribution"
        lead="A comprehensive distribution audit illustrating the substantial disparity between majority dermatological classes and the extreme minority melanoma class."
        alt
      >
        <div className="nail-dataset-layout reveal">
          {/* Visual Distribution Bars */}
          <div className="dataset-dist-card">
            <div className="card-header-flex">
              <div>
                <span className="card-eyebrow">DISTRIBUTION AUDIT</span>
                <h3 className="card-title">Class Frequency Disparity</h3>
              </div>
              <div className="total-badge">2,205 TOTAL IMAGES</div>
            </div>

            <div className="dist-bars-container">
              {CLASS_DATA.map((cls) => {
                const maxCount = 629
                const pctWidth = Math.max((cls.rawCount / maxCount) * 100, 2)
                return (
                  <div key={cls.id} className="dist-bar-row">
                    <div className="bar-labels">
                      <span className="class-label-name">
                        <span className="dot-indicator" style={{ backgroundColor: cls.color }} />
                        {cls.name}
                      </span>
                      <span className="class-label-count">
                        <strong>{cls.rawCount}</strong> images ({cls.percentage})
                      </span>
                    </div>

                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${pctWidth}%`,
                          backgroundColor: cls.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="imbalance-callout">
              <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
              <span>
                <strong>Severe Disparity:</strong> Acral Lentiginous Melanoma accounts for only <strong>0.95% (21 images)</strong>{' '}
                of the entire collection, compared to Pitting with <strong>629 images (28.53%)</strong>.
              </span>
            </div>
          </div>

          {/* Dataset Split Cards */}
          <div className="dataset-split-cards">
            <div className="split-card">
              <div className="split-header">
                <span className="split-name">TRAINING SET</span>
                <span className="split-pct">70%</span>
              </div>
              <div className="split-number">1,543</div>
              <span className="split-desc">Images used for model gradient updates</span>
              <div className="split-meta-sub">Stratified across all 5 classes</div>
            </div>

            <div className="split-card">
              <div className="split-header">
                <span className="split-name">VALIDATION SET</span>
                <span className="split-pct">15%</span>
              </div>
              <div className="split-number text-teal-400">331</div>
              <span className="split-desc">Images for epoch monitoring & early stopping</span>
              <div className="split-meta-sub">94.26% best validation accuracy</div>
            </div>

            <div className="split-card">
              <div className="split-header">
                <span className="split-name">TEST SET</span>
                <span className="split-pct">15%</span>
              </div>
              <div className="split-number text-emerald-400">331</div>
              <span className="split-desc">Completely unseen holdout test partition</span>
              <div className="split-meta-sub">Evaluated for final generalization metrics</div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          03 — THE CHALLENGE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="challenge"
        tag="03 — THE CHALLENGE"
        title="Key Technical Obstacles in Medical Nail Classification"
        lead="Beyond standard computer vision benchmarks, clinical nail pathology presents distinct computer vision hurdles."
      >
        <div className="nail-challenge-grid reveal">
          {/* Spotlight card */}
          <div className="challenge-spotlight-card">
            <div className="spotlight-badge">
              <AlertTriangle size={14} /> EXTREME CLASS IMBALANCE
            </div>
            <div className="ratio-visual">
              <div className="ratio-side minority">
                <span className="ratio-num">21</span>
                <span className="ratio-lbl">ALM Images</span>
                <span className="ratio-pct">0.95%</span>
              </div>
              <div className="ratio-vs">vs</div>
              <div className="ratio-side majority">
                <span className="ratio-num">629</span>
                <span className="ratio-lbl">Pitting Images</span>
                <span className="ratio-pct">28.53%</span>
              </div>
            </div>
            <p className="spotlight-desc">
              The dataset contains a severe imbalance between classes, with Acral Lentiginous Melanoma represented by only
              21 images. Standard unweighted optimization would cause the model to ignore this minority class without
              incurring a significant loss penalty.
            </p>
          </div>

          {/* 4 Challenges Grid */}
          <div className="challenges-four-grid">
            <div className="challenge-box">
              <span className="chal-num">01</span>
              <h4>Class Imbalance</h4>
              <p>Risk of majority-class bias where a naive classifier achieves 99% overall accuracy while failing 100% of minority melanoma cases.</p>
            </div>

            <div className="challenge-box">
              <span className="chal-num">02</span>
              <h4>Visual Similarity Between Conditions</h4>
              <p>Subtle color nuances and overlapping discoloration patterns between subungual hematomas, melanomas, and severe cyanosis.</p>
            </div>

            <div className="challenge-box">
              <span className="chal-num">03</span>
              <h4>Intra-Class Variation</h4>
              <p>Significant variations in photographic angles, patient skin tones, lighting conditions, background clutter, and disease stage.</p>
            </div>

            <div className="challenge-box">
              <span className="chal-num">04</span>
              <h4>Limited Medical Imaging Data</h4>
              <p>Clinical scarcity and ethical privacy constraints restrict the volume of labeled digital dermatology datasets.</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          04 — DATA PIPELINE & AUGMENTATION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="pipeline"
        tag="04 — DATA PIPELINE"
        title="Preprocessing, Stratified Splitting & Targeted Augmentation"
        lead="A robust transformation pipeline engineered to preserve label proportions and synthesize controlled variations for the minority class."
        alt
      >
        <div className="nail-pipeline-layout reveal">
          {/* Visual Step-by-Step Flow */}
          <div className="pipeline-steps-strip">
            <div className="pstep">
              <span className="pstep-num">01</span>
              <strong>RAW IMAGES</strong>
              <small>2,205 JPEGs</small>
            </div>
            <div className="pstep-arrow">→</div>
            <div className="pstep">
              <span className="pstep-num">02</span>
              <strong>STRATIFIED SPLIT</strong>
              <small>70 / 15 / 15 Ratio</small>
            </div>
            <div className="pstep-arrow">→</div>
            <div className="pstep">
              <span className="pstep-num">03</span>
              <strong>10× AUGMENTATION</strong>
              <small>Targeted on ALM</small>
            </div>
            <div className="pstep-arrow">→</div>
            <div className="pstep">
              <span className="pstep-num">04</span>
              <strong>224 × 224 TENSOR</strong>
              <small>RGB Normalization</small>
            </div>
            <div className="pstep-arrow">→</div>
            <div className="pstep">
              <span className="pstep-num">05</span>
              <strong>MODEL INPUT</strong>
              <small>EfficientNet-B0</small>
            </div>
          </div>

          {/* Real Augmentation Image from Repo */}
          <div className="repo-asset-frame">
            <div className="asset-header">
              <div className="asset-meta">
                <span className="asset-tag">ACTUAL REPOSITORY ASSET</span>
                <h4 className="asset-title">Data Augmentation Visual Inspection (Notebook Cell 10)</h4>
              </div>
              <button
                type="button"
                className="asset-expand-btn"
                onClick={() =>
                  setLightboxImg({
                    src: '/projects/nail-disease/nail_augmentation_grid.png',
                    alt: 'Data Augmentation Samples from Jupyter Notebook',
                    caption: 'Actual augmentation variations generated in the repository notebook: Original vs Random Rotation (±30°), Horizontal/Vertical Flips, Color Jitter, and Random Resized Crop.',
                  })
                }
              >
                <Maximize2 size={14} /> Expand Plot
              </button>
            </div>

            <div className="asset-img-container">
              <Image
                src="/projects/nail-disease/nail_augmentation_grid.png"
                alt="Data Augmentation Samples"
                width={1000}
                height={500}
                className="asset-img"
              />
            </div>
            <p className="asset-caption">
              Visual comparison from the Jupyter notebook showing original sample images alongside 4 randomized augmentations per row.
            </p>
          </div>

          {/* Augmentation Methods Grid */}
          <div className="aug-methods-grid">
            <div className="aug-card">
              <span className="aug-param">transforms.RandomRotation(30)</span>
              <strong>Random Rotation ±30°</strong>
              <p>Simulates varying camera angles and finger orientations during clinical mobile photography.</p>
            </div>
            <div className="aug-card">
              <span className="aug-param">transforms.RandomHorizontalFlip()</span>
              <strong>Horizontal & Vertical Flips</strong>
              <p>Provides mirror-invariance so left vs right hand digit anatomy does not bias feature extraction.</p>
            </div>
            <div className="aug-card">
              <span className="aug-param">transforms.ColorJitter(b=0.2, c=0.2)</span>
              <strong>Color Jitter</strong>
              <p>Alters brightness and contrast to simulate different hospital lighting and ambient environments.</p>
            </div>
            <div className="aug-card">
              <span className="aug-param">transforms.RandomResizedCrop(224)</span>
              <strong>Random Resized Crop</strong>
              <p>Crops patches at scales 0.8–1.0 to enforce scale invariance and focus on localized lesions.</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          05 — MODEL ARCHITECTURE
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="model"
        tag="05 — MODEL ARCHITECTURE"
        title="EfficientNet-B0 Transfer Learning Architecture"
        lead="EfficientNet-B0 was selected as a compact transfer-learning backbone that provides a practical balance between model capacity and computational efficiency."
      >
        <div className="nail-arch-container reveal">
          <div className="arch-diagram-flow">
            {/* Layer 1: Input */}
            <div className="arch-block">
              <div className="arch-layer-head">INPUT LAYER</div>
              <div className="arch-layer-body">
                <strong>224 × 224 × 3 RGB</strong>
                <span>ImageNet Mean/Std Normalized</span>
              </div>
            </div>

            <div className="arch-down-arrow">↓</div>

            {/* Layer 2: Feature Backbone */}
            <div className="arch-block arch-backbone">
              <div className="arch-layer-head text-teal-400">FEATURE EXTRACTOR BACKBONE (FROZEN)</div>
              <div className="arch-layer-body">
                <strong>EfficientNet-B0 Backbone (Pretrained on ImageNet)</strong>
                <span className="text-gray-300">MBConv (Inverted Residual + Squeeze-and-Excitation Blocks)</span>
                <div className="arch-tags-row">
                  <span className="arch-mini-tag">16 MBConv Blocks</span>
                  <span className="arch-mini-tag">Swish Activation</span>
                  <span className="arch-mini-tag">Compound Scaling (d=1, w=1, r=1)</span>
                  <span className="arch-mini-tag">requires_grad = False</span>
                </div>
              </div>
            </div>

            <div className="arch-down-arrow">↓</div>

            {/* Layer 3: Global Average Pooling */}
            <div className="arch-block">
              <div className="arch-layer-head">SPATIAL POOLING</div>
              <div className="arch-layer-body">
                <strong>AdaptiveAvgPool2d(output_size=1)</strong>
                <span>Collapses 7×7 feature map → 1,280 feature vector</span>
              </div>
            </div>

            <div className="arch-down-arrow">↓</div>

            {/* Layer 4: Custom Classifier Head */}
            <div className="arch-block arch-classifier">
              <div className="arch-layer-head text-amber-400">CUSTOM CLASSIFIER HEAD (TRAINABLE)</div>
              <div className="arch-layer-body">
                <div className="classifier-step">
                  <span className="clf-badge">Dropout</span>
                  <strong>nn.Dropout(p=0.2, inplace=True)</strong>
                  <span>Prevents co-adaptation and regularizes dense weights</span>
                </div>
                <div className="classifier-step" style={{ marginTop: '0.5rem' }}>
                  <span className="clf-badge">Linear</span>
                  <strong>nn.Linear(in_features=1280, out_features=5)</strong>
                  <span>Maps 1280 latent representation to 5 condition logits</span>
                </div>
              </div>
            </div>

            <div className="arch-down-arrow">↓</div>

            {/* Layer 5: Output */}
            <div className="arch-block arch-output">
              <div className="arch-layer-head text-emerald-400">SOFTMAX OUTPUT</div>
              <div className="arch-layer-body">
                <strong>5-Class Probability Distribution</strong>
                <span>Acral Melanoma · Blue Finger · Healthy · Onychogryphosis · Pitting</span>
              </div>
            </div>
          </div>

          <div className="arch-notes-panel">
            <h4 className="notes-title">
              <Info size={16} className="text-teal-400" /> Architectural Rationale
            </h4>
            <p>
              Pretrained convolutional weights from ImageNet encode rich universal representations (edges, textures, gradients)
              that transfer effectively to medical pathology. By freezing the convolutional backbone (<code>requires_grad = False</code>)
              and only fine-tuning the classification head, the network avoids catastrophic forgetting and prevents overfitting
              on the small dataset.
            </p>
            <div className="arch-spec-grid">
              <div className="spec-item">
                <span className="spec-lbl">Parameters</span>
                <strong>~5.3 Million</strong>
              </div>
              <div className="spec-item">
                <span className="spec-lbl">Input Size</span>
                <strong>224 × 224 px</strong>
              </div>
              <div className="spec-item">
                <span className="spec-lbl">Backbone Freeze</span>
                <strong className="text-emerald-400">Frozen (Features)</strong>
              </div>
              <div className="spec-item">
                <span className="spec-lbl">Classifier Dropout</span>
                <strong>p = 0.2</strong>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          06 — TRAINING STRATEGY
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="training"
        tag="06 — TRAINING STRATEGY"
        title="Optimization & Regularization Protocol"
        lead="Detailed parameters and stabilization mechanics employed during model convergence."
        alt
      >
        <div className="nail-training-grid reveal">
          <div className="train-strategy-card">
            <div className="strat-icon text-teal-400">
              <Sliders size={20} />
            </div>
            <h4>Optimization Hyperparameters</h4>
            <div className="strat-params-list">
              <div className="param-row">
                <span className="p-name">Optimizer</span>
                <strong className="p-val">Adam (lr = 0.001)</strong>
              </div>
              <div className="param-row">
                <span className="p-name">Loss Criterion</span>
                <strong className="p-val">nn.CrossEntropyLoss()</strong>
              </div>
              <div className="param-row">
                <span className="p-name">Max Epochs</span>
                <strong className="p-val">100 Epochs</strong>
              </div>
              <div className="param-row">
                <span className="p-name">Early Stopping</span>
                <strong className="p-val text-amber-400">Patience = 10 (Stopped @ Epoch 67)</strong>
              </div>
              <div className="param-row">
                <span className="p-name">Best Val Loss</span>
                <strong className="p-val text-emerald-400">0.1851 (Epoch 57) / 0.1942 (Final)</strong>
              </div>
            </div>
          </div>

          <div className="train-strategy-card">
            <div className="strat-icon text-amber-400">
              <ShieldCheck size={20} />
            </div>
            <h4>Imbalance & Regularization Defense</h4>
            <div className="strat-bullets">
              <div className="strat-bullet-item">
                <strong>10× Targeted Oversampling</strong>
                <span>Generated 10 augmented instances per original Acral Lentiginous Melanoma image to ensure balanced feature exposure during gradient descent.</span>
              </div>
              <div className="strat-bullet-item">
                <strong>Dropout Regularization (p = 0.2)</strong>
                <span>Randomly deactivates 20% of classifier neurons during training passes, preventing dependence on single dominant weights.</span>
              </div>
              <div className="strat-bullet-item">
                <strong>Validation Patience Monitor</strong>
                <span>Monitors validation loss each epoch, resetting a 10-step patience counter whenever a new minimum loss is achieved to halt overfitting.</span>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          07 — MODEL EVALUATION & REPO ASSETS
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="evaluation"
        tag="07 — MODEL EVALUATION"
        title="Empirical Results & Test Set Performance"
        lead="Comprehensive multi-metric evaluation across 331 completely unseen test images, utilizing verified plots and classification metrics from the repository."
      >
        <div className="nail-eval-container reveal">
          {/* Top Score Banner */}
          <div className="eval-headline-banner">
            <div className="headline-cell">
              <span className="h-lbl">BEST VAL ACCURACY</span>
              <strong className="h-val text-teal-400">94.26%</strong>
              <span className="h-sub">Epoch 67 Convergence</span>
            </div>
            <div className="headline-divider" />
            <div className="headline-cell">
              <span className="h-lbl">TEST ACCURACY</span>
              <strong className="h-val text-emerald-400">94.00%</strong>
              <span className="h-sub">331 Unseen Test Images</span>
            </div>
            <div className="headline-divider" />
            <div className="headline-cell">
              <span className="h-lbl">MACRO F1-SCORE</span>
              <strong className="h-val text-amber-400">0.88</strong>
              <span className="h-sub">Unweighted Class Average</span>
            </div>
            <div className="headline-divider" />
            <div className="headline-cell">
              <span className="h-lbl">WEIGHTED F1-SCORE</span>
              <strong className="h-val text-teal-300">0.94</strong>
              <span className="h-sub">Support-Weighted Average</span>
            </div>
          </div>

          {/* Classification Report Table */}
          <div className="classification-table-card">
            <div className="table-header-flex">
              <div>
                <span className="card-eyebrow">TEST SET EVALUATION</span>
                <h4 className="card-title">Detailed Per-Class Classification Report</h4>
              </div>
              <span className="table-meta-note">N = 331 Holdout Images</span>
            </div>

            <div className="table-responsive-wrap">
              <table className="nail-metrics-table">
                <thead>
                  <tr>
                    <th>CLASS NAME</th>
                    <th>PRECISION</th>
                    <th>RECALL</th>
                    <th>F1-SCORE</th>
                    <th>TEST SUPPORT</th>
                    <th>PERFORMANCE NOTE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="class-td-flex">
                        <span className="dot-indicator" style={{ backgroundColor: '#ef4444' }} />
                        <strong>Acral Lentiginous Melanoma</strong>
                        <span className="mini-minority-tag">Minority</span>
                      </div>
                    </td>
                    <td className="metric-val text-amber-400">0.50</td>
                    <td className="metric-val text-teal-400">0.67</td>
                    <td className="metric-val text-amber-300 font-bold">0.57</td>
                    <td>3</td>
                    <td className="text-gray-400">Minority class with 2 of 3 test cases correctly classified</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="class-td-flex">
                        <span className="dot-indicator" style={{ backgroundColor: '#10b981' }} />
                        <strong>Healthy Nail</strong>
                      </div>
                    </td>
                    <td className="metric-val text-emerald-400 font-bold">1.00</td>
                    <td className="metric-val text-emerald-400">0.98</td>
                    <td className="metric-val text-emerald-400 font-bold">0.99</td>
                    <td>51</td>
                    <td className="text-gray-400">Exceptional differentiation from all pathological states</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="class-td-flex">
                        <span className="dot-indicator" style={{ backgroundColor: '#d97706' }} />
                        <strong>Onychogryphosis</strong>
                      </div>
                    </td>
                    <td className="metric-val text-emerald-400">0.97</td>
                    <td className="metric-val text-emerald-400">0.96</td>
                    <td className="metric-val text-emerald-400 font-bold">0.96</td>
                    <td>90</td>
                    <td className="text-gray-400">Strong identification of severe nail thickening</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="class-td-flex">
                        <span className="dot-indicator" style={{ backgroundColor: '#0284c7' }} />
                        <strong>Blue Finger</strong>
                      </div>
                    </td>
                    <td className="metric-val text-emerald-400">0.92</td>
                    <td className="metric-val text-emerald-400">0.95</td>
                    <td className="metric-val text-emerald-400 font-bold">0.93</td>
                    <td>92</td>
                    <td className="text-gray-400">Robust cyanotic color space recognition</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="class-td-flex">
                        <span className="dot-indicator" style={{ backgroundColor: '#8b5cf6' }} />
                        <strong>Pitting</strong>
                      </div>
                    </td>
                    <td className="metric-val text-emerald-400">0.94</td>
                    <td className="metric-val text-emerald-400">0.92</td>
                    <td className="metric-val text-emerald-400 font-bold">0.93</td>
                    <td>95</td>
                    <td className="text-gray-400">High accuracy on punctate textural depressions</td>
                  </tr>
                  <tr className="summary-tr">
                    <td><strong>Overall Accuracy</strong></td>
                    <td colSpan={2} className="text-right text-gray-400">311 / 331 correct</td>
                    <td className="metric-val text-teal-400 font-bold">0.94</td>
                    <td>331</td>
                    <td className="text-gray-400">94.00% overall test accuracy</td>
                  </tr>
                  <tr className="summary-tr">
                    <td><strong>Macro Average</strong></td>
                    <td className="metric-val text-teal-400">0.86</td>
                    <td className="metric-val text-teal-400">0.89</td>
                    <td className="metric-val text-amber-300 font-bold">0.88</td>
                    <td>331</td>
                    <td className="text-gray-400">Unweighted mean reflecting minority class challenge</td>
                  </tr>
                  <tr className="summary-tr">
                    <td><strong>Weighted Average</strong></td>
                    <td className="metric-val text-emerald-400">0.94</td>
                    <td className="metric-val text-emerald-400">0.94</td>
                    <td className="metric-val text-emerald-400 font-bold">0.94</td>
                    <td>331</td>
                    <td className="text-gray-400">Sample-weighted score across all classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabbed Interactive Visual Assets from Repo */}
          <div className="eval-tabs-card">
            <div className="tabs-header-bar">
              <div className="tab-buttons">
                <button
                  type="button"
                  className={`tab-btn ${evalTab === 'efficientnet' ? 'active' : ''}`}
                  onClick={() => setEvalTab('efficientnet')}
                >
                  <Cpu size={14} /> EfficientNet-B0 (Final Model)
                </button>
                <button
                  type="button"
                  className={`tab-btn ${evalTab === 'modified' ? 'active' : ''}`}
                  onClick={() => setEvalTab('modified')}
                >
                  <Layers size={14} /> Modified CNN Comparison
                </button>
                <button
                  type="button"
                  className={`tab-btn ${evalTab === 'baseline' ? 'active' : ''}`}
                  onClick={() => setEvalTab('baseline')}
                >
                  <Activity size={14} /> Baseline CNN Comparison
                </button>
              </div>
            </div>

            {/* EfficientNet-B0 Tab Content */}
            {evalTab === 'efficientnet' && (
              <div className="tab-pane">
                <div className="plots-dual-grid">
                  <div className="plot-box">
                    <div className="plot-header">
                      <span>Training & Validation Loss / Accuracy (67 Epochs)</span>
                      <button
                        type="button"
                        className="asset-expand-btn"
                        onClick={() =>
                          setLightboxImg({
                            src: '/projects/nail-disease/efficientnet_b0_loss_acc.png',
                            alt: 'EfficientNet-B0 Loss & Accuracy Curves',
                            caption: 'Actual training curves from Jupyter notebook: loss smoothly descended from 0.945 to 0.127, while validation accuracy reached 94.26% before early stopping at epoch 67.',
                          })
                        }
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                    <div className="plot-img-wrap">
                      <Image
                        src="/projects/nail-disease/efficientnet_b0_loss_acc.png"
                        alt="EfficientNet-B0 Loss & Accuracy Curves"
                        width={600}
                        height={300}
                        className="plot-img"
                      />
                    </div>
                  </div>

                  <div className="plot-box">
                    <div className="plot-header">
                      <span>Confusion Matrix (Test Set N=331)</span>
                      <button
                        type="button"
                        className="asset-expand-btn"
                        onClick={() =>
                          setLightboxImg({
                            src: '/projects/nail-disease/efficientnet_b0_confusion_matrix.png',
                            alt: 'EfficientNet-B0 Confusion Matrix',
                            caption: 'Confusion matrix on 331 unseen test images showing high diagonal density across Healthy Nail (50/51), Onychogryphosis (86/90), Blue Finger (87/92), Pitting (87/95), and ALM (2/3).',
                          })
                        }
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                    <div className="plot-img-wrap">
                      <Image
                        src="/projects/nail-disease/efficientnet_b0_confusion_matrix.png"
                        alt="EfficientNet-B0 Confusion Matrix"
                        width={600}
                        height={300}
                        className="plot-img"
                      />
                    </div>
                  </div>
                </div>

                <div className="plot-box full-width-plot" style={{ marginTop: '1rem' }}>
                  <div className="plot-header">
                    <span>Multi-Class ROC Curves & Area Under Curve (AUC)</span>
                    <button
                      type="button"
                      className="asset-expand-btn"
                      onClick={() =>
                        setLightboxImg({
                          src: '/projects/nail-disease/efficientnet_b0_roc_curve.png',
                          alt: 'EfficientNet-B0 Multi-Class ROC Curves',
                          caption: 'ROC curves per class generated in the notebook showing near-perfect discrimination (AUC > 0.98) across healthy, cyanotic, and dystrophic conditions.',
                        })
                      }
                    >
                      <Maximize2 size={12} />
                    </button>
                  </div>
                  <div className="plot-img-wrap roc-wrap">
                    <Image
                      src="/projects/nail-disease/efficientnet_b0_roc_curve.png"
                      alt="EfficientNet-B0 ROC Curves"
                      width={800}
                      height={400}
                      className="plot-img"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modified CNN Tab */}
            {evalTab === 'modified' && (
              <div className="tab-pane">
                <div className="plots-dual-grid">
                  <div className="plot-box">
                    <div className="plot-header">
                      <span>Modified CNN Loss & Accuracy Curves</span>
                      <button
                        type="button"
                        className="asset-expand-btn"
                        onClick={() =>
                          setLightboxImg({
                            src: '/projects/nail-disease/modified_cnn_loss_acc.png',
                            alt: 'Modified CNN Loss & Accuracy Curves',
                            caption: 'Training dynamics of the custom multi-layer CNN without pretrained transfer learning.',
                          })
                        }
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                    <div className="plot-img-wrap">
                      <Image
                        src="/projects/nail-disease/modified_cnn_loss_acc.png"
                        alt="Modified CNN Loss & Accuracy Curves"
                        width={600}
                        height={300}
                        className="plot-img"
                      />
                    </div>
                  </div>

                  <div className="plot-box">
                    <div className="plot-header">
                      <span>Modified CNN Confusion Matrix</span>
                      <button
                        type="button"
                        className="asset-expand-btn"
                        onClick={() =>
                          setLightboxImg({
                            src: '/projects/nail-disease/modified_cnn_confusion_matrix.png',
                            alt: 'Modified CNN Confusion Matrix',
                            caption: 'Confusion matrix for Modified CNN showing lower generalization on subtle textural classes compared to EfficientNet-B0.',
                          })
                        }
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                    <div className="plot-img-wrap">
                      <Image
                        src="/projects/nail-disease/modified_cnn_confusion_matrix.png"
                        alt="Modified CNN Confusion Matrix"
                        width={600}
                        height={300}
                        className="plot-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Baseline CNN Tab */}
            {evalTab === 'baseline' && (
              <div className="tab-pane">
                <div className="plots-dual-grid">
                  <div className="plot-box">
                    <div className="plot-header">
                      <span>Baseline CNN Loss & Accuracy Curves</span>
                      <button
                        type="button"
                        className="asset-expand-btn"
                        onClick={() =>
                          setLightboxImg({
                            src: '/projects/nail-disease/baseline_cnn_loss_acc.png',
                            alt: 'Baseline CNN Loss & Accuracy Curves',
                            caption: 'Baseline simple CNN training curves demonstrating noticeable instability and lower accuracy before architectural refinements.',
                          })
                        }
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                    <div className="plot-img-wrap">
                      <Image
                        src="/projects/nail-disease/baseline_cnn_loss_acc.png"
                        alt="Baseline CNN Loss & Accuracy Curves"
                        width={600}
                        height={300}
                        className="plot-img"
                      />
                    </div>
                  </div>

                  <div className="plot-box">
                    <div className="plot-header">
                      <span>Baseline CNN Confusion Matrix</span>
                      <button
                        type="button"
                        className="asset-expand-btn"
                        onClick={() =>
                          setLightboxImg({
                            src: '/projects/nail-disease/baseline_cnn_confusion_matrix.png',
                            alt: 'Baseline CNN Confusion Matrix',
                            caption: 'Confusion matrix for Baseline CNN illustrating severe misclassification between pitting, onychogryphosis, and healthy nails.',
                          })
                        }
                      >
                        <Maximize2 size={12} />
                      </button>
                    </div>
                    <div className="plot-img-wrap">
                      <Image
                        src="/projects/nail-disease/baseline_cnn_confusion_matrix.png"
                        alt="Baseline CNN Confusion Matrix"
                        width={600}
                        height={300}
                        className="plot-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          08 — WHAT THE MODEL REVEALED (ML INSIGHT)
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="insights"
        tag="08 — WHAT THE MODEL REVEALED"
        title="Why 94% Overall Accuracy Is Not the Whole Story"
        lead="An analytical breakdown of model behavior across majority vs. minority conditions in imbalanced medical imaging."
        alt
      >
        <div className="nail-insights-grid reveal">
          <div className="insight-card major-insight">
            <div className="insight-badge text-amber-400">
              <Zap size={14} /> CRITICAL ML TAKEAWAY
            </div>
            <h3>The Disparity Between Overall Accuracy & Minority Recall</h3>
            <p>
              While headline metrics indicate a strong <strong>94.00% test accuracy</strong> and <strong>0.94 weighted F1</strong>,
              examining unweighted per-class performance reveals that the minority <strong>Acral Lentiginous Melanoma</strong> class
              achieved an F1-score of <strong>0.57</strong> (Precision: 0.50, Recall: 0.67).
            </p>
            <p>
              In clinical settings, false negatives on melanoma represent high diagnostic risk. This experiment underscores
              why relying solely on accuracy in medical machine learning creates false confidence. Reporting <strong>Macro F1 (0.88)</strong>,
              per-class confusion matrices, and precision-recall trade-offs is essential for transparent model auditing.
            </p>
          </div>

          <div className="insights-sub-grid">
            <div className="sub-insight-box">
              <span className="sub-icon text-teal-400">01</span>
              <div>
                <strong>Transfer Learning Was Essential</strong>
                <p>Training from scratch on 2,205 images caused severe feature degradation. ImageNet feature reuse provided the invariant textural descriptors necessary to distinguish nail dystrophies.</p>
              </div>
            </div>

            <div className="sub-insight-box">
              <span className="sub-icon text-teal-400">02</span>
              <div>
                <strong>Augmentation Mitigated Total Collapse</strong>
                <p>Without 10× targeted augmentation, the model predicted zero ALM cases. Synthetic perturbation expanded the decision boundary sufficiently to achieve 0.67 recall on unseen test data.</p>
              </div>
            </div>

            <div className="sub-insight-box">
              <span className="sub-icon text-teal-400">03</span>
              <div>
                <strong>Textural Boundary Nuances</strong>
                <p>Healthy nail was effortlessly classified (0.99 F1), whereas micro-indentation conditions (Pitting) exhibited minor confusion with early Onychogryphosis.</p>
              </div>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          09 — END-TO-END WORKFLOW
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="workflow"
        tag="09 — END-TO-END WORKFLOW"
        title="Complete Machine Learning Lifecycle"
        lead="A structured 8-stage pipeline from raw image ingestion to analytical metric interpretation."
      >
        <div className="nail-workflow-timeline reveal">
          {[
            { num: '01', title: 'Data Loading', desc: 'Ingested 2,205 digital nail photographs across 5 clinical directory classes.' },
            { num: '02', title: 'Imbalance Auditing', desc: 'Identified severe 0.95% minority proportion in Acral Lentiginous Melanoma (21 images).' },
            { num: '03', title: 'Stratified Splitting', desc: 'Partitioned data into 70% Train (1,543), 15% Val (331), and 15% Test (331) sets.' },
            { num: '04', title: 'Targeted Augmentation', desc: 'Synthesized 10 variations per ALM image (rotations, flips, color jitter, crops).' },
            { num: '05', title: 'EfficientNet-B0 Setup', desc: 'Loaded ImageNet weights, froze convolutional feature extractor, attached custom head.' },
            { num: '06', title: 'Regularized Training', desc: 'Trained using Adam optimizer (lr=0.001), CrossEntropyLoss, and Early Stopping @ 67 epochs.' },
            { num: '07', title: 'Test Set Evaluation', desc: 'Computed per-class confusion matrix, ROC curves, macro/weighted F1 on 331 test images.' },
            { num: '08', title: 'Result Interpretation', desc: 'Analyzed minority recall dynamics and documented clinical trade-offs transparently.' },
          ].map((step, idx) => (
            <div key={step.num} className="workflow-card">
              <div className="wcard-head">
                <span className="wcard-num">{step.num}</span>
                <span className="wcard-pill">PHASE {idx + 1}</span>
              </div>
              <h4 className="wcard-title">{step.title}</h4>
              <p className="wcard-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          10 — TECHNOLOGY STACK
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="tech"
        tag="10 — TECHNOLOGY"
        title="Tools & Technologies Used"
        lead="Clean, modern deep learning stack utilized throughout experimentation and model evaluation."
        alt
      >
        <div className="nail-tech-grid reveal">
          <div className="tech-stack-card">
            <span className="tech-category">DEEP LEARNING</span>
            <h4>PyTorch & Torchvision</h4>
            <p>Model architecture definition, tensor operations, EfficientNet-B0 pretrained weights, and custom DataLoader pipelines.</p>
          </div>

          <div className="tech-stack-card">
            <span className="tech-category">EVALUATION & METRICS</span>
            <h4>Scikit-learn</h4>
            <p>Stratified train/val/test splitting, confusion matrix calculation, classification report generation, and multi-class ROC-AUC computation.</p>
          </div>

          <div className="tech-stack-card">
            <span className="tech-category">DATA & NUMERICAL</span>
            <h4>NumPy & Pandas</h4>
            <p>Dataset distribution indexing, class frequency calculations, and metric array aggregation.</p>
          </div>

          <div className="tech-stack-card">
            <span className="tech-category">IMAGE PROCESSING</span>
            <h4>PIL / Pillow</h4>
            <p>Image loading, color space verification (EnsureRGB), and dynamic image transform pipelines.</p>
          </div>

          <div className="tech-stack-card">
            <span className="tech-category">DATA VISUALIZATION</span>
            <h4>Matplotlib & Seaborn</h4>
            <p>Training loss/accuracy progression plotting, confusion matrix heatmaps, and multi-class ROC curve charting.</p>
          </div>

          <div className="tech-stack-card">
            <span className="tech-category">CORE TECHNIQUES</span>
            <h4>Transfer Learning & Augmentation</h4>
            <p>Pretrained compound scaling backbones, frozen feature extraction, random affine transformations, and early stopping regularization.</p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          11 — WHAT I BUILT / CONTRIBUTION
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection
        id="contribution"
        tag="11 — WHAT I BUILT"
        title="Individual Engineering Contributions"
        lead="Core technical areas architected and executed in this computer vision case study."
      >
        <div className="nail-contrib-grid reveal">
          <div className="contrib-item">
            <div className="contrib-num">01</div>
            <div>
              <h4>Deep Learning Pipeline</h4>
              <p>Engineered the complete computer vision workflow in PyTorch from raw image loading, preprocessing, and normalization through batch evaluation.</p>
            </div>
          </div>

          <div className="contrib-item">
            <div className="contrib-num">02</div>
            <div>
              <h4>Transfer Learning Backbone</h4>
              <p>Implemented EfficientNet-B0 with ImageNet pretrained weights, freezing feature layers and tuning custom Dropout (0.2) + Linear classifier layers.</p>
            </div>
          </div>

          <div className="contrib-item">
            <div className="contrib-num">03</div>
            <div>
              <h4>Class Imbalance Handling</h4>
              <p>Engineered stratified 70/15/15 data partitioning and targeted 10× augmentation transforms to expand the extreme 21-sample minority class.</p>
            </div>
          </div>

          <div className="contrib-item">
            <div className="contrib-num">04</div>
            <div>
              <h4>Multi-Metric Model Evaluation</h4>
              <p>Evaluated performance using per-class precision, recall, F1-scores, confusion matrices, and ROC-AUC curves on a 331-image holdout test partition.</p>
            </div>
          </div>

          <div className="contrib-item">
            <div className="contrib-num">05</div>
            <div>
              <h4>ML Analysis & Insight</h4>
              <p>Interpreted model behavior beyond headline accuracy, demonstrating the trade-offs of severe imbalance on rare condition detection.</p>
            </div>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          12 — MEDICAL & RESEARCH DISCLAIMER
      ───────────────────────────────────────────────────────────── */}
      <ProjectSection id="disclaimer" className="nail-disclaimer-section" alt>
        <div className="nail-disclaimer-card reveal">
          <div className="disclaimer-icon">
            <ShieldCheck size={24} className="text-teal-400" />
          </div>
          <div>
            <h4>Academic Research & Portfolio Disclaimer</h4>
            <p>
              This project is an academic computer vision and deep learning case study exploring transfer learning
              and class imbalance in medical image classification. It is <strong>not a clinically validated diagnostic system</strong>{' '}
              and is not intended for clinical diagnosis, patient screening, or treatment guidance. It demonstrates machine
              learning classification methodology, data augmentation techniques, and empirical evaluation practices.
            </p>
          </div>
        </div>
      </ProjectSection>

      {/* ─────────────────────────────────────────────────────────────
          13 — GITHUB CTA & NAVIGATION
      ───────────────────────────────────────────────────────────── */}
      <ProjectGithubCTA
        githubUrl="https://github.com/RichelleMarvela/Nail-Disease-Classification-with-EfficientNet-B0.git"
        title="Inspect the Nail Disease Classification Repository"
        description="Explore the complete Jupyter notebook with PyTorch implementation, training curves, confusion matrix generation, and evaluation pipelines."
        buttonLabel="VIEW NOTEBOOK ON GITHUB"
      />

      <ProjectNavFooter currentId="nail-disease" previous={previous} next={next} />

      {/* Lightbox Modal */}
      {lightboxImg && (
        <AssetLightbox
          src={lightboxImg.src}
          alt={lightboxImg.alt}
          caption={lightboxImg.caption}
          onClose={() => setLightboxImg(null)}
        />
      )}
    </main>
  )
}
