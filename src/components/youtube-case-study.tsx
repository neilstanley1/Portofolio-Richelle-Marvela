'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, GitBranch, Play } from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

const personas = [
  ['01', 'ETIKA & PERAN MANUSIA', '37.18%', 'manusia · kerja · buat'],
  ['02', 'OPTIMIS TERHADAP AI', '38.65%', 'gen · aku · anak'],
  ['03', 'KOMENTAR TERHADAP NARASUMBER', '24.17%', 'indonesia · prof · stella'],
]
const steps = [
  'COMMENT COLLECTION',
  'PREPROCESSING',
  'FEATURE EXTRACTION',
  'TOPIC MODELING',
  'CLUSTERING',
  'PERSONA IDENTIFICATION',
  'VISUALIZATION',
]

function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.06 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((x) => observer.observe(x))
    return () => observer.disconnect()
  }, [])
  return ref
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="aquamuse-meta-item">
      <span className="meta-label">{label}</span>
      <strong className="meta-val">{value}</strong>
    </div>
  )
}

export function YouTubeCaseStudyPage({ project }: { project: PortfolioProject }) {
  const ref = useReveal()
  const index = projects.findIndex((x) => x.id === 'youtube')
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <main
      className="project-page-root case-study case-aquamuse youtube-case"
      ref={ref}
      style={
        {
          '--project-accent': '#df8d31',
          '--project-accent-rgb': '223, 141, 49',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(223, 141, 49, 0.03)',
          '--project-card-border': 'rgba(223, 141, 49, 0.15)',
        } as React.CSSProperties
      }
    >
      <header className="aquamuse-hero-section">
        <div className="aquamuse-container">
          <ProjectBackButton />

          <div className="aquamuse-hero-content">
            <div className="aquamuse-kicker reveal">
              <span className="aquamuse-kicker-dot" />
              DATA ANALYSIS · NLP · TOPIC MODELING
            </div>
            <h1 className="aquamuse-hero-title reveal">
              YouTube AI
              <br />
              Education Analysis
            </h1>
            <p className="aquamuse-hero-subtitle reveal">
              Mapping Indonesian public discussion, topics, and personas around AI in education.
            </p>
            <p className="aquamuse-hero-lead reveal">
              An NLP analysis of 4,281 YouTube comments from five videos, combining text
              preprocessing, feature extraction, topic modeling, and clustering to surface
              meaningful discussion patterns.
            </p>
            <div className="aquamuse-meta-grid reveal">
              <Meta label="ROLE" value="Data Analyst · NLP Researcher" />
              <Meta
                label="RESPONSIBILITIES"
                value="Data Pipeline · Topic Modeling · Persona Clustering"
              />
              <Meta label="TECH STACK" value="Python · BERTopic · LDA · KMeans · NLTK" />
              <Meta label="DATASET & CORPUS" value="4,281 Comments · 5 YouTube Videos" />
            </div>
          </div>

          <div className="aquamuse-hero-visual-frame reveal">
            <div className="yt-visual">
              <div className="yt-vhead">
                <span>
                  <Play size={14} /> COMMENT SEMANTIC SPACE
                </span>
                <small>4,281 signals mapped</small>
              </div>
              <div className="yt-space">
                <i />
                <i />
                <i />
                {[
                  'manusia',
                  'teknologi',
                  'anak',
                  'generasi',
                  'prof',
                  'indonesia',
                  'belajar',
                  'kerja',
                  'AI',
                ].map((x, i) => (
                  <b className={`w${i}`} key={x}>
                    {x}
                  </b>
                ))}
              </div>
              <div className="yt-legend">
                <span>● Human roles</span>
                <span>● AI optimism</span>
                <span>● Speaker response</span>
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
              <h2 className="reveal">Listening to a public conversation about AI and education.</h2>
            </div>
            <div>
              <p className="reveal">
                This project turns unstructured Indonesian YouTube comments into a readable map of
                attitudes, themes, and audience personas around AI in education.
              </p>
              <p className="reveal">
                Topic modeling and clustering distinguish discussions about human roles, optimism,
                and responses to speakers.
              </p>
            </div>
          </div>
          <div className="yt-metrics reveal">
            {[
              ['4,281', 'COMMENTS ANALYZED'],
              ['5', 'YOUTUBE VIDEOS'],
              ['3', 'TOPICS / PERSONAS'],
            ].map(([n, l]) => (
              <div key={l}>
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aquamuse-section aquamuse-section-darker">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">02 / DISCUSSION PERSONAS</span>
            <h2 className="reveal">Three recurring conversation patterns.</h2>
          </div>
          <div className="yt-personas">
            {personas.map(([n, title, pct, words]) => (
              <article className="reveal" key={title}>
                <span>{n}</span>
                <h3>{title}</h3>
                <strong>{pct}</strong>
                <b>{words}</b>
                <p>
                  Distinct discussion pattern identified through comment clustering and topic
                  interpretation.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">03 / ANALYSIS ARTIFACTS</span>
            <h2 className="reveal">From language signals to cluster structure.</h2>
          </div>
          <div className="yt-artifacts reveal">
            <figure className="yt-wordcloud-image">
              <figcaption>WORD FREQUENCY / POST-PROCESSING</figcaption>
              <Image
                src="/projects/youtube-wordcloud.png"
                alt="Word cloud of Indonesian YouTube comments after preprocessing"
                width={1600}
                height={724}
                className="yt-wordcloud-img"
              />
            </figure>
            <div className="yt-bars">
              <small>CLUSTER DISTRIBUTION · K=10</small>
              <div>
                {[16, 31, 33, 49, 22, 100, 28, 40, 32, 25].map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <p>
                Cluster structure reveals a large volume of general video responses alongside more
                specific discussion themes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="aquamuse-section aquamuse-section-darker">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">04 / METHODOLOGY</span>
            <h2 className="reveal">A reproducible discussion-analysis pipeline.</h2>
          </div>
          <div className="yt-pipeline reveal">
            {steps.map((x, i) => (
              <div key={x}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <strong>{x}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aquamuse-section">
        <div className="aquamuse-container">
          <div className="aquamuse-header-center">
            <span className="aquamuse-tag reveal">05 / KEY INSIGHTS</span>
            <h2 className="reveal">What the discussion reveals.</h2>
          </div>
          <div className="yt-insights reveal">
            {[
              [
                'Human roles stay central',
                'Many comments frame AI through human judgement, responsibility, teaching, and work.',
              ],
              [
                'Optimism is practical',
                'Positive discussion often treats AI as a useful aid for learning and productivity.',
              ],
              [
                'Context shapes discussion',
                'Responses to speakers form a distinct pattern alongside the AI topic itself.',
              ],
            ].map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="yt-stack reveal">
            {[
              'Python',
              'Pandas',
              'NumPy',
              'NLTK',
              'TF-IDF',
              'Sentence Transformers',
              'LDA',
              'BERTopic',
              'UMAP',
              'HDBSCAN',
              'KMeans',
              'DBSCAN',
              'Matplotlib',
              'Seaborn',
              'WordCloud',
              'pyLDAvis',
            ].map((x) => (
              <b key={x}>{x}</b>
            ))}
          </div>
        </div>
      </section>

      {project.github && (
        <ProjectGithubCTA
          githubUrl={project.github}
          title="Explore the YouTube Analysis Repository"
          description="View the comment analysis, clustering pipeline, persona identification, and visualization workflow."
          buttonLabel="GITHUB REPOSITORY"
        />
      )}

      <ProjectNavFooter currentId="youtube" previous={previous} next={next} />
    </main>
  )
}
