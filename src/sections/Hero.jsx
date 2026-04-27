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
  const avatarRef = useRef(null)

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

      if (avatarRef.current) {
  tl.fromTo(
    avatarRef.current,
    { opacity: 0, scale: 0.85, y: 40, rotate: -6 },
    { opacity: 1, scale: 1, y: 0, rotate: 0, duration: 1, ease: 'power4.out' },
    '-=0.4'
  )

  gsap.to(avatarRef.current, {
    y: -18,
    rotate: 2,
    duration: 3.5,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
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
<div ref={avatarRef} className="hero-avatar" aria-hidden="true">
  <div className="hero-avatar-glow" />
  <div className="hero-avatar-card">
    <img src="/assets/avatarmkt.png" alt="" />
  </div>
  <div className="hero-avatar-badge">
    <span className="dot" />
    <span>Marketing System</span>
  </div>
</div>
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
