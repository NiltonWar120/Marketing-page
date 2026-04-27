import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const AUTOPLAY_DELAY = 6500

const testimonials = [
  {
    name: 'Carlos Méndez',
    role: 'CEO',
    company: 'Vaultra Finance',
    quote:
      'VENTAS FLOW transformó completamente nuestra presencia digital. Pasamos de ser invisibles online a dominar las búsquedas de nuestro sector. ROI de 3x en los primeros 4 meses.',
    avatar: 'CM',
    rating: 5,
    metric: '3× ROI',
    category: 'Fintech',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Ana Robles',
    role: 'Directora General',
    company: 'Orbis Luxury',
    quote:
      'Un equipo que entiende el lujo, el detalle y los negocios al mismo tiempo. No solo diseñan sitios hermosos, construyen activos digitales reales que generan ventas.',
    avatar: 'AR',
    rating: 5,
    metric: '+68% ventas',
    category: 'Luxury',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Diego Paredes',
    role: 'CTO',
    company: 'Stratum SaaS',
    quote:
      'Código limpio, entrega a tiempo, comunicación impecable. Tres cosas raras en la industria. Los elegimos para construir nuestro producto y no nos arrepentimos ni un segundo.',
    avatar: 'DP',
    rating: 5,
    metric: '2 sem',
    category: 'SaaS',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop',
  },
  {
    name: 'Lucía Vargas',
    role: 'Directora de Marketing',
    company: 'Meridian Legal',
    quote:
      'En 6 meses nos llevaron al primer lugar de Google para nuestros keywords principales. El tráfico orgánico aumentó 450% y la calidad de leads mejoró radicalmente.',
    avatar: 'LV',
    rating: 5,
    metric: '+450%',
    category: 'Legal',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=900&auto=format&fit=crop',
  },
]

const logos = ['VAULTRA', 'ORBIS', 'STRATUM', 'MERIDIAN', 'APEX', 'LUMIS', 'KORA', 'FENIX']

export default function Testimonials() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const progressRef = useRef(null)

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive((current) => (current + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActive((current) => (current - 1 + testimonials.length) % testimonials.length)
  }, [])

  const goTo = useCallback((index) => {
    setActive(index)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-head > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-head',
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        '.testimonial-main',
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.testimonial-main',
            start: 'top 82%',
          },
        },
      )

      gsap.fromTo(
        '.logo-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.logos-section',
            start: 'top 85%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (paused) return undefined

    const timer = setTimeout(() => {
      next()
    }, 5000)

    return () => clearTimeout(timer)
  }, [active, paused, next])

  useEffect(() => {
    if (!cardRef.current) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.t-animate',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
        },
      )

      gsap.fromTo(
        '.testimonial-image',
        { opacity: 0.55, scale: 1.08, x: 20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.9,
          ease: 'power4.out',
        },
      )

      gsap.fromTo(
        '.testimonial-media-glow',
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        },
      )
    }, cardRef)

    return () => ctx.revert()
  }, [active])

  useEffect(() => {
    if (!progressRef.current) return

    gsap.killTweensOf(progressRef.current)
    gsap.set(progressRef.current, {
      scaleX: 0,
      transformOrigin: 'left center',
    })

    if (!paused) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: AUTOPLAY_DELAY / 1000,
        ease: 'none',
      })
    }
  }, [active, paused])

  const t = testimonials[active]

  return (
    <section ref={sectionRef} className="testimonials section" id="testimonios">
      <div className="container">
        <div className="testimonials-head">
          <div className="pill">
            <span className="dot" />
            <span>Clientes</span>
          </div>

          <div className="testimonials-head-row">
            <h2 className="display-md">
              Lo que dicen
              <br />
              <em>los que saben</em>
            </h2>

            <div className="testimonials-nav" aria-label="Seleccionar testimonio">
              {testimonials.map((item, i) => (
                <button
                  type="button"
                  key={item.name}
                  className={`t-nav-btn ${active === i ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-current={active === i ? 'true' : undefined}
                  data-hover
                >
                  <span className="t-nav-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t-nav-name">{item.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={cardRef}
          className="testimonial-main glass"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="testimonial-media">
            <div className="testimonial-media-glow" />
            <img
              key={t.image}
              src={t.image}
              alt={`Retrato de ${t.name}`}
              className="testimonial-image"
            />

            <div className="testimonial-media-card t-animate">
              <span className="label">Caso destacado</span>
              <strong>{t.metric}</strong>
              <small>{t.category}</small>
            </div>
          </div>

          <div className="testimonial-content">
            <div className="testimonial-progress" aria-hidden="true">
              <span ref={progressRef} />
            </div>

            <div className="testimonial-body">
              <div className="t-quote-mark t-animate">“</div>

              <blockquote className="t-quote t-animate">{t.quote}</blockquote>

              <div className="t-stars t-animate" aria-label={`${t.rating} estrellas`}>
                {Array.from({ length: t.rating }, (_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="testimonial-footer">
              <div className="testimonial-author t-animate">
                <div className="t-avatar">{t.avatar}</div>

                <div className="t-info">
                  <div className="t-name">{t.name}</div>
                  <div className="label t-role">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>

              <div className="testimonial-actions t-animate">
                <div className="t-index label">
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(testimonials.length).padStart(2, '0')}
                </div>

                <div className="carousel-controls">
                  <button
                    type="button"
                    className="carousel-btn"
                    onClick={prev}
                    aria-label="Testimonio anterior"
                    data-hover
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    className="carousel-btn"
                    onClick={next}
                    aria-label="Siguiente testimonio"
                    data-hover
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="logos-section">
          <p className="label logos-label">Empresas que han confiado en VENTAS FLOW</p>

          <div className="logos-track">
            {logos.map((l) => (
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