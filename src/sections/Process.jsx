import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { num: '01', title: 'Descubrimiento', desc: 'Entendemos tu negocio, tus objetivos y tu competencia. Investigación profunda antes de diseñar una sola línea.' },
  { num: '02', title: 'Estrategia', desc: 'Definimos la hoja de ruta: qué construir, cómo, cuándo y por qué. Con KPIs claros desde el día uno.' },
  { num: '03', title: 'Diseño', desc: 'Creamos propuestas visuales de alto impacto. Iteramos hasta perfeccionar cada detalle de la experiencia.' },
  { num: '04', title: 'Desarrollo', desc: 'Código limpio, escalable y performante. Entregamos a tiempo y sin sorpresas. El cliente siempre sabe dónde estamos.' },
  { num: '05', title: 'Lanzamiento', desc: 'Deployment optimizado, QA riguroso y estrategia de lanzamiento para maximizar el impacto desde el primer día.' },
  { num: '06', title: 'Crecimiento', desc: 'No desaparecemos al entregar. Medimos, optimizamos y escalamos. El proyecto no termina, evoluciona.' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-head-item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-head', start: 'top 80%' } }
      )

      // Animate the vertical line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 2, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'bottom 80%', scrub: true } }
      )

      gsap.fromTo('.step-item',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.process-steps', start: 'top 75%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="process section" id="proceso">
      <div className="container">
        <div className="process-head">
          <div className="process-head-item pill"><span className="dot" /><span>Cómo trabajamos</span></div>
          <h2 className="process-head-item display-md">
            Proceso<br />
            <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>sin sorpresas</em>
          </h2>
        </div>

        <div className="process-body">
          <div className="process-line-wrap">
            <div ref={lineRef} className="process-line" />
          </div>

          <div className="process-steps">
            {steps.map((s, i) => (
              <div className="step-item" key={s.num}>
                <div className="step-dot">
                  <div className="step-dot-inner" />
                </div>
                <div className="step-content">
                  <div className="step-num label">{s.num}</div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="process-cta-block glass">
            <div className="process-cta-accent" />
            <span className="label" style={{ marginBottom: '1rem', display: 'block' }}>¿Listo para empezar?</span>
            <h3 className="serif-lg" style={{ marginBottom: '1.5rem' }}>El mejor momento fue ayer.<br />El segundo mejor es ahora.</h3>
            <button className="btn-primary" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Agenda una llamada</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
