// src/components/dgwo-case-study.tsx
'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  GitBranch,
  CheckCircle2,
  Activity,
  Cpu,
  Network,
  Route,
  Layers,
  Target,
  Zap,
  AlertTriangle,
  BarChart3,
  ChevronRight,
} from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.querySelectorAll('.reveal').forEach((r) => r.classList.add('revealed'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const delay = target.dataset.delay || '0'
            setTimeout(() => target.classList.add('revealed'), parseInt(delay))
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    const els = el.querySelectorAll('.reveal')
    els.forEach((r) => observer.observe(r))
    const t = setTimeout(() => {
      els.forEach((r) => {
        const rect = r.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          const delay = (r as HTMLElement).dataset.delay || '0'
          setTimeout(() => r.classList.add('revealed'), parseInt(delay))
        }
      })
    }, 50)
    return () => { clearTimeout(t); observer.disconnect() }
  }, [])
  return ref
}

/* ─────────────────────────────────────────────
   ROUTING NETWORK SVG VISUALIZATION
───────────────────────────────────────────── */
const ROUTE_COLORS = ['#b26cff', '#6d7cff', '#44cf7c', '#ff6d8a', '#ffa040']

const NODES = [
  { x: 50, y: 50, type: 'depot', r: 10, label: 'D' },
  { x: 180, y: 80, type: 'priority', r: 6 },
  { x: 290, y: 55, type: 'normal', r: 5 },
  { x: 370, y: 100, type: 'flood', r: 6 },
  { x: 420, y: 40, type: 'normal', r: 4 },
  { x: 140, y: 175, type: 'normal', r: 5 },
  { x: 230, y: 150, type: 'priority', r: 6 },
  { x: 315, y: 170, type: 'normal', r: 4 },
  { x: 390, y: 185, type: 'flood', r: 5 },
  { x: 80, y: 240, type: 'priority', r: 6 },
  { x: 175, y: 255, type: 'normal', r: 4 },
  { x: 260, y: 235, type: 'normal', r: 5 },
  { x: 340, y: 260, type: 'flood', r: 5 },
  { x: 430, y: 250, type: 'normal', r: 4 },
  { x: 110, y: 320, type: 'normal', r: 4 },
  { x: 210, y: 330, type: 'priority', r: 6 },
  { x: 300, y: 310, type: 'normal', r: 5 },
  { x: 390, y: 330, type: 'normal', r: 4 },
]

const ROUTES = [
  { color: ROUTE_COLORS[0], nodes: [0, 1, 2, 3, 4, 0] },
  { color: ROUTE_COLORS[1], nodes: [0, 5, 6, 7, 8, 0] },
  { color: ROUTE_COLORS[2], nodes: [0, 9, 10, 11, 12, 13, 0] },
  { color: ROUTE_COLORS[3], nodes: [0, 14, 15, 16, 17, 0] },
]

