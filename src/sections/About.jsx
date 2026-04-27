import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)

  const imageUrl =
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal line expand
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )

      // Image parallax
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      // Text reveal
      gsap.fromTo(
        textRef.current.querySelectorAll('.about-reveal'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: textRef.current, start: 'top 75%' }
        }
      )

      // Floating numbers
      gsap.to('.about-float', {
        y: -20,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about section" id="nosotros">
      <div className="about-line-wrap">
        <div ref={lineRef} className="about-line" />
      </div>

      <div className="container about-inner">
        <div className="about-visual">
          <div className="about-img-wrap" ref={imgRef}>
            <img
              src={imageUrl}
              alt="Equipo creativo de VENTASFLOW"
              className="about-img"
              loading="lazy"
            />

            <div className="about-img-overlay" />

            <div className="about-float float-1">
              <span
                className="display-md"
                style={{ color: 'var(--accent)', opacity: 0.6 }}
              >
                N
              </span>
            </div>

            <div className="about-float float-2">
              <span
                className="label"
                style={{ color: 'var(--white-dim)' }}
              >
                Est. 2019
              </span>
            </div>
          </div>

          <div className="about-year-badge glass">
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3rem',
                lineHeight: 1,
                color: 'var(--accent)'
              }}
            >
              5+
            </span>
            <span className="label">
              Años de
              <br />
              excelencia
            </span>
          </div>
        </div>

        <div className="about-text" ref={textRef}>
          <div
            className="about-reveal pill"
            style={{ marginBottom: '2rem', opacity: 0 }}
          >
            <span className="dot" />
            <span>Sobre VENTAS FLOW</span>
          </div>

          <h2
            className="about-reveal display-md"
            style={{ opacity: 0, marginBottom: '2rem' }}
          >
            No hacemos sitios web.
            <br />
            <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>
              Construimos activos digitales.
            </em>
          </h2>

          <p
            className="about-reveal body-lg"
            style={{ opacity: 0, marginBottom: '1.5rem' }}
          >
            Somos un equipo de diseñadores, desarrolladores y estrategas apasionados por el detalle. Trabajamos con marcas que no quieren ser normales.
          </p>

          <p
            className="about-reveal body-lg"
            style={{ opacity: 0, marginBottom: '3rem' }}
          >
            Cada proyecto es una oportunidad de superar expectativas. No aceptamos mediocridad, ni en el diseño ni en los resultados.
          </p>

          <div className="about-reveal about-values" style={{ opacity: 0 }}>
            {[
              'Obsesión por el detalle',
              'Resultados antes que estética',
              'Transparencia total',
              'Entrega sin excusas'
            ].map((v, i) => (
              <div className="value-item" key={i}>
                <div className="value-check">✓</div>
                <span>{v}</span>
              </div>
            ))}
          </div>

          <div className="about-reveal" style={{ opacity: 0, marginTop: '3rem' }}>
            <button className="btn-primary">
              <span>Conoce al equipo</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 13L13 1M13 1H4M13 1V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}