import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './Navbar.css'

const links = ['Servicios', 'Trabajo', 'Proceso', 'Nosotros', 'Contacto']

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="logo-mark">N</span>
          <span className="logo-text">NEXUS</span>
        </div>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link}>
              <button onClick={() => scrollTo(link)} className="nav-link">
                <span>{link}</span>
                <span className="nav-link-hover">{link}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="btn-primary nav-cta" onClick={() => scrollTo('Contacto')}>
            <span>Empecemos</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {links.map((link, i) => (
            <li key={link} style={{ '--i': i }}>
              <button onClick={() => scrollTo(link)}>{link}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
