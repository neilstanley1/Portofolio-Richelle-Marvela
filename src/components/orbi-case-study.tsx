'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  GitBranch,
  Mic,
  ScanLine,
  MapPin,
  Eye,
} from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

function useReveal() {
  const r = useRef<HTMLElement>(null)
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            o.unobserve(e.target)
          }
        })
      },
      { threshold: 0.06 }
    )
    r.current?.querySelectorAll('.reveal').forEach((x) => o.observe(x))
    return () => o.disconnect()
  }, [])
  return r
}

const tech = [
  ['AI / COMPUTER VISION', 'YOLOv8 · Roboflow · OpenCV · EasyOCR'],
  ['SPEECH', 'Speech Recognition · pyttsx3'],
  ['WEB / DEVELOPMENT', 'Python · Frontend · Backend · Google Maps'],
]

function Meta({ l, v }: { l: string; v: string }) {
  return (
    <div className="aquamuse-meta-item">
      <span className="meta-label">{l}</span>
      <strong className="meta-val">{v}</strong>
    </div>
  )
}

export function OrbiCaseStudyPage({ project }: { project: PortfolioProject }) {
  const ref = useReveal()
  const i = projects.findIndex((x) => x.id === 'orbi')
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <main
      className="project-page-root case-study case-aquamuse orbi-case"
      ref={ref}
      style={
        {
          '--project-accent': '#3b82f6',
          '--project-accent-rgb': '59, 130, 246',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(59, 130, 246, 0.03)',
          '--project-card-border': 'rgba(59, 130, 246, 0.15)',
        } as React.CSSProperties
      }
    >
      <header className="aquamuse-hero-section">
        <div className="aquamuse-container">
          <ProjectBackButton />

          <div className="orbi-hero">
            <div>
              <div className="aquamuse-kicker reveal">
                <span className="aquamuse-kicker-dot" />
                AI · ACCESSIBILITY · COMPUTER VISION
              </div>
              <h1 className="aquamuse-hero-title reveal">ORBI</h1>
              <p className="orbi-sub reveal">ASSISTIVE AI FOR THE VISUALLY IMPAIRED</p>
              <p className="aquamuse-hero-lead reveal">
                An AI-powered assistive platform that helps visually impaired users understand
                their surroundings through voice-controlled computer vision.
              </p>
              <div className="aquamuse-meta-grid reveal">
                <Meta l="ROLE" v="Solo Full-Stack & AI Developer" />
                <Meta l="RESPONSIBILITIES" v="UI/UX · YOLOv8 · OCR · Voice Assistant" />
                <Meta l="TECH STACK" v="Python · Flask · YOLOv8 · EasyOCR · Speech" />
                <Meta l="OUTPUT" v="Live Voice · Audio Feedback · Map" />
              </div>
            </div>
            <div className="orbi-brand reveal">
              <Image
                src="/projects/orbi/brand.png"
                alt="Orbi assistive AI brand"
                fill
                priority
                sizes="(max-width:800px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-grid-2col">
            <div>
              <span className="aquamuse-tag reveal">01 / PRODUCT SHOWCASE</span>
              <h2 className="reveal">An interface designed for hands-free awareness.</h2>
            </div>
            <p className="reveal">
              The live dashboard brings detection, text reading, device preferences, timestamped
              activity, and location into one accessible product flow.
            </p>
          </div>
          <figure className="orbi-dashboard reveal">
            <Image
              src="/projects/orbi/dashboard.png"
              alt="Orbi dashboard with live detection feed and location map"
              width={1664}
              height={822}
            />
            <figcaption>ORBI DASHBOARD · LIVE DETECTION, VOICE ACTIONS & LOCATION</figcaption>
          </figure>
        </div>
      </section>

      <section className="aquamuse-section aquamuse-section-darker">
        <div className="aquamuse-container">
          <div className="orbi-role reveal">
            <span>MY ROLE</span>
            <h2>PRIMARY / SOLO DEVELOPER</h2>
            <div>
              {[
                'FULL-STACK DEVELOPMENT',
                'UI/UX DESIGN',
                'PRODUCT IDEATION',
                'AI INTEGRATION',
                'COMPUTER VISION',
                'SYSTEM WORKFLOW',
              ].map((x) => (
                <b key={x}>{x}</b>
              ))}
            </div>
            <p>
              I handled product ideation, user flow, UI/UX, frontend and backend implementation,
              computer-vision integration, AI features, and feature planning.
            </p>
          </div>
        </div>
      </section>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">03 / CORE CAPABILITIES</span>
            <h2 className="reveal">Designed around independent interaction.</h2>
          </div>
          <div className="orbi-features">
            {[
              {
                icon: Mic,
                title: 'VOICE INTERACTION',
                copy: '“Hello Orbi” activates the assistant, recognizes commands, processes the request, and speaks results back.',
              },
              {
                icon: Eye,
                title: 'OBJECT DETECTION',
                copy: 'OpenCV captures frames while YOLOv8 identifies objects and estimates distance, such as Apple · 30 cm.',
              },
              {
                icon: ScanLine,
                title: 'TEXT RECOGNITION / OCR',
                copy: 'EasyOCR scans captured text, cleans recognition output, and forwards it to text-to-speech.',
              },
              {
                icon: MapPin,
                title: 'LOCATION & TIMESTAMPS',
                copy: 'Location is shown on a map while activity timestamps provide useful context for navigation and tracking.',
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article className="reveal" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aquamuse-section aquamuse-section-darker">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">04 / VOICE-TO-VISION FLOW</span>
            <h2 className="reveal">A simple flow for a complex task.</h2>
          </div>
          <div className="orbi-flow reveal">
            {['VOICE INPUT', 'ORBI ACTIVATED', 'COMMAND RECOGNITION', 'AI PROCESSING', 'VOICE OUTPUT'].map(
              (x, index) => (
                <div key={x}>
                  <b>0{index + 1}</b>
                  <strong>{x}</strong>
                </div>
              )
            )}
          </div>
          <div className="orbi-architecture reveal">
            <span>USER</span>
            <i>↓</i>
            <span>VOICE / CAMERA INPUT</span>
            <i>↓</i>
            <span>FRONTEND + BACKEND</span>
            <i>↓</i>
            <span className="accent">YOLOv8 · EasyOCR · OpenCV · SPEECH</span>
            <i>↓</i>
            <span>TEXT / VOICE / MAP OUTPUT</span>
          </div>
        </div>
      </section>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">05 / TECH STACK</span>
            <h2 className="reveal">Technology for accessible perception.</h2>
          </div>
          <div className="orbi-tech reveal">
            {tech.map(([h, v]) => (
              <div key={h}>
                <span>{h}</span>
                <p>{v}</p>
              </div>
            ))}
          </div>
          <div className="orbi-roadmap reveal">
            <span>FUTURE WORK / 01</span>
            <h3>NEO-6M GPS MODULE</h3>
            <p>
              A dedicated GPS module can support more accurate location tracking and navigation in
              future iterations.
            </p>
          </div>
        </div>
      </section>

      {project.github && (
        <ProjectGithubCTA
          githubUrl={project.github}
          title="Explore the Orbi Assistive AI Repository"
          description="View the implementation behind Orbi’s voice-controlled computer vision, assistive OCR, and navigation assistant."
          buttonLabel="GITHUB REPOSITORY"
        />
      )}

      <ProjectNavFooter currentId="orbi" previous={prev} next={next} />
    </main>
  )
}
