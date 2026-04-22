import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: '01',
    title: 'Diseño & Branding',
    label: 'VISUAL IDENTITY',
    desc: 'Identidades visuales memorables, sistemas de marca premium y experiencias que elevan percepción.',
    icon: '◈',
    img: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?q=80&w=1000&auto=format&fit=crop',
    size: 'size-6', // 1/3 del total (4 de 12)
  },
  {
    id: '02',
    title: 'Desarrollo Web',
    label: 'DIGITAL EXPERIENCE',
    desc: 'Sitios y experiencias digitales de alto rendimiento con foco en conversión.',
    icon: '⬡',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    size: 'size-3', // 1/3 del total (4 de 12)
  },
  {
    id: '03',
    title: 'SEO Estratégico',
    label: 'ORGANIC GROWTH',
    desc: 'Arquitectura de crecimiento orgánico y optimización técnica.',
    icon: '◎',
    img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    size: 'size-3', // 1/3 del total (4 de 12)
  },
  {
    id: '04',
    title: 'Consultoría Digital',
    label: 'EXECUTIVE ADVISORY',
    desc: 'Acompañamiento ejecutivo para definir estrategia y decisiones de crecimiento.',
    icon: '⬕',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop',
    size: 'size-6', // 1/2 del total (6 de 12)
  },
  {
    id: '05',
    title: 'Programación a Medida',
    label: 'CUSTOM SYSTEMS',
    desc: 'Soluciones custom para operaciones, automatización y productos escalables.',
    icon: '◉',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    size: 'size-6', // 1/2 del total (6 de 12)
  },

  {
    id: '05',
    title: 'Programación a Medida',
    label: 'CUSTOM SYSTEMS',
    desc: 'Soluciones custom para operaciones, automatización y productos escalables.',
    icon: '◉',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    size: 'size-12', // 1/2 del total (6 de 12)
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.service-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: 0.15,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="services section" id="servicios">
      <div className="container">
        <div className="section-head">
          <div className="pill"><span className="dot" /><span>Lo que hacemos</span></div>
          <h2 className="display-md">Servicios que <br/><span>transforman</span></h2>
        </div>

        <div ref={gridRef} className="bento-grid">
          {services.map(s => (
            <div key={s.id} className={`service-card ${s.size}`}>
              <div className="card-bg" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="card-overlay" />

              <div className="card-top">
                <div className="card-icon-box">{s.icon}</div>
                <span className="card-label">{s.label}</span>
              </div>

              <div className="card-body">
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
                <div className="card-link">
                  Descubrir más <span className="arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}