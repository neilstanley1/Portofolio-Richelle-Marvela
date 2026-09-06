'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, GitBranch, CheckCircle2, Activity, Database, Server, Terminal, Network, LayoutDashboard } from 'lucide-react'
import { projects, type PortfolioProject } from '@/src/data/portfolio'
import {
  ProjectBackButton,
  ProjectGithubCTA,
  ProjectNavFooter,
} from '@/src/components/project-layout/project-layout'

function useReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      el.querySelectorAll('.reveal').forEach((r) => r.classList.add('revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const delay = target.dataset.delay || '0'
            setTimeout(() => {
              target.classList.add('revealed')
            }, parseInt(delay))
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    const revealElements = el.querySelectorAll('.reveal')
    revealElements.forEach((r) => observer.observe(r))

    const timer = setTimeout(() => {
      revealElements.forEach((r) => {
        const rect = r.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          const delay = (r as HTMLElement).dataset.delay || '0'
          setTimeout(() => {
            r.classList.add('revealed')
          }, parseInt(delay))
        }
      })
    }, 50)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return ref
}

export function AqiCaseStudyPage({ project }: { project: PortfolioProject }) {
  const index = projects.findIndex((item) => item.id === 'aqi')
  // Fallback in case 'aqi' is not in projects, though it should be.
  const currentIndex = index >= 0 ? index : 0;
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length]
  const next = projects[(currentIndex + 1) % projects.length]
  const mainRef = useReveal()

  return (
    <main
      className="project-page-root case-study case-aqi"
      ref={mainRef as React.RefObject<HTMLElement>}
      style={
        {
          '--project-accent': '#10b981',
          '--project-accent-rgb': '16, 185, 129',
          '--project-title-color': '#ffffff',
          '--project-card-bg': 'rgba(16, 185, 129, 0.03)',
          '--project-card-border': 'rgba(16, 185, 129, 0.15)',
        } as React.CSSProperties
      }
    >
      {/* ── 1. HERO SECTION ── */}
      <header className="aqi-hero-section">
        <div className="aqi-container">
          <ProjectBackButton />

          <div className="aqi-kicker reveal" data-delay="0">
            <span className="aqi-kicker-dot" />
            DATA ENGINEERING · MACHINE LEARNING · 2026
          </div>

          <h1 className="aqi-hero-title reveal" data-delay="80">
            Real-Time AQI Prediction
          </h1>

          <p className="aqi-hero-subtitle reveal" data-delay="160">
            Real-Time Air Quality Monitoring &amp; Prediction Pipeline
          </p>

          <p className="aqi-hero-lead reveal" data-delay="220">
            An end-to-end real-time air quality prediction pipeline combining streaming data, distributed processing, machine learning, and interactive visualization.
          </p>

          <div className="aqi-meta-grid reveal" data-delay="300">
            <div className="aqi-meta-item">
              <span className="meta-label">ROLE</span>
              <strong className="meta-val">Data &amp; ML Engineer</strong>
            </div>
            <div className="aqi-meta-item">
              <span className="meta-label">RESPONSIBILITIES</span>
              <strong className="meta-val">OpenWeather Streaming · PySpark · ML Training</strong>
            </div>
            <div className="aqi-meta-item">
              <span className="meta-label">TECH STACK</span>
              <strong className="meta-val">Apache Spark · PySpark · Streamlit · Scikit-Learn</strong>
            </div>
            <div className="aqi-meta-item">
              <span className="meta-label">DATASET &amp; SOURCE</span>
              <strong className="meta-val">OpenWeatherMap API · Parquet</strong>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="aqi-dashboard-mockup reveal" data-delay="400">
            <div className="aqi-dash-header">
              <div className="aqi-dash-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="aqi-dash-refresh-badge">
                <Activity size={12} className="pulse-icon" /> AUTO REFRESH · 10s
              </div>
            </div>
            <div className="aqi-dash-metrics">
              <div className="aqi-metric-card">
                <div className="aqi-metric-label">Predicted AQI</div>
                <div className="aqi-metric-val">78</div>
              </div>
              <div className="aqi-metric-card highlight">
                <div className="aqi-metric-label">Forecast AQI</div>
                <div className="aqi-metric-val">82</div>
              </div>
              <div className="aqi-metric-card">
                <div className="aqi-metric-label">Current AQI</div>
                <div className="aqi-metric-val">75</div>
              </div>
            </div>
            <div className="aqi-chart-row">
              <div className="aqi-chart-box">
                <div className="aqi-bar-group">
                  <div className="aqi-bar" style={{ height: '40%' }}></div>
                  <div className="aqi-bar" style={{ height: '55%' }}></div>
                  <div className="aqi-bar" style={{ height: '70%' }}></div>
                  <div className="aqi-bar" style={{ height: '65%' }}></div>
                  <div className="aqi-bar" style={{ height: '78%' }}></div>
                  <div className="aqi-bar" style={{ height: '82%' }}></div>
                  <div className="aqi-bar" style={{ height: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. OVERVIEW ── */}
      <section className="aqi-section aqi-section-dark">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">01 / OVERVIEW</span>
            <h2 className="reveal" data-delay="80">From Live Data to Prediction</h2>
            <p className="aqi-lead-desc reveal" data-delay="160">
              The end-to-end pipeline continuously fetches live weather and pollutant data, processes it via PySpark streaming, predicts the Air Quality Index using a Random Forest model, and updates a dashboard in real-time.
            </p>
          </div>

          <div className="aqi-stat-cards reveal" data-delay="240">
            <div className="aqi-stat-card">
              <div className="aqi-stat-val">REAL-TIME</div>
              <div className="aqi-stat-sub">15-second intervals</div>
            </div>
            <div className="aqi-stat-card">
              <div className="aqi-stat-val">10</div>
              <div className="aqi-stat-sub">Prediction features</div>
            </div>
            <div className="aqi-stat-card">
              <div className="aqi-stat-val">RANDOM FOREST</div>
              <div className="aqi-stat-sub">Regression model</div>
            </div>
            <div className="aqi-stat-card">
              <div className="aqi-stat-val">+10 MIN</div>
              <div className="aqi-stat-sub">Forecast horizon</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. ARCHITECTURE ── */}
      <section className="aqi-section">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">02 / SYSTEM ARCHITECTURE</span>
            <h2 className="reveal" data-delay="80">Pipeline Architecture</h2>
          </div>

          <div className="aqi-pipeline-grid reveal" data-delay="160">
            <div className="aqi-pipeline-node node-source">OpenWeatherMap API</div>
            <div className="aqi-pipeline-arrow">→</div>
            <div className="aqi-pipeline-node node-process">producer.py</div>
            <div className="aqi-pipeline-arrow">→</div>
            <div className="aqi-pipeline-node node-store">JSON Stream Files</div>

            <div className="aqi-pipeline-node node-process">collect_stream.py</div>
            <div className="aqi-pipeline-arrow">→</div>
            <div className="aqi-pipeline-node node-process">Apache Spark</div>
            <div className="aqi-pipeline-arrow">→</div>
            <div className="aqi-pipeline-node node-store">aqi_data.parquet</div>

            <div className="aqi-pipeline-node node-ml">train_model.py</div>
            <div className="aqi-pipeline-arrow">→</div>
            <div className="aqi-pipeline-node node-ml">Random Forest Regressor</div>
            <div className="aqi-pipeline-arrow">→</div>
            <div className="aqi-pipeline-node node-viz">Streamlit Dashboard</div>
          </div>

          <div className="aqi-arch-explainers reveal" data-delay="240">
            <div className="aqi-arch-card">Data Source</div>
            <div className="aqi-arch-card">Streaming</div>
            <div className="aqi-arch-card">Processing</div>
            <div className="aqi-arch-card">Storage</div>
            <div className="aqi-arch-card">ML + Viz</div>
          </div>
        </div>
      </section>

      {/* ── 4. DATA INGESTION ── */}
      <section className="aqi-section aqi-section-dark">
        <div className="aqi-container">
          <div className="aqi-grid-2col">
            <div className="aqi-col">
              <span className="aqi-tag reveal" data-delay="0">03 / DATA INGESTION</span>
              <h2 className="reveal" data-delay="80">01 / Data Ingestion</h2>
              <p className="reveal" data-delay="160">
                Data is gathered from the OpenWeatherMap API every 15 seconds. The custom `producer.py` script orchestrates the collection of both weather metrics and air pollution statistics, writing them as JSON objects into a designated streaming directory.
              </p>
              
              <div className="aqi-fields-grid reveal" data-delay="240">
                <div className="aqi-field-group">
                  <div className="aqi-field-title">WEATHER</div>
                  <div className="aqi-field-item">Temperature</div>
                  <div className="aqi-field-item">Humidity</div>
                  <div className="aqi-field-item">Pressure</div>
                  <div className="aqi-field-item">Wind Speed</div>
                  <div className="aqi-field-item">Clouds</div>
                </div>
                <div className="aqi-field-group">
                  <div className="aqi-field-title">AIR POLLUTION</div>
                  <div className="aqi-field-item">AQI</div>
                  <div className="aqi-field-item">PM2.5</div>
                  <div className="aqi-field-item">PM10</div>
                  <div className="aqi-field-item">CO</div>
                  <div className="aqi-field-item">NO₂</div>
                  <div className="aqi-field-item">O₃</div>
                </div>
              </div>
            </div>
            <div className="aqi-col">
              <div className="aqi-code-panel reveal" data-delay="160">
                <div className="aqi-dash-header">
                  <div className="aqi-dash-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span>producer.py</span>
                </div>
                <pre>
                  <code>
{`while True:
    weather_data = fetch_weather()
    pollution_data = fetch_pollution()
    
    record = {
        "timestamp": time.time(),
        "weather": weather_data,
        "pollution": pollution_data
    }
    
    write_to_stream(record)
    time.sleep(15)`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. STREAM PROCESSING ── */}
      <section className="aqi-section">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">04 / STREAM PROCESSING</span>
            <h2 className="reveal" data-delay="80">02 / Stream Processing with Spark</h2>
            <p className="aqi-lead-desc reveal" data-delay="160">
              Apache Spark Structured Streaming reads the incoming JSON files, flattens nested structures, validates schemas, and handles null values before appending the clean records to a Parquet storage layer for ML training.
            </p>
          </div>

          <div className="aqi-transform-flow reveal" data-delay="240">
            <div className="aqi-transform-step">JSON Files</div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-transform-step">Schema Validation</div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-transform-step">Nested Transformation</div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-transform-step">Null Handling</div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-transform-step">Structured Records</div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-transform-step highlight">Parquet Append</div>
          </div>
        </div>
      </section>

      {/* ── 6. MACHINE LEARNING ── */}
      <section className="aqi-section aqi-section-dark">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">05 / MACHINE LEARNING</span>
            <h2 className="reveal" data-delay="80">03 / AQI Prediction</h2>
          </div>

          <div className="aqi-ml-panel reveal" data-delay="160">
            <div className="aqi-ml-features">
              <strong>Input Features (10)</strong>
              <ul>
                <li>Temperature</li>
                <li>Humidity</li>
                <li>Wind Speed</li>
                <li>Pressure</li>
                <li>Clouds</li>
                <li>PM2.5</li>
                <li>PM10</li>
                <li>CO</li>
                <li>NO₂</li>
                <li>O₃</li>
              </ul>
            </div>
            <div className="aqi-pipeline-arrow large">→</div>
            <div className="aqi-ml-model-box">
              <Network size={32} />
              <br/>
              Random Forest Regressor
            </div>
            <div className="aqi-pipeline-arrow large">→</div>
            <div className="aqi-ml-output">
              <strong>Predicted AQI</strong>
              <div className="output-val">78.5</div>
            </div>
          </div>

          <table className="aqi-ml-config-table reveal" data-delay="240">
            <tbody>
              <tr>
                <td>Algorithm</td>
                <td>Random Forest Regressor</td>
              </tr>
              <tr>
                <td>Estimators</td>
                <td>100 trees</td>
              </tr>
              <tr>
                <td>Max Depth</td>
                <td>7</td>
              </tr>
              <tr>
                <td>Target</td>
                <td>AQI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. DASHBOARD ── */}
      <section className="aqi-section">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">06 / REAL-TIME MONITORING</span>
            <h2 className="reveal" data-delay="80">04 / Real-Time Monitoring</h2>
          </div>

          <div className="aqi-browser-mockup reveal" data-delay="160">
            <div className="aqi-browser-chrome">
              <div className="aqi-dash-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-url">localhost:8501/aqi-dashboard</div>
            </div>
            <div className="aqi-dash-content">
              <div className="aqi-dash-header-inner">
                <h3>Real-Time AQI Predictions</h3>
                <div className="aqi-dash-refresh-badge">
                  <Activity size={12} className="pulse-icon" /> AUTO REFRESH 10s
                </div>
              </div>
              
              <div className="aqi-dash-metrics">
                <div className="aqi-metric-card">
                  <div className="aqi-metric-label">Predicted AQI</div>
                  <div className="aqi-metric-val">78</div>
                </div>
                <div className="aqi-metric-card highlight">
                  <div className="aqi-metric-label">Forecast AQI +10min</div>
                  <div className="aqi-metric-val">82</div>
                </div>
                <div className="aqi-metric-card">
                  <div className="aqi-metric-label">Current AQI</div>
                  <div className="aqi-metric-val">75</div>
                </div>
              </div>

              <div className="aqi-dash-chips-row">
                <div className="aqi-chip">Temp 28.5°C</div>
                <div className="aqi-chip">Humidity 78%</div>
                <div className="aqi-chip">Wind 3.2 m/s</div>
                <div className="aqi-chip">Pressure 1012 hPa</div>
                <div className="aqi-chip">Clouds 65%</div>
              </div>
              
              <div className="aqi-dash-chips-row aqi-pollutant-chips">
                <div className="aqi-chip alert">PM2.5 18.3</div>
                <div className="aqi-chip">PM10 32.1</div>
                <div className="aqi-chip">CO 0.45</div>
                <div className="aqi-chip">NO₂ 12.8</div>
                <div className="aqi-chip">O₃ 48.2</div>
              </div>

              <div className="aqi-chart-row-double">
                <div className="aqi-chart-box">
                  <div className="aqi-metric-label">AQI Trend</div>
                  <div className="aqi-bar-group">
                    <div className="aqi-bar" style={{ height: '40%' }}></div>
                    <div className="aqi-bar" style={{ height: '50%' }}></div>
                    <div className="aqi-bar" style={{ height: '55%' }}></div>
                    <div className="aqi-bar" style={{ height: '70%' }}></div>
                    <div className="aqi-bar" style={{ height: '65%' }}></div>
                    <div className="aqi-bar" style={{ height: '78%' }}></div>
                  </div>
                </div>
                <div className="aqi-chart-box">
                  <div className="aqi-metric-label">Weather Trend (Temp)</div>
                  <div className="aqi-bar-group">
                    <div className="aqi-bar" style={{ height: '80%' }}></div>
                    <div className="aqi-bar" style={{ height: '82%' }}></div>
                    <div className="aqi-bar" style={{ height: '81%' }}></div>
                    <div className="aqi-bar" style={{ height: '79%' }}></div>
                    <div className="aqi-bar" style={{ height: '75%' }}></div>
                    <div className="aqi-bar" style={{ height: '74%' }}></div>
                  </div>
                </div>
              </div>

              <table className="aqi-mini-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>AQI</th>
                    <th>PM2.5</th>
                    <th>Temp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>10:45:30</td><td>78</td><td>18.3</td><td>28.5</td></tr>
                  <tr><td>10:45:15</td><td>77</td><td>18.1</td><td>28.4</td></tr>
                  <tr><td>10:45:00</td><td>75</td><td>17.9</td><td>28.4</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. DATA FLOW ── */}
      <section className="aqi-section aqi-section-dark">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">07 / PIPELINE MODULES</span>
            <h2 className="reveal" data-delay="80">Behind the Pipeline</h2>
          </div>
          
          <div className="aqi-module-flow reveal" data-delay="160">
            <div className="aqi-module-card">
              <strong>producer.py</strong>
              <p>Fetches data via API</p>
            </div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-module-card">
              <strong>collect_stream.py</strong>
              <p>Spark stream ingestion</p>
            </div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-module-card">
              <strong>aqi_data.parquet</strong>
              <p>Storage layer</p>
            </div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-module-card">
              <strong>train_model.py</strong>
              <p>Model training</p>
            </div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-module-card">
              <strong>aqi_rf_model</strong>
              <p>Serialized model</p>
            </div>
            <div className="aqi-transform-arrow">→</div>
            <div className="aqi-module-card">
              <strong>stream_final.py</strong>
              <p>Live inference &amp; dash</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. CHALLENGES ── */}
      <section className="aqi-section">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">08 / TECHNICAL CHALLENGES</span>
            <h2 className="reveal" data-delay="80">Engineering Challenges</h2>
          </div>
          
          <div className="aqi-challenge-grid reveal" data-delay="160">
            <div className="aqi-challenge-card">
              <Server size={24} className="mb-4 text-[#b26cff]" />
              <h3>Continuous Data Ingestion</h3>
              <p>Handling rate limits and connection drops while fetching from OpenWeatherMap every 15s continuously.</p>
            </div>
            <div className="aqi-challenge-card">
              <Database size={24} className="mb-4 text-[#44cf7c]" />
              <h3>Structured Streaming Data</h3>
              <p>Transforming complex nested JSON arrays into flat schemas suitable for model inference using PySpark.</p>
            </div>
            <div className="aqi-challenge-card">
              <LayoutDashboard size={24} className="mb-4 text-[#b26cff]" />
              <h3>Real-Time Visualization</h3>
              <p>Updating the Streamlit dashboard asynchronously as new predictions arrive without causing page reloads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. TAKEAWAYS ── */}
      <section className="aqi-section aqi-section-dark">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">09 / KEY TAKEAWAYS</span>
            <h2 className="reveal" data-delay="80">What This Project Demonstrates</h2>
          </div>
          
          <div className="aqi-takeaways-grid reveal" data-delay="160">
            <ul>
              <li><CheckCircle2 size={16}/> End-to-end data pipeline construction</li>
              <li><CheckCircle2 size={16}/> Micro-batch streaming with Spark</li>
              <li><CheckCircle2 size={16}/> Real-time API integration</li>
              <li><CheckCircle2 size={16}/> Handling nested JSON schemas</li>
              <li><CheckCircle2 size={16}/> Parquet file optimization</li>
            </ul>
            <ul>
              <li><CheckCircle2 size={16}/> Machine learning regression</li>
              <li><CheckCircle2 size={16}/> Feature engineering from streams</li>
              <li><CheckCircle2 size={16}/> Model serialization and inference</li>
              <li><CheckCircle2 size={16}/> Streamlit real-time dashboarding</li>
              <li><CheckCircle2 size={16}/> Resilient error handling</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 11. TECH STACK ── */}
      <section className="aqi-section">
        <div className="aqi-container">
          <div className="aqi-header-center">
            <span className="aqi-tag reveal" data-delay="0">10 / TECH STACK</span>
            <h2 className="reveal" data-delay="80">Technology Stack</h2>
          </div>

          <div className="aqi-stack-grid reveal" data-delay="160">
            <div className="aqi-stack-block">
              <div className="aqi-stack-badges">
                <span className="aqi-tech-badge">Python</span>
                <span className="aqi-tech-badge">OpenWeatherMap API</span>
                <span className="aqi-tech-badge">Apache Spark</span>
                <span className="aqi-tech-badge">PySpark</span>
                <span className="aqi-tech-badge">Parquet</span>
              </div>
            </div>
            <div className="aqi-stack-block">
              <div className="aqi-stack-badges">
                <span className="aqi-tech-badge">Scikit-learn</span>
                <span className="aqi-tech-badge">Random Forest</span>
                <span className="aqi-tech-badge">Streamlit</span>
                <span className="aqi-tech-badge">Matplotlib</span>
                <span className="aqi-tech-badge">Bash</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Standardized GitHub CTA */}
      <ProjectGithubCTA
        githubUrl={project?.github}
        title="Explore the Real-Time AQI Pipeline Codebase"
        description="View the PySpark streaming data pipeline, Random Forest prediction model, and Streamlit dashboard code on GitHub."
        buttonLabel="GITHUB REPOSITORY"
      />

      <ProjectNavFooter currentId="aqi" previous={previous} next={next} />
    </main>
  )
}
