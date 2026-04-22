import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Carlos Méndez',
    role: 'CEO',
    company: 'Vaultra Finance',
    quote: 'NEXUS transformó completamente nuestra presencia digital. Pasamos de ser invisibles online a dominar las búsquedas de nuestro sector. ROI de 3x en los primeros 4 meses.',
    avatar: 'CM',
    rating: 5,
  },
  {
    name: 'Ana Robles',
    role: 'Directora General',
    company: 'Orbis Luxury',
    quote: 'Un equipo que entiende el lujo, el detalle y los negocios al mismo tiempo. No solo diseñan sitios hermosos, construyen activos digitales reales que generan ventas.',
    avatar: 'AR',
    rating: 5,
  },
  {
    name: 'Diego Paredes',
    role: 'CTO',
    company: 'Stratum SaaS',
    quote: 'Código limpio, entrega a tiempo, comunicación impecable. Tres cosas raras en la industria. Los elegimos para construir nuestro producto y no nos arrepentimos ni un segundo.',
    avatar: 'DP',
    rating: 5,
  },
  {
    name: 'Lucía Vargas',
    role: 'Directora de Marketing',
    company: 'Meridian Legal',
    quote: 'En 6 meses nos llevaron al primer lugar de Google para nuestros keywords principales. El tráfico orgánico aumentó 450% y la calidad de leads mejoró radicalmente.',
    avatar: 'LV',
    rating: 5,
  },
]

const logos = ['VAULTRA', 'ORBIS', 'STRATUM', 'MERIDIAN', 'APEX', 'LUMIS', 'KORA', 'FENIX']

export default function Testimonials() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-head > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-head', start: 'top 80%' },
        }
      )
      gsap.fromTo('.testimonial-main',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonial-main', start: 'top 80%' },
        }
      )
      gsap.fromTo('.logos-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.logos-section', start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const switchTo = (i) => {
    if (i === active) return
    gsap.to(cardRef.current, {
      opacity: 0, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setActive(i)
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
      },
    })
  }

  const t = testimonials[active]

  return (
    <section ref={sectionRef} className="testimonials section" id="testimonios">
      <div className="container">
        <div className="testimonials-head">
          <div className="pill"><span className="dot" /><span>Clientes</span></div>
          <div className="testimonials-head-row">
            <h2 className="display-md">
              Lo que dicen<br />
              <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>los que saben</em>
            </h2>
            <div className="testimonials-nav">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`t-nav-btn ${active === i ? 'active' : ''}`}
                  onClick={() => switchTo(i)}
                  data-hover
                >
                  <span className="t-nav-name label">{testimonials[i].name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={cardRef} className="testimonial-main glass">
          <div className="testimonial-body">
            <div className="t-quote-mark">"</div>
            <blockquote className="t-quote">{t.quote}</blockquote>
            <div className="t-stars">
              {Array(t.rating).fill('★').map((s, i) => <span key={i} className="star">{s}</span>)}
            </div>
          </div>
          <div className="testimonial-author">
            <div className="t-avatar">{t.avatar}</div>
            <div className="t-info">
              <div className="t-name">{t.name}</div>
              <div className="label t-role">{t.role}, {t.company}</div>
            </div>
            <div className="t-index label">{String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</div>
          </div>
        </div>

        {/* Logos */}
        <div className="logos-section">
          <p className="label logos-label">Empresas que han confiado en NEXUS</p>
          <div className="logos-track">
            {logos.map(l => (
              <div className="logo-item" key={l} data-hover>
                <span className="logo-name">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
