import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '001',
    name: 'Vaultra Finance',
    category: 'Diseño + Desarrollo',
    year: '2024',
    desc: 'Plataforma fintech con interfaz inmersiva y sistema de diseño completo. +340% en conversiones.',
    color: '#c8f542',
  },
  {
    id: '002',
    name: 'Orbis Luxury',
    category: 'Branding + Web',
    year: '2024',
    desc: 'Identidad de marca y e-commerce premium para boutique de moda de lujo. +220% ventas online.',
    color: '#c9a96e',
  },
  {
    id: '003',
    name: 'Stratum SaaS',
    category: 'Desarrollo de Software',
    year: '2023',
    desc: 'Aplicación B2B enterprise con dashboards analytics y API robusta. 50K usuarios activos.',
    color: '#ff4d3d',
  },
  {
    id: '004',
    name: 'Meridian Legal',
    category: 'SEO + Estrategia',
    year: '2023',
    desc: 'Posicionamiento orgánico que llevó al #1 en Google en 6 meses. +450% tráfico orgánico.',
    color: '#a78bfa',
  },
]

export default function Work() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(null)
  const listRef = useRef(null)
  const previewRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-head-item',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.work-head', start: 'top 80%' } }
      )

      gsap.fromTo('.project-row',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const onRowEnter = (proj) => {
    setActive(proj.id)
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
  }
  const onRowLeave = () => {
    setActive(null)
    gsap.to(previewRef.current, { opacity: 0, scale: 0.95, duration: 0.3 })
  }

  const activeProject = projects.find(p => p.id === active)

  return (
    <section ref={sectionRef} className="work section" id="trabajo">
      <div className="container">
        <div className="work-head">
          <div className="work-head-item pill"><span className="dot" /><span>Casos de éxito</span></div>
          <div className="work-head-row">
            <h2 className="work-head-item display-md">Trabajo <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>selecto</em></h2>
            <a href="#" className="work-head-item btn-outline work-see-all">Ver todos</a>
          </div>
        </div>

        <div className="work-body">
          <div ref={listRef} className="project-list">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`project-row ${active === p.id ? 'active' : ''}`}
                onMouseEnter={() => onRowEnter(p)}
                onMouseLeave={onRowLeave}
                data-hover
              >
                <span className="project-num label">{p.id}</span>
                <div className="project-main">
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc-inline">{p.desc}</p>
                </div>
                <span className="project-cat label">{p.category}</span>
                <span className="project-year label">{p.year}</span>
                <div className="project-arrow">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 14L14 2M14 2H5M14 2V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="project-progress" style={{ '--color': p.color }}>
                  <div className="progress-fill" style={{ background: p.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Hover Preview */}
          <div ref={previewRef} className="project-preview" style={{ opacity: 0, transform: 'scale(0.95)' }}>
            {activeProject && (
              <div className="preview-inner" style={{ '--color': activeProject.color }}>
                <div className="preview-bg" style={{
                  background: `radial-gradient(ellipse at center, ${activeProject.color}18 0%, transparent 70%)`
                }} />
                <span className="preview-num">{activeProject.id}</span>
                <h3 className="preview-name" style={{ color: activeProject.color }}>
                  {activeProject.name}
                </h3>
                <p className="preview-cat label">{activeProject.category}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
