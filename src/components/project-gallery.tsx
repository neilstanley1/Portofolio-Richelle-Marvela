'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, X, Terminal, Code, BarChart2, Layout } from 'lucide-react'
import type { PortfolioProject } from '@/src/data/portfolio'

// Category classifier helper
function getProjectCategory(project: PortfolioProject) {
  const text = `${project.primaryCategory} ${project.categories.join(' ')}`.toLowerCase();
  if (text.includes('ui/ux')) return 'design';
  if (text.includes('gis')) return 'gis';
  if (text.includes('cloud')) return 'cloud';
  if (text.includes('data')) return 'data';
  if (text.includes('nlp')) return 'nlp';
  if (text.includes('ai') || text.includes('ml')) return 'ai';
  return 'software';
}

// Fallback Mock Visual Component
function MockVisualFallback({ project, isExpanded = false }: { project: PortfolioProject; isExpanded?: boolean }) {
  const category = getProjectCategory(project);

  const renderMockup = () => {
    switch (category) {
      case 'ai':
      case 'nlp':
        return (
          <div className="mock-window" style={{ width: '100%', height: isExpanded ? '400px' : '280px' }}>
            <div className="mock-window-header">
              <div className="mock-dots"><span></span><span></span><span></span></div>
              <Terminal size={12} style={{ marginRight: '6px' }} />
              training_telemetry.log — {project.title.toLowerCase()}
            </div>
            <div className="mock-window-body" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 30px)' }}>
              <div className="mock-stats-grid">
                <div className="mock-stat-item">
                  <span className="mock-stat-label">Model Status</span>
                  <span className="mock-stat-value" style={{ color: '#44cf7c' }}>CONVERGED</span>
                </div>
                <div className="mock-stat-item">
                  <span className="mock-stat-label">Accuracy</span>
                  <span className="mock-stat-value">98.42%</span>
                </div>
                <div className="mock-stat-item">
                  <span className="mock-stat-label">Val Loss</span>
                  <span className="mock-stat-value">0.0381</span>
                </div>
              </div>
              
              {/* Training curves SVG */}
              <div style={{ flexGrow: 1, position: 'relative', minHeight: '80px', marginBlock: '0.4rem' }}>
                <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  {/* Accuracy curve */}
                  <path d="M 10 90 Q 120 40, 240 22 T 390 12" fill="none" stroke="var(--accent-2)" strokeWidth="2.5" />
                  {/* Loss curve */}
                  <path d="M 10 12 Q 120 58, 240 78 T 390 92" fill="none" stroke="var(--accent)" strokeWidth="2.5" />
                  
                  {/* Labels */}
                  <text x="15" y="24" fill="var(--accent)" fontSize="8" fontFamily="monospace">Loss</text>
                  <text x="15" y="86" fill="var(--accent-2)" fontSize="8" fontFamily="monospace">Accuracy</text>
                </svg>
              </div>

              <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.5rem', flexShrink: 0 }}>
                <p className="mock-terminal-line"><span className="mock-terminal-prompt">&gt;</span>[INFO] Initializing {project.title} fine-tuning pipeline...</p>
                <p className="mock-terminal-line"><span className="mock-terminal-prompt">&gt;</span>[INFO] Epoch 49/50: loss: 0.0412 - acc: 0.9814 - val_loss: 0.0441</p>
                <p className="mock-terminal-line"><span className="mock-terminal-prompt">&gt;</span>[INFO] Epoch 50/50: loss: 0.0381 - acc: 0.9842 - val_loss: 0.0398</p>
                <p className="mock-terminal-line" style={{ color: '#44cf7c' }}><span className="mock-terminal-prompt">&gt;</span>[STATUS] Optimal weights secured. Exporting artifacts.</p>
              </div>
            </div>
          </div>
        );
      case 'gis':
      case 'data':
        return (
          <div className="mock-window" style={{ width: '100%', height: isExpanded ? '400px' : '280px' }}>
            <div className="mock-window-header">
              <div className="mock-dots"><span></span><span></span><span></span></div>
              <BarChart2 size={12} style={{ marginRight: '6px' }} />
              dashboard_telemetry.sh — {project.title.toLowerCase()}
            </div>
            <div className="mock-window-body" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 30px)' }}>
              <div className="mock-stats-grid">
                <div className="mock-stat-item">
                  <span className="mock-stat-label">Ingest Rate</span>
                  <span className="mock-stat-value">12.4 MB/s</span>
                </div>
                <div className="mock-stat-item">
                  <span className="mock-stat-label">Buffer Cap</span>
                  <span className="mock-stat-value">92.1%</span>
                </div>
                <div className="mock-stat-item">
                  <span className="mock-stat-label">Latency</span>
                  <span className="mock-stat-value">14.2 ms</span>
                </div>
              </div>

              {/* Data Node Flow / Network Graph SVG */}
              <div style={{ flexGrow: 1, position: 'relative', minHeight: '100px', display: 'grid', placeItems: 'center' }}>
                <svg width="100%" height="90%" viewBox="0 0 400 100" style={{ background: '#03050d', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  {/* Grid background */}
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Connectors */}
                  <line x1="50" y1="50" x2="135" y2="30" stroke="rgba(109, 124, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3" />
                  <line x1="50" y1="50" x2="135" y2="70" stroke="rgba(109, 124, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3" />
                  <line x1="165" y1="30" x2="250" y2="50" stroke="rgba(178, 108, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3" />
                  <line x1="165" y1="70" x2="250" y2="50" stroke="rgba(178, 108, 255, 0.25)" strokeWidth="1.5" strokeDasharray="3" />
                  <line x1="250" y1="50" x2="335" y2="50" stroke="#44cf7c" strokeWidth="2.5" />

                  {/* Nodes */}
                  <circle cx="50" cy="50" r="14" fill="var(--accent)" opacity="0.85" />
                  <circle cx="150" cy="30" r="15" fill="var(--accent-2)" opacity="0.85" />
                  <circle cx="150" cy="70" r="15" fill="var(--accent-2)" opacity="0.85" />
                  <circle cx="250" cy="50" r="14" fill="var(--accent)" opacity="0.85" />
                  <circle cx="350" cy="50" r="16" fill="#44cf7c" />

                  {/* Node Labels */}
                  <text x="50" y="53" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">IN</text>
                  <text x="150" y="33" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">MAP</text>
                  <text x="150" y="73" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">FILTER</text>
                  <text x="250" y="53" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="monospace">SYNC</text>
                  <text x="350" y="53" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" fontFamily="monospace">DB</text>
                </svg>
              </div>
            </div>
          </div>
        );
      case 'design':
        return (
          <div className="mock-window" style={{ width: '100%', height: isExpanded ? '400px' : '280px' }}>
            <div className="mock-window-header">
              <div className="mock-dots"><span></span><span></span><span></span></div>
              <Layout size={12} style={{ marginRight: '6px' }} />
              wireframe_layout.fig — {project.title.toLowerCase()}
            </div>
            <div className="mock-window-body" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 30px)', background: '#0a0d1d' }}>
              <div style={{ flexGrow: 1, position: 'relative', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1rem', height: '100%' }}>
                {/* Mock UI Structure */}
                <div style={{ display: 'flex', gap: '0.8rem', height: '100%' }}>
                  {/* Left Sidebar */}
                  <div style={{ width: '25%', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }}>
                    <div style={{ height: '12px', background: 'var(--accent)', opacity: 0.3, borderRadius: '3px' }}></div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}></div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}></div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}></div>
                  </div>
                  {/* Main content body */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {/* Header strip */}
                    <div style={{ height: '26px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', alignItems: 'center', paddingInline: '0.6rem', justifyContent: 'space-between' }}>
                      <div style={{ width: '40%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}></div>
                      <div style={{ width: '12px', height: '12px', background: 'var(--accent-2)', opacity: 0.6, borderRadius: '50%' }}></div>
                    </div>
                    {/* Card grid layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', flexGrow: 1 }}>
                      <div style={{ border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(109,124,255,0.02)' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: 'var(--accent)', opacity: 0.15 }}></div>
                        <div style={{ height: '8px', width: '70%', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}></div>
                        <div style={{ height: '6px', width: '95%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }}></div>
                      </div>
                      <div style={{ border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(178,108,255,0.02)' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: 'var(--accent-2)', opacity: 0.15 }}></div>
                        <div style={{ height: '8px', width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}></div>
                        <div style={{ height: '6px', width: '85%', background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'software':
      default:
        // Render custom IDE code visual based on project ID
        let codeLines = [
          <p key="1" className="mock-terminal-line"><span className="mock-code-comment">// {project.title} — API Service Entry</span></p>,
          <p key="2" className="mock-terminal-line"><span className="mock-code-purple">import</span> {'{ db }'} <span className="mock-code-purple">from</span> <span className="mock-code-green">'@/lib/database'</span></p>,
          <p key="3" className="mock-terminal-line"><span className="mock-code-purple">import</span> {'{ authenticate }'} <span className="mock-code-purple">from</span> <span className="mock-code-green">'@/lib/auth'</span></p>,
          <p key="4" className="mock-terminal-line">&nbsp;</p>,
          <p key="5" className="mock-terminal-line"><span className="mock-code-purple">export default async function</span> <span className="mock-code-blue">handler</span>(req, res) {'{'}</p>,
          <p key="6" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">const</span> session = <span className="mock-code-purple">await</span> <span className="mock-code-blue">authenticate</span>(req);</p>,
          <p key="7" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">if</span> (!session) <span className="mock-code-purple">return</span> res.<span className="mock-code-blue">status</span>(<span className="mock-code-orange">401</span>).<span className="mock-code-blue">json</span>({'{'} error: <span className="mock-code-green">'Unauthorized'</span> {'}'});</p>,
          <p key="8" className="mock-terminal-line">&nbsp;</p>,
          <p key="9" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">try</span> {'{'}</p>,
          <p key="10" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="mock-code-purple">const</span> data = <span className="mock-code-purple">await</span> db.<span className="mock-code-blue">query</span>(<span className="mock-code-green">'SELECT * FROM records'</span>);</p>,
          <p key="11" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="mock-code-purple">return</span> res.<span className="mock-code-blue">status</span>(<span className="mock-code-orange">200</span>).<span className="mock-code-blue">json</span>(data);</p>,
          <p key="12" className="mock-terminal-line">&nbsp;&nbsp;{'}'} <span className="mock-code-purple">catch</span> (err) {'{'}</p>,
          <p key="13" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="mock-code-purple">return</span> res.<span className="mock-code-blue">status</span>(<span className="mock-code-orange">500</span>).<span className="mock-code-blue">json</span>({'{'} error: err.message {'}'});</p>,
          <p key="14" className="mock-terminal-line">&nbsp;&nbsp;{'}'}</p>,
          <p key="15" className="mock-terminal-line">{'}'}</p>
        ];

        if (project.id === 'mbelys') {
          codeLines = [
            <p key="1" className="mock-terminal-line"><span className="mock-code-comment"># MBELYS: Sound Classification Pipeline</span></p>,
            <p key="2" className="mock-terminal-line"><span className="mock-code-purple">import</span> sounddevice <span className="mock-code-purple">as</span> sd</p>,
            <p key="3" className="mock-terminal-line"><span className="mock-code-purple">import</span> torch</p>,
            <p key="4" className="mock-terminal-line"><span className="mock-code-purple">import</span> requests</p>,
            <p key="5" className="mock-terminal-line">&nbsp;</p>,
            <p key="6" className="mock-terminal-line"><span className="mock-code-purple">def</span> <span className="mock-code-blue">record_and_analyze</span>():</p>,
            <p key="7" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;duration = <span className="mock-code-orange">5</span> <span className="mock-code-comment"># seconds</span></p>,
            <p key="8" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;fs = <span className="mock-code-orange">16000</span></p>,
            <p key="9" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;audio = sd.<span className="mock-code-blue">rec</span>(duration * fs, samplerate=fs, channels=<span className="mock-code-orange">1</span>)</p>,
            <p key="10" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;sd.<span className="mock-code-blue">wait</span>()</p>,
            <p key="11" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;</p>,
            <p key="12" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="mock-code-comment"># Feed audio into trained PyTorch model</span></p>,
            <p key="13" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;features = <span className="mock-code-blue">extract_fft_spectrum</span>(audio)</p>,
            <p key="14" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;prediction = model.<span className="mock-code-blue">predict</span>(features)</p>,
            <p key="15" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;</p>,
            <p key="16" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;<span className="mock-code-comment"># Stream payload to Firebase Realtime integration</span></p>,
            <p key="17" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;payload = {'{'} <span className="mock-code-green">"state"</span>: prediction, <span className="mock-code-green">"timestamp"</span>: <span className="mock-code-blue">get_timestamp</span>() {'}'}</p>,
            <p key="18" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;requests.<span className="mock-code-blue">post</span>(<span className="mock-code-green">"https://firebase-api/mbelys-data"</span>, json=payload)</p>
          ];
        } else if (project.id === 'schola') {
          codeLines = [
            <p key="1" className="mock-terminal-line"><span className="mock-code-comment">// Schola: Scholarship Search Platform Model</span></p>,
            <p key="2" className="mock-terminal-line"><span className="mock-code-purple">import</span> {'{ db }'} <span className="mock-code-purple">from</span> <span className="mock-code-green">'./database'</span></p>,
            <p key="3" className="mock-terminal-line">&nbsp;</p>,
            <p key="4" className="mock-terminal-line"><span className="mock-code-purple">export async function</span> <span className="mock-code-blue">searchScholarships</span>(filters) {'{'}</p>,
            <p key="5" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">const</span> query = db.<span className="mock-code-blue">select</span>().<span className="mock-code-blue">from</span>(<span className="mock-code-green">'scholarships'</span>);</p>,
            <p key="6" className="mock-terminal-line">&nbsp;&nbsp;</p>,
            <p key="7" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">if</span> (filters.category) {'{'}</p>,
            <p key="8" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;query.<span className="mock-code-blue">where</span>(eq(scholarships.category, filters.category));</p>,
            <p key="9" className="mock-terminal-line">&nbsp;&nbsp;{'}'}</p>,
            <p key="10" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">if</span> (filters.limit) {'{'}</p>,
            <p key="11" className="mock-terminal-line">&nbsp;&nbsp;&nbsp;&nbsp;query.<span className="mock-code-blue">limit</span>(filters.limit);</p>,
            <p key="12" className="mock-terminal-line">&nbsp;&nbsp;{'}'}</p>,
            <p key="13" className="mock-terminal-line">&nbsp;&nbsp;</p>,
            <p key="14" className="mock-terminal-line">&nbsp;&nbsp;<span className="mock-code-purple">return await</span> query.<span className="mock-code-blue">execute</span>();</p>,
            <p key="15" className="mock-terminal-line">{'}'}</p>
          ];
        }

        return (
          <div className="mock-window" style={{ width: '100%', height: isExpanded ? '400px' : '280px' }}>
            <div className="mock-window-header">
              <div className="mock-dots"><span></span><span></span><span></span></div>
              <Code size={12} style={{ marginRight: '6px' }} />
              {project.id === 'mbelys' ? 'sound_predict.py' : project.id === 'schola' ? 'scholarship_search.ts' : 'system_handler.ts'}
            </div>
            <div className="mock-window-body">
              {codeLines}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="mock-visual-wrap">
      {renderMockup()}
    </div>
  );
}

export function ProjectGallery({ project }: { project: PortfolioProject }) {
  const items = project.gallery?.length ? project.gallery : [{ caption: 'System architecture diagram conceptual representation.', layout: 'wide' as const }]
  const [active, setActive] = useState<number | null>(null)
  const move = (direction: number) => setActive((current) => current === null ? 0 : (current + direction + items.length) % items.length)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length]);

  return (
    <>
      <div className="project-gallery" aria-label={`${project.title} visual gallery`}>
        {items.map((item, index) => (
          <button
            className={`gallery-slot gallery-${item.layout || 'wide'}`}
            key={`${item.caption}-${index}`}
            onClick={() => setActive(index)}
            aria-label={`Open visual ${index + 1}: ${item.caption}`}
          >
            {item.src ? (
              <img src={item.src} alt={item.caption} />
            ) : (
              <MockVisualFallback project={project} />
            )}
            <span className="gallery-caption">
              {item.caption}
              <Maximize2 />
            </span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="gallery-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} visual viewer`}
          onClick={() => setActive(null)}
        >
          <button className="gallery-close" onClick={() => setActive(null)} aria-label="Close visual viewer">
            <X />
          </button>
          
          <button className="gallery-arrow gallery-prev" onClick={(e) => { e.stopPropagation(); move(-1) }} aria-label="Previous visual">
            <ChevronLeft />
          </button>
          
          <div className="viewer-slot" onClick={(e) => e.stopPropagation()}>
            {items[active].src ? (
              <img src={items[active].src} alt={items[active].caption} />
            ) : (
              <MockVisualFallback project={project} isExpanded={true} />
            )}
            <p>{items[active].caption}</p>
          </div>
          
          <button className="gallery-arrow gallery-next" onClick={(e) => { e.stopPropagation(); move(1) }} aria-label="Next visual">
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  )
}
