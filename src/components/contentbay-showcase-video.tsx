'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Play, Pause, RotateCcw, Maximize2, Minimize2, Sparkles, Layers, Database, ChevronRight, MousePointer } from 'lucide-react'

interface ShowcaseStep {
  id: string
  title: string
  subtitle: string
  imgSrc: string
  alt: string
  badge: string
  duration: number // in seconds
  cameraScale: number
  cameraTranslateX: number
  cameraTranslateY: number
  cursorPos?: { x: number; y: number }
  highlightTarget?: { x: number; y: number; width: number; height: number; label: string }
}

const STEPS: ShowcaseStep[] = [
  {
    id: 'hero',
    title: 'ContentBay Platform Landing',
    subtitle: 'API-first Headless CMS giving developers freedom and creators power',
    imgSrc: '/projects/contentbay/hero-landing.png',
    alt: 'ContentBay Landing Page Hero - Manage content at scale',
    badge: 'SCENE 01 — HERO UI',
    duration: 6,
    cameraScale: 1.0,
    cameraTranslateX: 0,
    cameraTranslateY: 0,
    cursorPos: { x: 28, y: 58 },
    highlightTarget: { x: 22, y: 56, width: 14, height: 6, label: 'Start Building for Free' }
  },
  {
    id: 'hero-zoom',
    title: 'Manage Content at Scale',
    subtitle: 'Visual Editor 2.0 & Flexible Content Ingestion API',
    imgSrc: '/projects/contentbay/hero-landing.png',
    alt: 'ContentBay Landing Page Hero Close-up',
    badge: 'SCENE 02 — DOLLY ZOOM',
    duration: 5,
    cameraScale: 1.25,
    cameraTranslateX: -12,
    cameraTranslateY: -10,
    cursorPos: { x: 22, y: 56 },
    highlightTarget: { x: 16, y: 20, width: 15, height: 4, label: 'Visual Editor 2.0' }
  },
  {
    id: 'workspace',
    title: 'Workspace Management',
    subtitle: 'Centralized environment architecture for organization content',
    imgSrc: '/projects/contentbay/workspace-dashboard.png',
    alt: 'ContentBay Workspace Dashboard - Organization environments',
    badge: 'SCENE 03 — WORKSPACE DASHBOARD',
    duration: 6,
    cameraScale: 1.08,
    cameraTranslateX: 0,
    cameraTranslateY: 0,
    cursorPos: { x: 80, y: 18 },
    highlightTarget: { x: 74, y: 16, width: 15, height: 5, label: '+ Add new workspace' }
  },
  {
    id: 'content-model',
    title: 'Content Model & Field Configuration',
    subtitle: 'Granular field properties, settings, validation, and JSON API payloads',
    imgSrc: '/projects/contentbay/content-model-modal.png',
    alt: 'ContentBay Content Model Field Configuration Overlay',
    badge: 'SCENE 04 — CONTENT MODELING',
    duration: 7,
    cameraScale: 1.15,
    cameraTranslateX: 0,
    cameraTranslateY: 5,
    cursorPos: { x: 70, y: 86 },
    highlightTarget: { x: 66, y: 84, width: 8, height: 5, label: 'Confirm Schema' }
  }
]

