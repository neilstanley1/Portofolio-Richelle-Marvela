'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Database, GitBranch, Layers3, Map, Route } from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

function useReveal() {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.05 }
    )
    root.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

const Meta = ({ label, value }: { label: string; value: string }) => (
  <div className="aquamuse-meta-item">
    <span className="meta-label">{label}</span>
    <strong className="meta-val">{value}</strong>
  </div>
)

const GisImage = ({ waterways = false }: { waterways?: boolean }) => (
  <img
    src={waterways ? '/projects/gis/waterway-map.png' : '/projects/gis/flood-risk-map.png'}
    alt={
      waterways
        ? 'Jakarta waterway route map from the GIS project'
        : 'Jakarta flood-risk dashboard map from the GIS project'
    }
  />
)

export function FloodCaseStudyPage({ project }: { project: PortfolioProject }) {
  const mainRef = useReveal()
  const index = projects.findIndex((item) => item.id === 'flood')
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <main
      className="project-page-root case-study case-aquamuse flood-aquamuse"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#06b6d4',
          '--project-accent-rgb': '6, 182, 212',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(6, 182, 212, 0.03)',
          '--project-card-border': 'rgba(6, 182, 212, 0.15)',
        } as React.CSSProperties
      }
    >
      <header className="aquamuse-hero-section">
        <div className="aquamuse-container">
          <ProjectBackButton />

          <div className="aquamuse-hero-content">
            <div className="aquamuse-kicker reveal">
              <span className="aquamuse-kicker-dot" />
              GIS · DATA ANALYSIS · SYSTEM ANALYSIS
            </div>
            <h1 className="aquamuse-hero-title reveal">GIS Banjir Jakarta</h1>
            <p className="aquamuse-hero-subtitle reveal">
              Web GIS for Flood Risk Mapping and Geographic Data Integration
            </p>
            <p className="aquamuse-hero-lead reveal">
              A team Web GIS project integrating flood-risk, waterway, population, and weather-related
              geographic data to provide a centralized view of Jakarta&apos;s flood vulnerability.
            </p>

            <div className="aquamuse-meta-grid reveal">
              <Meta label="ROLE" value="System Analyst & GIS Data Lead" />
              <Meta
                label="RESPONSIBILITIES"
                value="ArcGIS Data Filtering · GeoJSON Preparation · Layer Config"
              />
              <Meta label="TECH STACK" value="ArcGIS · GeoJSON · HOTOSM · BMKG Data" />
              <Meta label="PROJECT SCOPE" value="Team Web GIS Project · Jakarta Flooding" />
            </div>
          </div>

          <div className="aquamuse-hero-visual-frame reveal">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="terminal-title">Project GIS — Peta Risiko Banjir Jakarta</span>
                <span className="terminal-status">MAP LAYER</span>
              </div>
              <div className="flood-map-image">
                <GisImage />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-grid-2col">
            <div>
              <span className="aquamuse-tag reveal">01 / PROJECT OVERVIEW</span>
              <h2 className="reveal">Bringing flood context into one map-based view.</h2>
            </div>
            <div>
              <p className="reveal">
                Jakarta is highly vulnerable to flooding due to its low-lying geography, dense river
                systems, and extreme rainfall. Relevant information is often distributed across
                independent geographic and weather sources.
              </p>
              <p className="reveal">
                The project consolidates these inputs into structured map layers so flood risk,
                waterways, population, and supporting weather information can be viewed together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="aquamuse-section aquamuse-section-darker">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">02 / DATA SOURCES &amp; APPROACH</span>
            <h2 className="reveal">From geographic data to map layers.</h2>
            <p className="aquamuse-lead-desc reveal">
              A structured data workflow prepares multiple sources for a unified ArcGIS visualization.
            </p>
          </div>
          <div className="aquamuse-grid-2col flood-cards">
            <div className="aquamuse-card reveal">
              <div className="card-badge">DATA SOURCES</div>
              <h3>Flood risk &amp; waterway data</h3>
              <p>
                Flood Risk Index polygons were acquired from an ArcGIS REST Feature Layer.
                Indonesia-wide HOTOSM / HDX waterway data was filtered specifically for Jakarta.
              </p>
            </div>
            <div className="aquamuse-card reveal">
              <div className="card-badge">PROCESSING METHOD</div>
              <h3>GeoJSON to ArcGIS layers</h3>
              <p>
                Geographic data was cleaned, organized, and prepared as GeoJSON and ArcGIS Feature
                Layers before being made available for dashboard integration.
              </p>
            </div>
          </div>
          <div className="flood-flow reveal">
            <span>DATA COLLECTION</span>
            <b>→</b>
            <span>JAKARTA FILTERING</span>
            <b>→</b>
            <span>GEOJSON PREPARATION</span>
            <b>→</b>
            <span>ARCGIS LAYERS</span>
            <b>→</b>
            <span>WEB GIS INTEGRATION</span>
          </div>
        </div>
      </section>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-grid-2col">
            <div>
              <span className="aquamuse-tag reveal">03 / TECHNICAL WORKFLOW</span>
              <h2 className="reveal">Preparing map data for the final system.</h2>
              <p className="reveal">
                ArcGIS was used as the processing and mapping environment to prepare flood-risk
                polygons, filtered waterway routes, and other geographic layers for the Web GIS
                dashboard.
              </p>
              <div className="flood-work-list reveal">
                <span>
                  <Database size={15} /> ArcGIS REST Feature Layer
                </span>
                <span>
                  <Route size={15} /> Jakarta waterway GeoJSON
                </span>
                <span>
                  <Map size={15} /> Layer preparation &amp; visualization
                </span>
                <span>
                  <Layers3 size={15} /> Dashboard-ready outputs
                </span>
              </div>
            </div>
            <div className="aquamuse-hero-visual-frame flood-small reveal">
              <div className="terminal-window">
                <div className="terminal-header">
                  <span className="terminal-title">Waterway lines &amp; points</span>
                  <span className="terminal-status">GEOJSON</span>
                </div>
                <div className="flood-map-image">
                  <GisImage waterways />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aquamuse-section aquamuse-section-darker">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">04 / MY CONTRIBUTION</span>
            <h2 className="reveal">GIS data &amp; system analysis.</h2>
            <p className="aquamuse-lead-desc reveal">
              I focused on geographic data acquisition, preparation, and ArcGIS layer work—not on
              developing the final dashboard frontend.
            </p>
          </div>
          <div className="flood-contributions reveal">
            {[
              'Geographic data collection',
              'Flood-risk map data acquisition',
              'Waterway / river data acquisition',
              'Jakarta-specific dataset filtering',
              'GeoJSON and ArcGIS preparation',
              'System analysis & integration support',
            ].map((item, i) => (
              <div className="aquamuse-card" key={item}>
                <div className="card-badge">0{i + 1}</div>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
          <div className="research-question-box reveal">
            <div className="rq-content">
              <span className="rq-label">TEAM PROJECT CONTEXT</span>
              <blockquote className="rq-quote">
                Another team member handled integration of the prepared ArcGIS outputs into the final
                Web GIS dashboard.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">05 / PROJECT VISUALS &amp; OUTCOME</span>
            <h2 className="reveal">A clearer spatial view of flood vulnerability.</h2>
            <p className="aquamuse-lead-desc reveal">
              The final Web GIS offers map-based views for weather, waterway routes, flood risk, regional
              summaries, and population data.
            </p>
          </div>
          <div className="flood-visuals reveal">
            <figure>
              <GisImage />
              <figcaption>Peta Risiko Banjir</figcaption>
            </figure>
            <figure>
              <GisImage waterways />
              <figcaption>Peta Jalur Air</figcaption>
            </figure>
          </div>
          <div className="stack-block reveal">
            <span className="stack-cat">TECHNOLOGIES</span>
            <div className="stack-badges">
              {[
                'ArcGIS',
                'GeoJSON',
                'Feature Layer',
                'HOTOSM / HDX',
                'BMKG / wilayah.id',
                'Web GIS',
              ].map((item) => (
                <span className="tech-badge" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectGithubCTA
        githubUrl={project.github}
        demoUrl={project.demo}
        title="Explore the Web GIS Project"
        description="View the GIS dataset preparation, GeoJSON layers, or team repository on GitHub."
        buttonLabel="GITHUB REPOSITORY"
      />

      <ProjectNavFooter currentId="flood" previous={previous} next={next} />

      <style jsx>{`
        .flood-map-image :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
        .flood-cards {
          margin-top: 2.5rem;
        }
        .flood-flow {
          margin-top: 2rem;
          padding: 1.35rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          border: 1px solid rgba(178, 108, 255, 0.22);
          background: rgba(178, 108, 255, 0.04);
          font: 700 0.6rem var(--font-geist-mono), monospace;
          letter-spacing: 0.08em;
          color: #d6c2ff;
        }
        .flood-flow b {
          color: var(--accent-2);
          font-size: 1rem;
        }
        .flood-small {
          margin-top: 0;
        }
        .flood-work-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.7rem;
          margin-top: 1.6rem;
        }
        .flood-work-list span {
          display: flex;
          gap: 0.55rem;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--muted);
          font-size: 0.78rem;
        }
        .flood-work-list :global(svg) {
          color: var(--accent-2);
        }
        .flood-contributions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 2.5rem;
        }
        .flood-contributions :global(.aquamuse-card) {
          padding: 1.3rem;
        }
        .flood-contributions h3 {
          font-size: 0.95rem;
          line-height: 1.4;
          margin: 0;
        }
        .flood-visuals {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          margin-top: 2.7rem;
        }
        .flood-visuals figure {
          margin: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }
        .flood-visuals :global(img) {
          display: block;
          width: 100%;
          height: auto;
        }
        .flood-visuals figcaption {
          padding: 0.85rem 1rem;
          font: 700 0.64rem var(--font-geist-mono), monospace;
          letter-spacing: 0.08em;
          color: var(--muted);
        }
        .stack-block {
          margin-top: 3rem;
        }
        .flood-cta-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .flood-demo-btn {
          background: transparent;
          color: var(--foreground) !important;
          border: 1px solid rgba(178, 108, 255, 0.45);
          box-shadow: none;
        }
        @media (max-width: 768px) {
          .flood-contributions,
          .flood-visuals {
            grid-template-columns: 1fr;
          }
          .flood-work-list {
            grid-template-columns: 1fr;
          }
          .flood-flow {
            justify-content: flex-start;
          }
        }
      `}</style>
    </main>
  )
}
