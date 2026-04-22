import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import HeroCanvas from '../components/HeroCanvas'
import './Hero.css'

gsap.registerPlugin(SplitText)

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)
  const scrollRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 })

      // Badge
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      // Headline split
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'lines,chars' })
        tl.fromTo(split.chars,
          { opacity: 0, y: 100, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power4.out', stagger: 0.015 },
          '-=0.3'
        )
      }

      tl.fromTo(subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )

      tl.fromTo(ctaRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
        '-=0.3'
      )

      tl.fromTo(statsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
        '-=0.2'
      )

      tl.fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        '-=0.3'
      )

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero section noise" id="hero">
      <HeroCanvas />

      <div className="hero-gradient" />

      <div className="container hero-content">
        <div ref={badgeRef} className="pill" style={{ opacity: 0 }}>
          <span className="dot" />
          <span>Agencia Digital Premium — Lima, Perú</span>
        </div>

        <h1 ref={headlineRef} className="hero-headline display-xl" >
          Creamos<br />
          <em style={{ color: 'var(--accent)'}}>el futuro</em><br />
          digital
        </h1>

        <p ref={subRef} className="hero-sub body-lg" style={{ opacity: 0 }}>
          Diseño, tecnología y estrategia al más alto nivel.<br />
          Construimos marcas que dominan su industria.
        </p>

        <div ref={ctaRef} className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Iniciar proyecto</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn-outline" onClick={() => document.getElementById('trabajo')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Ver trabajo</span>
          </button>
        </div>

        <div ref={statsRef} className="hero-stats">
          {[
            { num: '+80', label: 'Proyectos entregados' },
            { num: '100%', label: 'Clientes satisfechos' },
            { num: '+5', label: 'Años de experiencia' },
            { num: '3×', label: 'ROI promedio' },
          ].map(s => (
            <div className="hero-stat" key={s.num}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-label label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="scroll-indicator" style={{ opacity: 0 }}>
        <span className="label">Scroll</span>
        <div className="scroll-line"><div className="scroll-line-fill" /></div>
      </div>

      {/* Marquee */}
      <div className="hero-marquee">
        <div className="marquee-track">
          {Array(3).fill(['DISEÑO', 'DESARROLLO', 'SEO', 'SOFTWARE', 'ESTRATEGIA', '—']).flat().map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