function RoutingNetworkSVG() {
  return (
    <svg
      viewBox="0 0 480 380"
      className="dgwo-routing-svg"
      aria-label="Optimization routing network visualization"
    >
      {/* Grid pattern background */}
      <defs>
        <pattern id="dgwogrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(109,124,255,0.07)" strokeWidth="0.5" />
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {ROUTE_COLORS.map((c, i) => (
          <linearGradient key={i} id={`rg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c} stopOpacity="0.15" />
            <stop offset="50%" stopColor={c} stopOpacity="0.55" />
            <stop offset="100%" stopColor={c} stopOpacity="0.15" />
          </linearGradient>
        ))}
      </defs>

      <rect width="480" height="380" fill="url(#dgwogrid)" />

      {/* Route lines */}
      {ROUTES.map((route, ri) =>
        route.nodes.slice(0, -1).map((nIdx, i) => {
          const a = NODES[nIdx]
          const b = NODES[route.nodes[i + 1]]
          return (
            <line
              key={`${ri}-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={route.color}
              strokeWidth="1.5"
              strokeOpacity="0.5"
              strokeDasharray="4 3"
              className={`dgwo-route-line dgwo-route-line-${ri}`}
            />
          )
        })
      )}

      {/* Nodes */}
      {NODES.map((node, i) => {
        const color =
          node.type === 'depot' ? '#6d7cff'
          : node.type === 'priority' ? '#b26cff'
          : node.type === 'flood' ? '#ff6d8a'
          : 'rgba(255,255,255,0.45)'
        const strokeColor =
          node.type === 'depot' ? '#6d7cff'
          : node.type === 'priority' ? '#b26cff'
          : node.type === 'flood' ? '#ff6d8a'
          : 'rgba(255,255,255,0.2)'

        return (
          <g key={i} className={`dgwo-node-group ${node.type === 'depot' ? 'dgwo-depot-group' : ''}`}>
            {(node.type === 'priority' || node.type === 'depot') && (
              <circle cx={node.x} cy={node.y} r={node.r + 6} fill={color} fillOpacity="0.1" className="dgwo-node-pulse-ring" />
            )}
            <circle
              cx={node.x} cy={node.y} r={node.r}
              fill={color}
              fillOpacity={node.type === 'normal' ? 0.6 : 0.9}
              stroke={strokeColor}
              strokeWidth="1"
              filter={node.type === 'depot' ? 'url(#glow-strong)' : 'url(#glow)'}
              className="dgwo-node-circle"
            />
            {node.type === 'depot' && (
              <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="monospace">D</text>
            )}
          </g>
        )
      })}

      {/* Legend */}
      {[
        { color: '#6d7cff', label: 'Depot' },
        { color: '#b26cff', label: 'Priority Node' },
        { color: '#ff6d8a', label: 'Flood Risk' },
      ].map((item, i) => (
        <g key={i}>
          <circle cx={12} cy={350 + i * 14} r={4} fill={item.color} fillOpacity="0.9" />
          <text x={20} y={354 + i * 14} fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="monospace">{item.label}</text>
        </g>
      ))}

      {/* Route labels */}
      {ROUTES.map((r, i) => (
        <g key={i}>
          <rect x={340 + (i % 2) * 65} y={345 + Math.floor(i / 2) * 14} width={8} height={3} fill={r.color} rx="1" />
          <text x={352 + (i % 2) * 65} y={350 + Math.floor(i / 2) * 14} fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace">Route {i + 1}</text>
        </g>
      ))}

      {/* Badge */}
      <rect x="340" y="8" width="132" height="20" rx="4" fill="rgba(109,124,255,0.12)" stroke="rgba(109,124,255,0.25)" strokeWidth="0.5" />
      <text x="406" y="22" textAnchor="middle" fill="rgba(109,124,255,0.9)" fontSize="7" fontFamily="monospace" fontWeight="700">ROUTE NETWORK · 80 NODES</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   ALGORITHM PIPELINE DATA
───────────────────────────────────────────── */
const ALGO_STEPS = [
  {
    num: '01',
    title: 'Initialize Population',
    sub: 'Equal-Division Random Key Encoding',
    desc: 'A population of candidate solutions is initialized using equal-division random key encoding, ensuring diverse and balanced initial route distributions across the search space.',
    icon: '⬡',
  },
  {
    num: '02',
    title: 'Encode Routes',
    sub: 'Random Key → Vehicle Assignment',
    desc: 'Each solution is represented as a real-valued random key vector, decoded into valid CVRPTW routes by assigning nodes to vehicles in a capacity-respecting order.',
    icon: '⟨⟩',
  },
  {
    num: '03',
    title: 'Evaluate Objectives',
    sub: 'Distance · Time · Risk · Priority',
    desc: 'Each candidate solution is evaluated against four objectives: adjusted travel distance, time-window penalty, flood-risk exposure, and critical-node coverage.',
    icon: '◎',
  },
  {
    num: '04',
    title: 'Pareto Archive',
    sub: 'Non-Dominated Solution Set',
    desc: 'Non-dominated solutions are preserved in a dynamic Pareto archive, ensuring the optimizer maintains diverse trade-off fronts across multiple competing objectives.',
    icon: '▸▸',
  },
  {
    num: '05',
    title: 'Grey Wolf Update',
    sub: 'Alpha · Beta · Delta Guidance',
    desc: 'The Grey Wolf hierarchy (Alpha, Beta, Delta) guides population movement through the search space, balancing global exploration with focused exploitation near top solutions.',
    icon: '△',
  },
  {
    num: '06',
    title: 'Floating 2-opt',
    sub: 'Local Search Intensification',
    desc: 'Floating 2-opt local search refines candidate routes by restructuring route segments, improving solution quality through flexible edge swaps after each global update step.',
    icon: '⇌',
  },
  {
    num: '07',
    title: 'Dynamic Update',
    sub: 'Population Refresh + Convergence',
    desc: 'The population is dynamically updated with improved solutions and stale candidates are replaced. Convergence is tracked until the termination criterion is satisfied.',
    icon: '↻',
  },
]

/* ─────────────────────────────────────────────
   FUZZY LOGIC SVG
───────────────────────────────────────────── */
function FuzzyLogicSVG() {
  return (
    <svg viewBox="0 0 440 240" className="dgwo-fuzzy-svg" aria-label="Mamdani fuzzy inference diagram">
      <defs>
        <linearGradient id="fgr1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b26cff" stopOpacity="0" />
          <stop offset="100%" stopColor="#b26cff" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="fgr2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6d7cff" stopOpacity="0" />
          <stop offset="100%" stopColor="#6d7cff" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="fgr3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff6d8a" stopOpacity="0" />
          <stop offset="100%" stopColor="#ff6d8a" stopOpacity="0.7" />
        </linearGradient>
        <filter id="fglow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Input nodes */}
      {[
        { y: 45, label: 'Victims', color: '#b26cff', sub: 'COUNT' },
        { y: 120, label: 'Damage Severity', color: '#6d7cff', sub: 'LEVEL' },
        { y: 195, label: 'Flood Risk', color: '#ff6d8a', sub: 'INDEX' },
      ].map((inp, i) => (
        <g key={i}>
          <rect x="8" y={inp.y - 22} width="100" height="42" rx="6" fill="rgba(255,255,255,0.04)" stroke={inp.color} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="58" y={inp.y - 4} textAnchor="middle" fill={inp.color} fontSize="9" fontWeight="700" fontFamily="monospace">{inp.sub}</text>
          <text x="58" y={inp.y + 10} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="8" fontFamily="sans-serif">{inp.label}</text>
          {/* Membership curve mini */}
          <polyline points={`18,${inp.y + 18} 38,${inp.y + 2} 58,${inp.y + 18} 78,${inp.y + 2} 98,${inp.y + 18}`} fill="none" stroke={inp.color} strokeWidth="1.2" strokeOpacity="0.5" />
          {/* Connector line */}
          <line x1="108" y1={inp.y} x2="168" y2="120" stroke={inp.color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
        </g>
      ))}

      {/* Central inference engine */}
      <rect x="168" y="80" width="104" height="80" rx="8" fill="rgba(109,124,255,0.08)" stroke="rgba(109,124,255,0.35)" strokeWidth="1" />
      <text x="220" y="110" textAnchor="middle" fill="#6d7cff" fontSize="8" fontWeight="800" fontFamily="monospace">MAMDANI</text>
      <text x="220" y="124" textAnchor="middle" fill="#6d7cff" fontSize="8" fontWeight="700" fontFamily="monospace">FUZZY</text>
      <text x="220" y="138" textAnchor="middle" fill="#6d7cff" fontSize="8" fontWeight="700" fontFamily="monospace">INFERENCE</text>
      {/* Inner glow */}
      <ellipse cx="220" cy="120" rx="30" ry="20" fill="rgba(109,124,255,0.06)" />

      {/* Output connector */}
      <line x1="272" y1="120" x2="330" y2="120" stroke="#44cf7c" strokeWidth="1.5" strokeOpacity="0.6" />
      <polygon points="328,116 336,120 328,124" fill="#44cf7c" fillOpacity="0.8" />

      {/* Output node */}
      <rect x="336" y="90" width="96" height="60" rx="8" fill="rgba(68,207,124,0.06)" stroke="#44cf7c" strokeWidth="0.8" strokeOpacity="0.4" />
      <text x="384" y="114" textAnchor="middle" fill="#44cf7c" fontSize="8" fontWeight="800" fontFamily="monospace">PRIORITY</text>
      <text x="384" y="128" textAnchor="middle" fill="#44cf7c" fontSize="8" fontWeight="700" fontFamily="monospace">SCORE</text>
      {/* Score gauge */}
      <rect x="350" y="136" width="68" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
      <rect x="350" y="136" width="52" height="6" rx="3" fill="#44cf7c" fillOpacity="0.7" className="dgwo-fuzzy-gauge" />

      {/* Score value */}
      <text x="384" y="154" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5" fontFamily="monospace">0.76 / HIGH</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   GREY WOLF HIERARCHY SVG
───────────────────────────────────────────── */
function GreyWolfSVG() {
  const wolves = [
    { label: 'α', name: 'ALPHA', y: 30, r: 28, desc: 'Best solution — leads search direction', color: '#b26cff' },
    { label: 'β', name: 'BETA', y: 110, r: 22, desc: 'Second-best — assists optimization', color: '#6d7cff' },
    { label: 'δ', name: 'DELTA', y: 180, r: 18, desc: 'Third-best — boundary awareness', color: '#44cf7c' },
    { label: 'ω', name: 'OMEGA', y: 240, r: 14, desc: 'General population — explores space', color: 'rgba(255,255,255,0.4)' },
  ]

  return (
    <svg viewBox="0 0 440 290" className="dgwo-wolf-svg" aria-label="Grey wolf hierarchy diagram">
      <defs>
        <filter id="wglow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Hierarchy lines */}
      {wolves.slice(0, -1).map((w, i) => (
        <line key={i} x1="80" y1={w.y + wolves[i].r} x2="80" y2={wolves[i + 1].y - wolves[i + 1].r}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 2" />
      ))}

      {/* Wolf nodes */}
      {wolves.map((w, i) => (
        <g key={i} className="dgwo-wolf-node">
          <circle cx="80" cy={w.y} r={w.r + 8} fill={w.color} fillOpacity="0.06" className="dgwo-wolf-ring" />
          <circle cx="80" cy={w.y} r={w.r} fill={w.color} fillOpacity="0.85" filter="url(#wglow)" />
          <text x="80" y={w.y + 5} textAnchor="middle" fill="white" fontSize={w.r * 0.75} fontWeight="800" fontFamily="sans-serif">{w.label}</text>

          {/* Label block */}
          <rect x="124" y={w.y - 18} width="148" height="36" rx="6" fill="rgba(255,255,255,0.03)" stroke={w.color} strokeWidth="0.6" strokeOpacity="0.3" />
          <text x="134" y={w.y - 4} fill={w.color} fontSize="8" fontWeight="800" fontFamily="monospace">{w.name}</text>
          <text x="134" y={w.y + 10} fill="rgba(255,255,255,0.55)" fontSize="7.5" fontFamily="sans-serif">{w.desc}</text>
          <line x1="108" y1={w.y} x2="124" y2={w.y} stroke={w.color} strokeWidth="0.8" strokeOpacity="0.4" />
        </g>
      ))}

      {/* Phase labels */}
      {[
        { phase: 'EXPLORATION', y: 55, color: '#6d7cff' },
        { phase: 'EXPLOITATION', y: 155, color: '#b26cff' },
        { phase: 'CONVERGENCE', y: 250, color: '#44cf7c' },
      ].map((p, i) => (
        <g key={i}>
          <rect x="300" y={p.y - 14} width="118" height="22" rx="4" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="359" y={p.y + 2} textAnchor="middle" fill={p.color} fontSize="7.5" fontWeight="700" fontFamily="monospace">{p.phase}</text>
        </g>
      ))}

      {/* Phase connector */}
      <line x1="300" y1="55" x2="300" y2="258" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <polygon points="296,258 300,268 304,258" fill="rgba(255,255,255,0.12)" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   2-OPT BEFORE/AFTER SVG
───────────────────────────────────────────── */
function TwoOptSVG({ showAfter }: { showAfter: boolean }) {
  const nodes: Record<string, [number, number]> = {
    A: [30, 100],
    B: [100, 40],
    C: [170, 130],
    D: [240, 50],
    E: [310, 110],
  }
  const before = ['A', 'B', 'C', 'D', 'E', 'A']
  const after = ['A', 'C', 'B', 'D', 'E', 'A']
  const route = showAfter ? after : before

  const pairs = route.slice(0, -1).map((n, i) => ({ from: n, to: route[i + 1] }))

  return (
    <svg viewBox="0 0 360 170" className="dgwo-twoopt-svg">
      <defs>
        <filter id="tglow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Route edges */}
      {pairs.map((pair, i) => {
        const [x1, y1] = nodes[pair.from]
        const [x2, y2] = nodes[pair.to]
        // Highlight the swapped edge
        const isSwapped = showAfter && ((pair.from === 'A' && pair.to === 'C') || (pair.from === 'C' && pair.to === 'B'))
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isSwapped ? '#44cf7c' : '#b26cff'}
            strokeWidth={isSwapped ? 2.5 : 1.5}
            strokeOpacity={isSwapped ? 0.9 : 0.55}
            strokeDasharray={!showAfter && (pair.from === 'A' && pair.to === 'B') ? '4 3' : undefined}
            filter={isSwapped ? 'url(#tglow)' : undefined}
            className={showAfter ? 'dgwo-twoopt-line-after' : ''}
          />
        )
      })}

      {/* Nodes */}
      {Object.entries(nodes).map(([name, [cx, cy]]) => (
        <g key={name}>
          <circle cx={cx} cy={cy} r="13" fill={name === 'A' ? '#6d7cff' : 'rgba(255,255,255,0.06)'} stroke={name === 'A' ? '#6d7cff' : 'rgba(255,255,255,0.2)'} strokeWidth="1" filter="url(#tglow)" />
          <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="monospace">{name}</text>
        </g>
      ))}

      {/* Route label */}
      <text x="180" y="16" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="monospace">
        {route.join(' → ')}
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   PARETO FRONT SVG
───────────────────────────────────────────── */
const PARETO_POINTS = [
  { x: 62, y: 165, dominated: false, label: 'DGWO-F2OPT', isOurs: true },
  { x: 92, y: 135, dominated: false, label: 'Solution 2' },
  { x: 130, y: 112, dominated: false, label: 'Solution 3' },
  { x: 158, y: 96, dominated: false, label: 'Solution 4' },
  { x: 195, y: 80, dominated: false, label: 'MPSO Best' },
  { x: 240, y: 68, dominated: false, label: 'Solution 6' },
  { x: 285, y: 65, dominated: false, label: 'Solution 7' },
  // Dominated (background)
  { x: 100, y: 165, dominated: true },
  { x: 145, y: 148, dominated: true },
  { x: 185, y: 130, dominated: true },
  { x: 220, y: 120, dominated: true },
  { x: 260, y: 108, dominated: true },
  { x: 310, y: 95, dominated: true },
  { x: 80, y: 190, dominated: true },
  { x: 160, y: 175, dominated: true },
  { x: 230, y: 155, dominated: true },
  { x: 280, y: 140, dominated: true },
]

function ParetoFrontSVG() {
  const [hovered, setHovered] = useState<number | null>(null)
  const nonDominated = PARETO_POINTS.filter(p => !p.dominated)
  const frontPath = nonDominated
    .sort((a, b) => a.x - b.x)
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  return (
    <svg viewBox="0 0 370 230" className="dgwo-pareto-svg" aria-label="Pareto front visualization">
      <defs>
        <linearGradient id="pfront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b26cff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6d7cff" stopOpacity="0.3" />
        </linearGradient>
        <filter id="pglow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Axes */}
      <line x1="45" y1="20" x2="45" y2="205" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="45" y1="205" x2="355" y2="205" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="200" y="222" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">DISTANCE →</text>
      <text x="20" y="115" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" transform="rotate(-90, 20, 115)">RISK →</text>

      {/* Pareto front area fill */}
      <path
        d={`${frontPath} L ${nonDominated[nonDominated.length - 1].x} 205 L ${nonDominated[0].x} 205 Z`}
        fill="url(#pfront)"
        fillOpacity="0.08"
      />
      {/* Pareto front line */}
      <path d={frontPath} fill="none" stroke="url(#pfront)" strokeWidth="2" strokeOpacity="0.7" />

      {/* Dominated points */}
      {PARETO_POINTS.filter(p => p.dominated).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      ))}

      {/* Non-dominated points */}
      {nonDominated.map((p, i) => (
        <g
          key={i}
          className="dgwo-pareto-point"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <circle cx={p.x} cy={p.y} r={hovered === i ? 11 : 7}
            fill={p.isOurs ? '#b26cff' : '#6d7cff'}
            fillOpacity={hovered === i ? 1 : 0.75}
            stroke={p.isOurs ? '#b26cff' : '#6d7cff'}
            strokeWidth={hovered === i ? 2 : 1}
            filter="url(#pglow)"
            style={{ transition: 'r 0.2s, fill-opacity 0.2s' }}
          />
          {p.isOurs && (
            <>
              <circle cx={p.x} cy={p.y} r="14" fill="#b26cff" fillOpacity="0.12" className="dgwo-pareto-pulse" />
              <text x={p.x - 6} y={p.y - 14} fill="#b26cff" fontSize="7" fontWeight="700" fontFamily="monospace">DGWO</text>
            </>
          )}
          {hovered === i && p.label && (
            <g>
              <rect x={p.x + 8} y={p.y - 20} width={p.label.length * 5.5 + 12} height="18" rx="3" fill="rgba(16,19,36,0.95)" stroke="rgba(109,124,255,0.3)" strokeWidth="0.5" />
              <text x={p.x + 14} y={p.y - 8} fill="rgba(255,255,255,0.9)" fontSize="7.5" fontFamily="monospace">{p.label}</text>
            </g>
          )}
        </g>
      ))}

      {/* Non-dominated label */}
      <rect x="250" y="22" width="98" height="18" rx="3" fill="rgba(178,108,255,0.1)" stroke="rgba(178,108,255,0.3)" strokeWidth="0.5" />
      <text x="299" y="35" textAnchor="middle" fill="#b26cff" fontSize="7" fontWeight="700" fontFamily="monospace">NON-DOMINATED FRONT</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function DgwoCaseStudyPage({ project }: { project: PortfolioProject }) {
  const index = projects.findIndex((p) => p.id === 'dgwo')
  const currentIndex = index >= 0 ? index : 0
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length]
  const next = projects[(currentIndex + 1) % projects.length]
  const mainRef = useReveal()

  const [activeStep, setActiveStep] = useState(0)
  const [showAfterOpt, setShowAfterOpt] = useState(false)

  // 2-opt animation toggle
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    const interval = setInterval(() => {
      setShowAfterOpt(prev => !prev)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <main
      className="project-page-root case-study case-dgwo"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#a855f7',
          '--project-accent-rgb': '168, 85, 247',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(168, 85, 247, 0.03)',
          '--project-card-border': 'rgba(168, 85, 247, 0.15)',
        } as React.CSSProperties
      }
    >
      {/* ── HERO — Split Layout ── */}
      <header className="dgwo-hero-section">
        <div className="dgwo-container">
          <ProjectBackButton />

          <div className="dgwo-hero-grid">
            {/* Left */}
            <div className="dgwo-hero-left">
              <div className="dgwo-kicker reveal" data-delay="0">
                <span className="dgwo-kicker-dot" />
                APPLIED AI · OPTIMIZATION · 2026
              </div>

              <h1 className="dgwo-hero-title reveal" data-delay="80">DGWO-F2OPT</h1>
              <h2 className="dgwo-hero-subtitle reveal" data-delay="150">
                Dynamic Grey Wolf Optimizer<br />with Floating 2-opt Local Search
              </h2>

              <p className="dgwo-hero-lead reveal" data-delay="220">
                A multi-objective optimization approach for humanitarian vehicle routing
                under dynamic flood disaster conditions — balancing distance, time-windows,
                flood risk, and critical-node coverage.
              </p>

              {/* Tech chips */}
              <div className="dgwo-tech-chips reveal" data-delay="290">
                {['CVRPTW', 'Metaheuristic', 'Fuzzy Logic', 'Multi-Objective', 'Python', 'CVRPLIB'].map(t => (
                  <span key={t} className="dgwo-tech-chip">{t}</span>
                ))}
              </div>

              {/* Recruiter-First Metadata Grid */}
              <div className="dgwo-meta-grid reveal" data-delay="360">
                <div className="dgwo-meta-item">
                  <span className="meta-label">ROLE</span>
                  <strong className="meta-val">Optimization &amp; Algorithm Developer</strong>
                </div>
                <div className="dgwo-meta-item">
                  <span className="meta-label">RESPONSIBILITIES</span>
                  <strong className="meta-val">DGWO Engine · Floating 2-opt · CVRPTW Benchmarks</strong>
                </div>
                <div className="dgwo-meta-item">
                  <span className="meta-label">TECH STACK</span>
                  <strong className="meta-val">Python · PyTorch · NumPy · SciPy · CVRPLIB</strong>
                </div>
                <div className="dgwo-meta-item">
                  <span className="meta-label">PROBLEM DOMAIN</span>
                  <strong className="meta-val">Humanitarian Flood Disaster Routing</strong>
                </div>
              </div>
            </div>

            {/* Right — Interactive Route Network */}
            <div className="dgwo-hero-right reveal" data-delay="300">
              <div className="dgwo-hero-visual-frame">
                <div className="dgwo-visual-header">
                  <div className="dgwo-visual-dots">
                    <span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" />
                  </div>
                  <span className="dgwo-visual-badge">
                    <Activity size={10} className="dgwo-pulse-icon" /> ROUTE OPTIMIZER · LIVE
                  </span>
                </div>
                <div className="dgwo-visual-body">
                  <RoutingNetworkSVG />
                </div>
                <div className="dgwo-visual-footer">
                  <span>A-n80-k10 · CVRPLIB Benchmark</span>
                  <span>Stochastic flood overlay (BNPB 2016–2022)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── METRICS STRIP ── */}
      <section className="dgwo-metrics-strip reveal" data-delay="0">
        <div className="dgwo-container">
          <div className="dgwo-metrics-inner">
            {[
              { val: '80', sub: 'Delivery Nodes', icon: <Network size={18} />, color: '#b26cff' },
              { val: '10', sub: 'Vehicles', icon: <Route size={18} />, color: '#6d7cff' },
              { val: '100', sub: 'Vehicle Capacity', icon: <Layers size={18} />, color: '#44cf7c' },
              { val: '4', sub: 'Objectives', icon: <Target size={18} />, color: '#ffa040' },
              { val: '30', sub: 'Experimental Runs', icon: <Activity size={18} />, color: '#ff6d8a' },
            ].map((m, i) => (
              <div key={i} className="dgwo-metric-item">
                <div className="dgwo-metric-icon" style={{ color: m.color }}>{m.icon}</div>
                <div className="dgwo-metric-val" style={{ color: m.color }}>{m.val}</div>
                <div className="dgwo-metric-sub">{m.sub}</div>
                {i < 4 && <div className="dgwo-metric-sep" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="dgwo-section dgwo-section-dark">
        <div className="dgwo-container">
          <div className="dgwo-problem-grid">
            {/* Left */}
            <div className="dgwo-problem-left">
              <span className="dgwo-tag reveal" data-delay="0">01 / THE PROBLEM</span>
              <h2 className="dgwo-section-h2 reveal" data-delay="80">
                Humanitarian Routing<br />Under Uncertainty
              </h2>
              <p className="dgwo-section-p reveal" data-delay="160">
                During flood disasters, aid vehicles must reach affected communities
                as quickly as possible — but roads may be flooded, node urgency
                varies by victim count, and strict time-windows determine whether
                aid arrives in time.
              </p>
              <p className="dgwo-section-p reveal" data-delay="220">
                Classical routing methods fail here. DGWO-F2OPT was designed to
                simultaneously optimize distance, time-window feasibility, flood-risk
                exposure, and critical-node coverage using a multi-objective framework.
              </p>

              <div className="dgwo-problem-indicators reveal" data-delay="300">
                {[
                  { label: 'Flood Risk', color: '#ff6d8a', icon: '⚠' },
                  { label: 'Victim Count', color: '#b26cff', icon: '◎' },
                  { label: 'Damage Severity', color: '#ffa040', icon: '▲' },
                  { label: 'Time Windows', color: '#6d7cff', icon: '◷' },
                  { label: 'Vehicle Capacity', color: '#44cf7c', icon: '◫' },
                ].map((ind, i) => (
                  <div key={i} className="dgwo-problem-indicator" style={{ borderColor: `${ind.color}40` }}>
                    <span style={{ color: ind.color }}>{ind.icon}</span>
                    <span>{ind.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — cascade diagram */}
            <div className="dgwo-problem-right reveal" data-delay="160">
              <div className="dgwo-cascade-diagram">
                {[
                  { label: 'Flood Disaster Event', color: '#ff6d8a', icon: '⚡' },
                  { label: 'Dynamic Road Conditions', color: '#ffa040', icon: '🌊' },
                  { label: 'Affected Node Priority', color: '#b26cff', icon: '◎' },
                  { label: 'Vehicle Constraints', color: '#6d7cff', icon: '◫' },
                  { label: 'CVRPTW Formulation', color: '#6d7cff', icon: '⬡' },
                  { label: 'Multi-Objective DGWO', color: '#b26cff', icon: '△' },
                  { label: 'Optimal Pareto Routes', color: '#44cf7c', icon: '✓' },
                ].map((step, i) => (
                  <div key={i} className="dgwo-cascade-row" data-delay={String(i * 60)}>
                    <div className="dgwo-cascade-node" style={{ borderColor: `${step.color}50`, background: `${step.color}08` }}>
                      <span className="dgwo-cascade-icon" style={{ color: step.color }}>{step.icon}</span>
                      <span className="dgwo-cascade-label">{step.label}</span>
                    </div>
                    {i < 6 && <div className="dgwo-cascade-arrow" style={{ color: step.color }}>↓</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FUZZY LOGIC ── */}
      <section className="dgwo-section">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">02 / FUZZY PRIORITY SYSTEM</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">
              Mamdani Fuzzy Inference
            </h2>
            <p className="dgwo-lead-desc reveal" data-delay="160">
              Node priority is not deterministic — it depends on multiple overlapping indicators.
              A Mamdani fuzzy inference system fuses victim count, damage severity, and flood
              risk into a single actionable priority score.
            </p>
          </div>

          <div className="dgwo-fuzzy-split reveal" data-delay="200">
            <div className="dgwo-fuzzy-visual">
              <FuzzyLogicSVG />
            </div>
            <div className="dgwo-fuzzy-info">
              <h3 className="dgwo-fuzzy-h3">Three Fuzzy Inputs</h3>
              {[
                { title: 'Victims', desc: 'Number of people affected at the node. Higher counts increase priority.', color: '#b26cff' },
                { title: 'Damage Severity', desc: 'Infrastructure and property damage level. Severe damage signals urgent routing.', color: '#6d7cff' },
                { title: 'Flood Risk', desc: 'Real-world flood index from BNPB 2016–2022 data, calibrated stochastically.', color: '#ff6d8a' },
              ].map((inp, i) => (
                <div key={i} className="dgwo-fuzzy-input-card" style={{ borderLeftColor: inp.color }}>
                  <strong style={{ color: inp.color }}>{inp.title}</strong>
                  <p>{inp.desc}</p>
                </div>
              ))}
              <div className="dgwo-fuzzy-output-badge">
                <span className="dgwo-fuzzy-output-label">OUTPUT</span>
                <span className="dgwo-fuzzy-output-val">Priority Score (Defuzzified)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALGORITHM PIPELINE ── */}
      <section className="dgwo-section dgwo-section-dark">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">03 / ALGORITHM DESIGN</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">Inside DGWO-F2OPT</h2>
            <p className="dgwo-lead-desc reveal" data-delay="160">
              Seven-stage optimization pipeline combining global metaheuristic search with
              local search intensification and multi-objective Pareto preservation.
            </p>
          </div>

          <div className="dgwo-pipeline-interactive reveal" data-delay="200">
            <div className="dgwo-pipeline-steps">
              {ALGO_STEPS.map((step, idx) => (
                <button
                  key={step.num}
                  className={`dgwo-pipeline-step ${activeStep === idx ? 'step-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={activeStep === idx}
                >
                  <span className="dgwo-step-num">{step.num}</span>
                  <span className="dgwo-step-icon">{step.icon}</span>
                  <strong className="dgwo-step-title">{step.title}</strong>
                  <span className="dgwo-step-sub">{step.sub}</span>
                  {idx < ALGO_STEPS.length - 1 && <ChevronRight size={12} className="dgwo-step-arrow" />}
                </button>
              ))}
            </div>

            <div className="dgwo-pipeline-detail">
              <div className="dgwo-pd-header">
                <span className="dgwo-pd-tag">STEP {ALGO_STEPS[activeStep].num}</span>
                <span className="dgwo-pd-sub-tag">{ALGO_STEPS[activeStep].sub}</span>
              </div>
              <h3 className="dgwo-pd-title">{ALGO_STEPS[activeStep].title}</h3>
              <p className="dgwo-pd-desc">{ALGO_STEPS[activeStep].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GREY WOLF HIERARCHY ── */}
      <section className="dgwo-section">
        <div className="dgwo-container">
          <div className="dgwo-wolf-grid">
            <div className="dgwo-wolf-left">
              <span className="dgwo-tag reveal" data-delay="0">04 / GREY WOLF MECHANISM</span>
              <h2 className="dgwo-section-h2 reveal" data-delay="80">
                Social Hierarchy<br />as Optimization Engine
              </h2>
              <p className="dgwo-section-p reveal" data-delay="160">
                The Grey Wolf Optimizer mimics the leadership hierarchy of wolf packs.
                The three best solutions (Alpha, Beta, Delta) guide the search direction
                for the remaining population (Omega), naturally balancing exploration
                and exploitation.
              </p>
              <div className="dgwo-wolf-legend reveal" data-delay="240">
                {[
                  { sym: 'α', name: 'Alpha', desc: 'Best known solution', color: '#b26cff' },
                  { sym: 'β', name: 'Beta', desc: 'Second-best solution', color: '#6d7cff' },
                  { sym: 'δ', name: 'Delta', desc: 'Third-best solution', color: '#44cf7c' },
                  { sym: 'ω', name: 'Omega', desc: 'General population', color: 'rgba(255,255,255,0.4)' },
                ].map((w, i) => (
                  <div key={i} className="dgwo-wolf-legend-item">
                    <span className="dgwo-wolf-sym" style={{ background: `${w.color}20`, color: w.color, borderColor: `${w.color}40` }}>{w.sym}</span>
                    <div>
                      <strong style={{ color: w.color }}>{w.name}</strong>
                      <span>{w.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dgwo-wolf-right reveal" data-delay="200">
              <div className="dgwo-wolf-frame">
                <GreyWolfSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING 2-OPT ── */}
      <section className="dgwo-section dgwo-section-dark">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">05 / LOCAL SEARCH</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">Local Search Refinement</h2>
            <p className="dgwo-lead-desc reveal" data-delay="160">
              Floating 2-opt refines candidate routes by restructuring route segments
              after the global optimization step, finding improvements that the global
              search alone would miss.
            </p>
          </div>

          <div className="dgwo-twoopt-grid reveal" data-delay="200">
            <div className="dgwo-twoopt-panel">
              <div className="dgwo-twoopt-label" style={{ color: showAfterOpt ? 'var(--muted)' : '#ff6d8a' }}>
                {showAfterOpt ? 'BEFORE 2-OPT' : '● BEFORE 2-OPT'}
              </div>
              <div className="dgwo-twoopt-frame" onClick={() => setShowAfterOpt(false)}>
                <TwoOptSVG showAfter={false} />
              </div>
              <div className="dgwo-twoopt-caption">
                Crossing edges → inefficient route
              </div>
            </div>

            <div className="dgwo-twoopt-middle">
              <div className="dgwo-twoopt-arrow">⇌</div>
              <div className="dgwo-twoopt-swap-label">EDGE SWAP</div>
            </div>

            <div className="dgwo-twoopt-panel">
              <div className="dgwo-twoopt-label" style={{ color: showAfterOpt ? '#44cf7c' : 'var(--muted)' }}>
                {showAfterOpt ? '● AFTER 2-OPT' : 'AFTER 2-OPT'}
              </div>
              <div className="dgwo-twoopt-frame" onClick={() => setShowAfterOpt(true)}>
                <TwoOptSVG showAfter={true} />
              </div>
              <div className="dgwo-twoopt-caption">
                Resolved crossing → shorter, feasible route
              </div>
            </div>
          </div>

          <p className="dgwo-twoopt-note reveal" data-delay="300">
            Floating 2-opt applies this restructuring flexibly across all route segments —
            not just adjacent pairs — allowing deeper local optima to be found within each iteration.
          </p>
        </div>
      </section>

      {/* ── EXPERIMENT SECTION ── */}
      <section className="dgwo-section">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">06 / EXPERIMENTAL SETUP</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">Research Dashboard</h2>
          </div>

          <div className="dgwo-experiment-grid reveal" data-delay="160">
            {/* Benchmark info */}
            <div className="dgwo-exp-panel dgwo-exp-benchmark">
              <div className="dgwo-exp-panel-header">
                <Cpu size={16} className="dgwo-exp-icon" />
                <span>BENCHMARK INSTANCE</span>
              </div>
              <div className="dgwo-bench-name">A-n80-k10</div>
              <div className="dgwo-bench-source">CVRPLIB Standard Benchmark</div>
              <div className="dgwo-bench-stats">
                {[
                  { label: 'Nodes', val: '80' },
                  { label: 'Vehicles', val: '10' },
                  { label: 'Capacity', val: '100' },
                  { label: 'Objectives', val: '4' },
                ].map((s, i) => (
                  <div key={i} className="dgwo-bench-stat">
                    <strong>{s.val}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="dgwo-bench-overlay">
                <AlertTriangle size={12} style={{ color: '#ffa040' }} />
                <span>Flood overlay: BNPB Indonesia 2016–2022</span>
              </div>
            </div>

            {/* Baselines */}
            <div className="dgwo-exp-panel">
              <div className="dgwo-exp-panel-header">
                <BarChart3 size={16} className="dgwo-exp-icon" />
                <span>COMPARISON METHODS</span>
              </div>
              <div className="dgwo-baselines">
                {[
                  { code: 'M1', name: 'Classic GA', note: 'Genetic Algorithm (Standard)', highlight: false },
                  { code: 'M2', name: 'Adaptive GA', note: 'Adaptive crossover/mutation rates', highlight: false },
                  { code: 'M3', name: 'MPSO', note: 'Multi-objective Particle Swarm', highlight: false },
                  { code: '★', name: 'DGWO-F2OPT', note: 'Proposed Method', highlight: true },
                ].map((b, i) => (
                  <div key={i} className={`dgwo-baseline-card ${b.highlight ? 'baseline-highlight' : ''}`}>
                    <span className="dgwo-baseline-code">{b.code}</span>
                    <div className="dgwo-baseline-info">
                      <strong>{b.name}</strong>
                      <span>{b.note}</span>
                    </div>
                    {b.highlight && <span className="dgwo-baseline-proposed">PROPOSED</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="dgwo-section dgwo-section-dark">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">07 / RESULTS</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">Performance Comparison</h2>
            <p className="dgwo-lead-desc reveal" data-delay="160">
              Results across four humanitarian objectives. Only values supported by the project data are shown.
              Qualitative labels indicate relative performance where exact figures are unavailable.
            </p>
          </div>

          <div className="dgwo-results-dashboard reveal" data-delay="200">
            {/* Adjusted Distance */}
            <div className="dgwo-results-metric-block">
              <div className="dgwo-results-metric-header">
                <span className="dgwo-results-metric-label">ADJUSTED DISTANCE</span>
                <span className="dgwo-results-metric-unit">units (lower = better)</span>
              </div>
              <div className="dgwo-bar-row dgwo-bar-highlight">
                <span className="dgwo-bar-name">DGWO-F2OPT</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '32%', background: 'linear-gradient(90deg, #b26cff, #6d7cff)' }} />
                </div>
                <span className="dgwo-bar-val">3,062.2</span>
              </div>
              <div className="dgwo-bar-row">
                <span className="dgwo-bar-name">Adaptive GA</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '45%', background: 'rgba(255,255,255,0.15)' }} />
                </div>
                <span className="dgwo-bar-val dgwo-bar-qual">Competitive</span>
              </div>
              <div className="dgwo-bar-row">
                <span className="dgwo-bar-name">MPSO</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '52%', background: 'rgba(255,255,255,0.12)' }} />
                </div>
                <span className="dgwo-bar-val dgwo-bar-qual">Moderate</span>
              </div>
              <div className="dgwo-bar-row">
                <span className="dgwo-bar-name">Classic GA</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '88%', background: 'rgba(255,109,138,0.3)' }} />
                </div>
                <span className="dgwo-bar-val dgwo-bar-infeasible">Infeasible</span>
              </div>
            </div>

            {/* Time-Window Penalty */}
            <div className="dgwo-results-metric-block">
              <div className="dgwo-results-metric-header">
                <span className="dgwo-results-metric-label">TIME-WINDOW PENALTY</span>
                <span className="dgwo-results-metric-unit">penalty score (lower = better)</span>
              </div>
              <div className="dgwo-bar-row dgwo-bar-highlight">
                <span className="dgwo-bar-name">DGWO-F2OPT</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '6%', background: 'linear-gradient(90deg, #b26cff, #6d7cff)' }} />
                </div>
                <span className="dgwo-bar-val">6,211</span>
              </div>
              <div className="dgwo-bar-row">
                <span className="dgwo-bar-name">Adaptive GA</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '40%', background: 'rgba(255,255,255,0.15)' }} />
                </div>
                <span className="dgwo-bar-val dgwo-bar-qual">High</span>
              </div>
              <div className="dgwo-bar-row">
                <span className="dgwo-bar-name">MPSO</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '55%', background: 'rgba(255,255,255,0.12)' }} />
                </div>
                <span className="dgwo-bar-val dgwo-bar-qual">Higher</span>
              </div>
              <div className="dgwo-bar-row">
                <span className="dgwo-bar-name">Classic GA</span>
                <div className="dgwo-bar-track">
                  <div className="dgwo-bar-fill" style={{ width: '100%', background: 'rgba(255,109,138,0.3)' }} />
                </div>
                <span className="dgwo-bar-val" style={{ color: '#ff6d8a' }}>96,584</span>
              </div>
            </div>

            {/* Qualitative Results */}
            <div className="dgwo-results-qual-grid">
              <div className="dgwo-qual-card dgwo-qual-highlight">
                <div className="dgwo-qual-method">DGWO-F2OPT</div>
                <div className="dgwo-qual-items">
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#44cf7c' }} /> Lowest Adjusted Distance</div>
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#44cf7c' }} /> Lowest Time-Window Penalty</div>
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#44cf7c' }} /> Full Time-Window Feasibility</div>
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#44cf7c' }} /> Pareto Optimal Solutions</div>
                </div>
              </div>
              <div className="dgwo-qual-card">
                <div className="dgwo-qual-method">MPSO</div>
                <div className="dgwo-qual-items">
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#6d7cff' }} /> Best Risk Exposure</div>
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#6d7cff' }} /> Best Critical Coverage</div>
                </div>
              </div>
              <div className="dgwo-qual-card">
                <div className="dgwo-qual-method">Adaptive GA</div>
                <div className="dgwo-qual-items">
                  <div className="dgwo-qual-item"><CheckCircle2 size={13} style={{ color: '#b26cff' }} /> Best Response Efficiency</div>
                </div>
              </div>
              <div className="dgwo-qual-card dgwo-qual-fail">
                <div className="dgwo-qual-method">Classic GA</div>
                <div className="dgwo-qual-items">
                  <div className="dgwo-qual-item" style={{ color: '#ff6d8a' }}>✗ Operationally Infeasible</div>
                  <div className="dgwo-qual-item" style={{ color: '#ff6d8a' }}>✗ TW Penalty: 96,584</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARETO FRONT ── */}
      <section className="dgwo-section">
        <div className="dgwo-container">
          <div className="dgwo-pareto-grid">
            <div className="dgwo-pareto-left">
              <span className="dgwo-tag reveal" data-delay="0">08 / MULTI-OBJECTIVE TRADE-OFFS</span>
              <h2 className="dgwo-section-h2 reveal" data-delay="80">Pareto Front</h2>
              <p className="dgwo-section-p reveal" data-delay="160">
                Multi-objective optimization produces a set of non-dominated solutions
                rather than a single answer. Each point on the Pareto front represents
                a different trade-off between competing objectives.
              </p>
              <p className="dgwo-section-p reveal" data-delay="220">
                Hover over the points to explore individual solutions. Non-dominated
                solutions (on the front) cannot be improved on one objective without
                sacrificing another.
              </p>
              <div className="dgwo-pareto-legend reveal" data-delay="280">
                <div className="dgwo-pareto-legend-item">
                  <span className="dgwo-legend-dot" style={{ background: '#b26cff' }} />
                  <span>Non-dominated (Pareto front)</span>
                </div>
                <div className="dgwo-pareto-legend-item">
                  <span className="dgwo-legend-dot" style={{ background: 'rgba(255,255,255,0.2)' }} />
                  <span>Dominated solutions</span>
                </div>
              </div>
            </div>
            <div className="dgwo-pareto-right reveal" data-delay="200">
              <div className="dgwo-pareto-frame">
                <ParetoFrontSVG />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS INSIGHT / EDITORIAL ── */}
      <section className="dgwo-editorial-section">
        <div className="dgwo-container">
          <div className="dgwo-editorial-inner reveal" data-delay="0">
            <div className="dgwo-editorial-quote">
              "Shortest distance ≠ Best humanitarian route."
            </div>
            <p className="dgwo-editorial-body">
              Humanitarian routing must simultaneously balance travel distance,
              time-window feasibility, flood-risk exposure, and critical-node coverage.
              A route that is shortest may be infeasible, high-risk, or leave critical
              communities unserved. DGWO-F2OPT is designed to find routes that are
              not just fast — but <em>safe, feasible, and effective</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="dgwo-section dgwo-section-dark">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">09 / TECHNOLOGY STACK</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">Built With</h2>
          </div>
          <div className="dgwo-stack-groups reveal" data-delay="160">
            {[
              {
                group: 'LANGUAGE & COMPUTE',
                items: ['Python', 'NumPy', 'Pandas', 'SciPy'],
              },
              {
                group: 'OPTIMIZATION',
                items: ['Grey Wolf Optimizer', 'Floating 2-opt', 'Pareto Archive', 'Random Key Encoding'],
              },
              {
                group: 'FUZZY & DECISION',
                items: ['Mamdani Fuzzy Logic', 'scikit-fuzzy', 'Multi-Criteria Decision'],
              },
              {
                group: 'BENCHMARK & VIZ',
                items: ['CVRPLIB', 'Matplotlib', 'BNPB Data', 'Route Visualization'],
              },
            ].map((grp, i) => (
              <div key={i} className="dgwo-stack-group">
                <div className="dgwo-stack-group-label">{grp.group}</div>
                <div className="dgwo-stack-badges">
                  {grp.items.map(it => (
                    <span key={it} className="dgwo-tech-badge">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTRIBUTION ── */}
      <section className="dgwo-section">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">10 / CONTRIBUTION</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">What I Built</h2>
          </div>
          <div className="dgwo-contrib-cards reveal" data-delay="160">
            {[
              {
                icon: <Zap size={20} />,
                title: 'Algorithm Design',
                desc: 'Designed the full DGWO-F2OPT algorithm combining Grey Wolf, Floating 2-opt, and dynamic Pareto archive into a unified optimization engine.',
                color: '#b26cff',
              },
              {
                icon: <Target size={20} />,
                title: 'Mathematical Modeling',
                desc: 'Formulated the humanitarian CVRPTW with multi-objective constraints including adjusted distance, time-window penalty, risk exposure, and priority coverage.',
                color: '#6d7cff',
              },
              {
                icon: <Network size={20} />,
                title: 'Fuzzy Logic Integration',
                desc: 'Implemented Mamdani fuzzy inference for node priority scoring using real-world BNPB flood data as the risk foundation.',
                color: '#44cf7c',
              },
              {
                icon: <Layers size={20} />,
                title: 'Pareto Archive',
                desc: 'Built a dynamic non-dominated Pareto archive that preserves trade-off diversity across multiple objectives throughout optimization.',
                color: '#ffa040',
              },
              {
                icon: <Activity size={20} />,
                title: 'Experimental Evaluation',
                desc: 'Conducted 30-run experiments against Classic GA, Adaptive GA, and MPSO baselines. Analyzed results across all four objective dimensions.',
                color: '#ff6d8a',
              },
              {
                icon: <BarChart3 size={20} />,
                title: 'Multi-Objective Analysis',
                desc: 'Analyzed trade-offs on Pareto fronts, demonstrating that minimizing distance alone does not yield the best humanitarian routing outcome.',
                color: '#b26cff',
              },
            ].map((c, i) => (
              <div key={i} className="dgwo-contrib-new-card" style={{ borderTopColor: c.color }}>
                <div className="dgwo-contrib-icon" style={{ color: c.color }}>{c.icon}</div>
                <h4 className="dgwo-contrib-title">{c.title}</h4>
                <p className="dgwo-contrib-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="dgwo-section dgwo-section-dark">
        <div className="dgwo-container">
          <div className="dgwo-header-center">
            <span className="dgwo-tag reveal" data-delay="0">11 / FEATURE COMPARISON</span>
            <h2 className="dgwo-section-h2 reveal" data-delay="80">Why DGWO-F2OPT?</h2>
          </div>
          <div className="dgwo-table-wrapper reveal" data-delay="160">
            <table className="dgwo-comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Classic GA</th>
                  <th>Adaptive GA</th>
                  <th>MPSO</th>
                  <th className="dgwo-th-highlight">DGWO-F2OPT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Multi-objective', '✕', '✓', '✓', '✓'],
                  ['Time-window feasibility', '✕', '✓', '✓', '✓'],
                  ['Flood risk awareness', '✕', '✓', '✓', '✓'],
                  ['Priority node coverage', '✕', '✕', '✓', '✓'],
                  ['Local search (2-opt)', '✕', '✕', '✕', '✓'],
                  ['Dynamic Pareto archive', '✕', '✕', '✕', '✓'],
                  ['Fuzzy priority scoring', '✕', '✕', '✕', '✓'],
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="dgwo-td-feature">{row[0]}</td>
                    <td className="dgwo-td-no">{row[1]}</td>
                    <td className={row[2] === '✓' ? 'dgwo-td-yes' : 'dgwo-td-no'}>{row[2]}</td>
                    <td className={row[3] === '✓' ? 'dgwo-td-yes' : 'dgwo-td-no'}>{row[3]}</td>
                    <td className={`dgwo-td-ours ${row[4] === '✓' ? 'dgwo-td-yes' : 'dgwo-td-no'}`}>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Standardized GitHub CTA */}
      <ProjectGithubCTA
        githubUrl={project?.github}
        title="Explore the DGWO-F2OPT Optimization Codebase"
        description="View the multi-objective Grey Wolf Optimizer, floating 2-opt local search engine, and CVRPTW benchmark evaluation."
        buttonLabel="GITHUB REPOSITORY"
      />

      <ProjectNavFooter currentId="dgwo" previous={previous} next={next} />
    </main>
  )
}
