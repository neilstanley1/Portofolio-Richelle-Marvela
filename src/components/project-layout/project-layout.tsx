'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, GitBranch, ExternalLink } from 'lucide-react'
import { type PortfolioProject, projects } from '@/src/data/portfolio'

/* ─────────────────────────────────────────────────────────────
   1. PROJECT CONTAINER
───────────────────────────────────────────────────────────── */
export interface ProjectContainerProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export function ProjectContainer({ children, className = '', style }: ProjectContainerProps) {
  return (
    <div className={`project-container ${className}`} style={style}>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   2. STANDARDIZED "← BACK TO PROJECTS" BUTTON
───────────────────────────────────────────────────────────── */
export interface ProjectBackButtonProps {
  href?: string
  label?: string
  className?: string
}

export function ProjectBackButton({
  href = '/showcase/projects',
  label = 'BACK TO PROJECTS',
  className = '',
}: ProjectBackButtonProps) {
  return (
    <div className={`project-nav-bar ${className}`}>
      <Link href={href} className="project-back-btn">
        <ArrowLeft size={16} />
        <span>{label}</span>
      </Link>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   3. STANDARDIZED RECRUITER-FIRST METADATA GRID
───────────────────────────────────────────────────────────── */
export interface ProjectMetaItemData {
  label: string
  value: ReactNode
}

export function ProjectMetaGrid({ items, className = '' }: { items: ProjectMetaItemData[]; className?: string }) {
  return (
    <div className={`project-meta-grid ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="project-meta-item">
          <span className="project-meta-label">{item.label}</span>
          <strong className="project-meta-val">{item.value}</strong>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   4. STANDARDIZED HERO SECTION
───────────────────────────────────────────────────────────── */
export interface ProjectHeroProps {
  kicker?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  lead?: ReactNode
  detail?: ReactNode
  meta?: ProjectMetaItemData[]
  visual?: ReactNode
  layout?: 'split' | 'single'
  className?: string
  backHref?: string
  backLabel?: string
}

export function ProjectHero({
  kicker,
  title,
  subtitle,
  lead,
  detail,
  meta,
  visual,
  layout,
  className = '',
  backHref,
  backLabel,
}: ProjectHeroProps) {
  const isSplit = layout === 'split' || (layout === undefined && Boolean(visual))

  return (
    <header className={`project-hero-section ${className}`}>
      <ProjectContainer>
        <ProjectBackButton href={backHref} label={backLabel} />

        {isSplit ? (
          <div className="project-hero-layout-split">
            <div className="project-hero-copy">
              {kicker && (
                <div className="project-kicker">
                  <span className="project-kicker-dot" />
                  {kicker}
                </div>
              )}
              <h1 className="project-hero-title">{title}</h1>
              {subtitle && <p className="project-hero-subtitle">{subtitle}</p>}
              {lead && <p className="project-hero-lead">{lead}</p>}
              {detail && <p className="project-hero-detail">{detail}</p>}
              {meta && meta.length > 0 && <ProjectMetaGrid items={meta} />}
            </div>

            {visual && <div className="project-hero-visual-slot">{visual}</div>}
          </div>
        ) : (
          <div className="project-hero-layout-single">
            {kicker && (
              <div className="project-kicker">
                <span className="project-kicker-dot" />
                {kicker}
              </div>
            )}
            <h1 className="project-hero-title">{title}</h1>
            {subtitle && <p className="project-hero-subtitle">{subtitle}</p>}
            {lead && <p className="project-hero-lead">{lead}</p>}
            {detail && <p className="project-hero-detail">{detail}</p>}
            {meta && meta.length > 0 && <ProjectMetaGrid items={meta} />}
            {visual && <div className="project-hero-visual-slot" style={{ marginTop: '2.5rem' }}>{visual}</div>}
          </div>
        )}
      </ProjectContainer>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────
   5. STANDARDIZED CONTENT SECTION
───────────────────────────────────────────────────────────── */
export interface ProjectSectionProps {
  id?: string
  tag?: string
  title?: ReactNode
  lead?: ReactNode
  split?: boolean
  center?: boolean
  alt?: boolean
  className?: string
  children?: ReactNode
}

export function ProjectSection({
  id,
  tag,
  title,
  lead,
  split = false,
  center = false,
  alt = false,
  className = '',
  children,
}: ProjectSectionProps) {
  return (
    <section id={id} className={`project-section ${alt ? 'project-section-alt' : ''} ${className}`}>
      <ProjectContainer>
        {split && (tag || title || lead) ? (
          <div className="project-split-intro">
            <div>
              {tag && <span className="project-tag">{tag}</span>}
              {title && <h2>{title}</h2>}
            </div>
            {lead && <div><p>{lead}</p></div>}
          </div>
        ) : (tag || title || lead) ? (
          <div className={`project-section-heading ${center ? 'center' : ''}`}>
            {tag && <span className="project-tag">{tag}</span>}
            {title && <h2>{title}</h2>}
            {lead && <p className="project-section-lead">{lead}</p>}
          </div>
        ) : null}

        {children}
      </ProjectContainer>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   6. STANDARDIZED CONTENT CARD
───────────────────────────────────────────────────────────── */
export interface ProjectCardProps {
  badge?: ReactNode
  title?: ReactNode
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

export function ProjectCard({ badge, title, children, className = '', style }: ProjectCardProps) {
  return (
    <div className={`project-card ${className}`} style={style}>
      {badge && <span className="project-card-badge">{badge}</span>}
      {title && <h3>{title}</h3>}
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   7. STANDARDIZED GITHUB / REPOSITORY CTA CARD
───────────────────────────────────────────────────────────── */
export interface ProjectGithubCTAProps {
  githubUrl?: string
  demoUrl?: string
  figmaUrl?: string
  title?: string
  description?: string
  icon?: ReactNode
  buttonLabel?: string
  className?: string
}

export function ProjectGithubCTA({
  githubUrl,
  demoUrl,
  figmaUrl,
  title = 'Explore the project repository',
  description = 'View the source code, implementation, and documentation.',
  icon,
  buttonLabel = 'VIEW ON GITHUB',
  className = '',
}: ProjectGithubCTAProps) {
  const primaryUrl = githubUrl || demoUrl || figmaUrl
  if (!primaryUrl) return null

  return (
    <section className={`project-github-section ${className}`}>
      <ProjectContainer>
        <div className="project-github-card">
          <div className="project-github-content">
            <div className="project-github-icon">
              {icon || <GitBranch size={24} />}
            </div>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>

          <div className="project-github-actions">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="project-github-button"
              >
                {buttonLabel} <ArrowUpRight size={16} />
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="project-github-button project-github-button-alt"
              >
                LIVE DEMO <ExternalLink size={16} />
              </a>
            )}

            {figmaUrl && (
              <a
                href={figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="project-github-button"
              >
                VIEW FIGMA <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </ProjectContainer>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   8. STANDARDIZED PREVIOUS / NEXT PROJECT NAVIGATION
───────────────────────────────────────────────────────────── */
export interface ProjectNavFooterProps {
  currentId?: string
  previous?: PortfolioProject | null
  next?: PortfolioProject | null
  allProjectsUrl?: string
  className?: string
}

export function ProjectNavFooter({
  currentId,
  previous,
  next,
  allProjectsUrl = '/showcase/projects',
  className = '',
}: ProjectNavFooterProps) {
  // If previous / next were not explicitly passed, compute them from currentId
  let prevProj = previous
  let nextProj = next

  if (currentId && (!prevProj || !nextProj)) {
    const idx = projects.findIndex(
      (p) => p.id === currentId || (currentId === 'aquamuse' && p.id === 'summarization')
    )
    if (idx !== -1) {
      if (prevProj === undefined) {
        prevProj = projects[(idx - 1 + projects.length) % projects.length]
      }
      if (nextProj === undefined) {
        nextProj = projects[(idx + 1) % projects.length]
      }
    }
  }

  return (
    <nav className={`project-nav-footer ${className}`} aria-label="Project case study navigation">
      <ProjectContainer>
        <div className="project-nav-grid">
          {/* Previous Project */}
          {prevProj ? (
            <Link href={`/projects/${prevProj.id}`} className="project-nav-card prev">
              <span className="project-nav-eyebrow">
                <ArrowLeft size={12} /> PREVIOUS PROJECT
              </span>
              <strong className="project-nav-title">{prevProj.title}</strong>
            </Link>
          ) : (
            <div className="project-nav-card prev project-nav-empty" aria-hidden="true" />
          )}

          {/* All Projects Center Pill */}
          <Link href={allProjectsUrl} className="project-nav-all-btn">
            ALL PROJECTS
          </Link>

          {/* Next Project */}
          {nextProj ? (
            <Link href={`/projects/${nextProj.id}`} className="project-nav-card next">
              <span className="project-nav-eyebrow">
                NEXT PROJECT <ArrowUpRight size={12} />
              </span>
              <strong className="project-nav-title">{nextProj.title}</strong>
            </Link>
          ) : (
            <div className="project-nav-card next project-nav-empty" aria-hidden="true" />
          )}
        </div>
      </ProjectContainer>
    </nav>
  )
}