export function ContentBayShowcaseVideo() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [stepProgress, setStepProgress] = useState(0) // 0 to 1
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)

  const currentStep = STEPS[currentStepIdx]

  // Overall total video length in seconds
  const totalDuration = STEPS.reduce((acc, s) => acc + s.duration, 0)
  
  // Calculate elapsed time
  const getElapsedSeconds = useCallback(() => {
    let elapsedBefore = 0
    for (let i = 0; i < currentStepIdx; i++) {
      elapsedBefore += STEPS[i].duration
    }
    return elapsedBefore + stepProgress * currentStep.duration
  }, [currentStepIdx, stepProgress, currentStep.duration])

  // Playback Loop
  useEffect(() => {
    if (!isPlaying) return

    const intervalMs = 30 / playbackSpeed
    timerRef.current = window.setInterval(() => {
      setStepProgress((prev) => {
        const stepIncrement = (intervalMs / 1000) / currentStep.duration
        const nextProg = prev + stepIncrement

        if (nextProg >= 1) {
          // Advance step
          setCurrentStepIdx((idx) => (idx + 1) % STEPS.length)
          return 0
        }
        return nextProg
      })
    }, intervalMs)

    return () => {
      if (timerRef.current !== null) clearInterval(timerRef.current)
    }
  }, [isPlaying, currentStepIdx, currentStep.duration, playbackSpeed])

  const togglePlay = () => setIsPlaying(!isPlaying)

  const handleStepSelect = (idx: number) => {
    setCurrentStepIdx(idx)
    setStepProgress(0)
  }

  const handleRestart = () => {
    setCurrentStepIdx(0)
    setStepProgress(0)
    setIsPlaying(true)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Smooth camera zoom interpolation
  const interpolatedScale = currentStep.cameraScale + Math.sin(stepProgress * Math.PI) * 0.04
  const interpolatedX = currentStep.cameraTranslateX + Math.sin(stepProgress * Math.PI) * 1.5
  const interpolatedY = currentStep.cameraTranslateY + Math.cos(stepProgress * Math.PI) * 1.0

  return (
    <div
      ref={containerRef}
      className={`contentbay-video-container ${isFullscreen ? 'fullscreen-mode' : ''}`}
    >
      {/* ── Studio Stage Background & Video Canvas ── */}
      <div className="showcase-viewport">
        {/* Soft Ambient Glow Overlay */}
        <div className="ambient-backdrop-glow" />

        {/* Dynamic Scene Frame */}
        <div
          className="ui-camera-frame"
          style={{
            transform: `scale(${interpolatedScale}) translate(${interpolatedX}%, ${interpolatedY}%)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Browser Glass Frame Header */}
          <div className="browser-mock-header">
            <div className="browser-window-dots">
              <span className="dot dot-close" />
              <span className="dot dot-min" />
              <span className="dot dot-max" />
            </div>
            <div className="browser-address-bar">
              <span className="secure-icon">🔒</span>
              <span className="address-text">https://app.contentbay.tech/workspace</span>
            </div>
            <div className="browser-header-badges">
              <span className="hd-pill">4K ULTRA HD</span>
            </div>
          </div>

          {/* Active UI Screen Visual */}
          <div className="screen-image-viewport">
            <Image
              src={currentStep.imgSrc}
              alt={currentStep.alt}
              width={1600}
              height={900}
              priority
              quality={100}
              className="current-screen-img"
            />

            {/* Subtle Interaction Cursor */}
            {currentStep.cursorPos && (
              <div
                className="animated-cursor"
                style={{
                  left: `${currentStep.cursorPos.x + Math.sin(stepProgress * Math.PI * 2) * 2}%`,
                  top: `${currentStep.cursorPos.y + Math.cos(stepProgress * Math.PI * 2) * 1.5}%`,
                  opacity: stepProgress > 0.1 && stepProgress < 0.9 ? 1 : 0
                }}
              >
                <MousePointer size={22} className="cursor-icon" />
                <span className="cursor-ripple" />
              </div>
            )}

            {/* Subtle Component Highlight Overlay */}
            {currentStep.highlightTarget && stepProgress > 0.2 && stepProgress < 0.85 && (
              <div
                className="component-spotlight-box"
                style={{
                  left: `${currentStep.highlightTarget.x}%`,
                  top: `${currentStep.highlightTarget.y}%`,
                  width: `${currentStep.highlightTarget.width}%`,
                  height: `${currentStep.highlightTarget.height}%`
                }}
              >
                <span className="spotlight-tag">{currentStep.highlightTarget.label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Video Overlay Watermark & Scene Title Badge */}
        <div className="viewport-overlay-info">
          <div className="scene-badge-pill">
            <Sparkles size={13} />
            <span>{currentStep.badge}</span>
          </div>
          <h2 className="overlay-scene-title">{currentStep.title}</h2>
          <p className="overlay-scene-sub">{currentStep.subtitle}</p>
        </div>
      </div>

      {/* ── Video Player Navigation & Controls Bar ── */}
      <div className="video-player-controls-panel">
        {/* Timeline Scrubber Progress Bar */}
        <div className="timeline-scrubber-track">
          {STEPS.map((step, idx) => {
            let fillPercent = 0
            if (idx < currentStepIdx) fillPercent = 100
            else if (idx === currentStepIdx) fillPercent = stepProgress * 100
            return (
              <button
                key={step.id}
                className={`timeline-segment ${idx === currentStepIdx ? 'active-segment' : ''}`}
                onClick={() => handleStepSelect(idx)}
                title={`Jump to ${step.title}`}
                style={{ flex: step.duration }}
              >
                <div className="segment-fill" style={{ width: `${fillPercent}%` }} />
              </button>
            )
          })}
        </div>

        {/* Action Controls Row */}
        <div className="controls-action-row">
          <div className="left-controls">
            <button
              className="ctrl-btn main-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              className="ctrl-btn"
              onClick={handleRestart}
              aria-label="Restart video"
              title="Restart Showcase"
            >
              <RotateCcw size={16} />
            </button>

            <span className="time-display font-geist-mono">
              {formatTime(getElapsedSeconds())} / {formatTime(totalDuration)}
            </span>
          </div>

          {/* Scene Selector Buttons */}
          <div className="center-scene-selector">
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                className={`scene-select-btn ${idx === currentStepIdx ? 'is-selected' : ''}`}
                onClick={() => handleStepSelect(idx)}
              >
                {step.id === 'hero' ? '01. Landing' : step.id === 'hero-zoom' ? '02. Zoom' : step.id === 'workspace' ? '03. Workspace' : '04. Schema'}
              </button>
            ))}
          </div>

          <div className="right-controls">
            <button
              className="speed-toggle-btn"
              onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
              title="Change Speed"
            >
              {playbackSpeed}x SPEED
            </button>

            <button
              className="ctrl-btn"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
