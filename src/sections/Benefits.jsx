import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  Radio, 
  Infinity, 
  BrainCircuit 
} from 'lucide-react' // Asegúrate de instalar lucide-react
import './Benefits.css'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: <Zap size={24} />,
    title: 'Entrega rápida',
    desc: 'Metodología ágil con sprints de 2 semanas. Sin burocracia ni demoras innecesarias.',
    metric: '2 sem',
    metricLabel: 'tiempo de sprint',
    size: 'size-6', // 1/3 del ancho
  },
  {
    icon: <Target size={24} />,
    title: 'Resultados medibles',
    desc: 'Cada proyecto arranca con KPIs definidos. No trabajamos por horas, sino por resultados.',
    metric: '3×',
    metricLabel: 'ROI promedio',
    size: 'size-3',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Garantía de calidad',
    desc: 'Si algo no cumple lo acordado, lo corregimos sin costo. Nuestra reputación depende de ello.',
    metric: '100%',
    metricLabel: 'satisfacción',
    size: 'size-3',
  },
  {
    icon: <Radio size={24} />,
    title: 'Comunicación directa',
    desc: 'Canal directo con tu equipo. Sin intermediarios ni malentendidos. Actualizaciones semanales.',
    metric: '<24h',
    metricLabel: 'tiempo de respuesta',
    size: 'size-3', // 1/2 del ancho (Fila de abajo)
  },
  {
    icon: <Infinity size={24} />,
    title: 'Soporte continuo',
    desc: 'Mantenimiento, evolución y optimización constante. Somos tu equipo digital a largo plazo.',
    metric: '24/7',
    metricLabel: 'monitoreo activo',
    size: 'size-3', // 1/2 del ancho
  },
  {
    icon: <Infinity size={24} />,
    title: 'Acompañamineto continuo',
    desc: 'Nos mantenemos al contacto siempre, en tu proceso de venta y reconocimiento.',
    metric: '24/7',
    metricLabel: 'monitoreo activo',
    size: 'size-6', // 1/2 del ancho
  },
]

export default function Benefits() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.benefits-head > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.benefits-head', start: 'top 85%' },
        }
      )
      gsap.fromTo('.benefit-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: { trigger: '.benefits-grid', start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const onCardEnter = (e) => {
    const card = e.currentTarget
    gsap.to(card.querySelector('.benefit-icon-wrap'), { 
      backgroundColor: 'var(--accent)', 
      color: '#000', 
      scale: 1.1, 
      duration: 0.4 
    })
    gsap.to(card.querySelector('.benefit-metric'), { opacity: 1, y: 0, duration: 0.4 })
  }

  const onCardLeave = (e) => {
    const card = e.currentTarget
    gsap.to(card.querySelector('.benefit-icon-wrap'), { 
      backgroundColor: 'rgba(255, 255, 255, 0.05)', 
      color: 'white', 
      scale: 1, 
      duration: 0.4 
    })
    gsap.to(card.querySelector('.benefit-metric'), { opacity: 0, y: 10, duration: 0.3 })
  }

  return (
    <section ref={sectionRef} className="benefits section" id="beneficios">
      <div className="container">
        <div className="benefits-head">
          <div className="pill"><span className="dot" /><span>Por qué elegirnos</span></div>
          <div className="benefits-head-row">
            <h2 className="display-md">
              La diferencia<br />
              <span className="accent-text">VENTAS FLOW</span>
            </h2>
            <p className="body-lg benefits-sub">
              Cientos de agencias prometen resultados.<br />
              Nosotros los demostramos con datos.
            </p>
          </div>
        </div>

        <div className="benefits-grid">
          {benefits.map((b) => (
            <div
              className={`benefit-card glass ${b.size}`}
              key={b.title}
              onMouseEnter={onCardEnter}
              onMouseLeave={onCardLeave}
            >
              <div className="benefit-top">
                <div className="benefit-icon-wrap">
                  {b.icon}
                </div>
                <div className="benefit-metric">
                  <span className="metric-num">{b.metric}</span>
                  <span className="metric-label">{b.metricLabel}</span>
                </div>
              </div>
              <div className="benefit-content">
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
              <div className="benefit-arrow">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}