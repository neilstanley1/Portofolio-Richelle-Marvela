'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, GitBranch, ExternalLink } from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import { ProjectGallery } from '@/src/components/project-gallery'
import { ProjectPipeline } from '@/src/components/showcase'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

function kind(project: PortfolioProject) {
  const text = `${project.primaryCategory} ${project.categories.join(' ')}`.toLowerCase()
  if (text.includes('ui/ux')) return 'design'
  if (text.includes('gis')) return 'gis'
  if (text.includes('cloud')) return 'cloud'
  if (text.includes('data')) return 'data'
  if (text.includes('nlp')) return 'nlp'
  if (text.includes('ai') || text.includes('ml')) return 'ai'
  return 'software'
}

const stackFor = (project: PortfolioProject) =>
  project.stack || [{ label: 'TECH STACK', items: project.technologies }]

export function ProjectDetailPage({ project }: { project: PortfolioProject }) {
  const type = kind(project)
  const index = projects.findIndex((item) => item.id === project.id)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  const pipeline =
    type === 'design'
      ? ['PROBLEM', 'USER FLOW', 'WIREFRAMES', 'FINAL UI', 'PROTOTYPE']
      : type === 'nlp'
        ? ['COLLECT', 'CLEAN', 'EMBED', 'MODEL', 'EVALUATE']
        : type === 'ai'
          ? ['DATASET', 'PREPROCESS', 'MODEL', 'EXPERIMENTS', 'RESULTS']
          : type === 'gis'
            ? ['DATA SOURCES', 'MAP LAYERS', 'PROCESS', 'DASHBOARD']
            : type === 'cloud'
              ? ['INGESTION', 'PROCESSING', 'STORAGE', 'ANALYTICS']
              : ['USER', 'FRONTEND', 'BACKEND', 'DATA', 'DEPLOYMENT']

  return (
    <main className={`project-page-root case-study case-${type}`}>
      <section className="case-hero">
        <ProjectBackButton />
        <p className="eyebrow accent">CASE STUDY / {type.toUpperCase()}</p>
        <h1>{project.title}</h1>
        <p className="case-lede">{project.description}</p>
        <div className="case-meta">
          <span>
            <b>ROLE</b>
            {project.role}
          </span>
          <span>
            <b>YEAR</b>
            {project.year || 'CASE STUDY'}
          </span>
          <span>
            <b>CATEGORY</b>
            {project.primaryCategory}
          </span>
        </div>
      </section>

      <section className="case-visual">
        <ProjectGallery project={project} />
      </section>

      <section className="case-intro">
        <div>
          <p className="eyebrow accent">
            01 /{' '}
            {type === 'design'
              ? 'PROJECT OVERVIEW'
              : type === 'ai' || type === 'nlp'
                ? 'TECHNICAL OBJECTIVE'
                : 'PROJECT OVERVIEW'}
          </p>
          <h2>
            {type === 'design' ? (
              <>
                Designing the
                <br />
                <em>experience.</em>
              </>
            ) : type === 'ai' || type === 'nlp' ? (
              <>
                From data to
                <br />
                <em>evidence.</em>
              </>
            ) : (
              <>
                Turning a problem
                <br />
                <em>into a system.</em>
              </>
            )}
          </h2>
        </div>
        <div className="case-copy">
          <p>{project.description}</p>
          {project.details?.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
          <div className="contribution">
            <b>MY CONTRIBUTION</b>
            <p>
              {project.contribution?.join(' ') || project.role}. I translated requirements into an
              executable workflow, collaborated across the relevant disciplines, and focused on making
              the final result useful, testable, and clear.
            </p>
          </div>
        </div>
      </section>

      <section className="case-pipeline">
        <p className="eyebrow accent">
          02 /{' '}
          {type === 'design'
            ? 'DESIGN PROCESS'
            : type === 'ai' || type === 'nlp'
              ? 'MODEL / DATA PIPELINE'
              : 'SYSTEM FLOW'}
        </p>
        <ProjectPipeline items={pipeline} />
      </section>

      <section className="case-sections">
        <article>
          <p className="eyebrow accent">
            03 /{' '}
            {type === 'design'
              ? 'WIREFRAMES & FINAL DESIGN'
              : type === 'ai' || type === 'nlp'
                ? 'EXPERIMENTS & EVALUATION'
                : 'IMPLEMENTATION & FEATURES'}
          </p>
          <h2>
            {type === 'design'
              ? 'Make the invisible visible.'
              : type === 'ai' || type === 'nlp'
                ? 'Compare, measure, improve.'
                : 'The work behind the interface.'}
          </h2>
          <p>
            Use this space to document the strongest proof of the project: interface screens, model
            comparisons, system diagrams, maps, dashboards, or feature walkthroughs. Keep the visual
            evidence prominent and the explanation concise.
          </p>
        </article>
        <article>
          <p className="eyebrow accent">04 / {type === 'design' ? 'DESIGN SYSTEM' : 'TECHNICAL DETAILS'}</p>
          {stackFor(project).map((group) => (
            <div className="stack-group" key={group.label}>
              <b>{group.label}</b>
              <div>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </article>
      </section>

      <ProjectGithubCTA
        githubUrl={project.github}
        demoUrl={project.demo}
        figmaUrl={project.figma}
        title={`Explore the ${project.title} Repository`}
        description={project.description}
      />

      <ProjectNavFooter currentId={project.id} previous={previous} next={next} />
    </main>
  )
}
