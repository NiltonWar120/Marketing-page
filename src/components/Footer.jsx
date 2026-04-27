import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from 'react-icons/fa6'
import { SiGmail } from 'react-icons/si'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  Servicios: ['Diseño UI/UX', 'Desarrollo Web', 'SEO', 'Software a Medida', 'Asesoría Estratégica'],
  Empresa: ['Sobre Nosotros', 'Trabajo', 'Proceso', 'Blog', 'Carreras'],
  Legal: ['Privacidad', 'Términos', 'Cookies'],
}

const socialLinks = [
  { name: 'Gmail', icon: <SiGmail size={18} />, url: 'mailto:guerraramireznilton@gmail.com?subject=Quiero%20trabajar%20con%20ustedes' },
  { name: 'Instagram', icon: <FaInstagram size={18} />, url: 'https://www.instagram.com/og__nilthon/' },
  { name: 'Facebook', icon: <FaFacebookF size={18} />, url: 'https://www.facebook.com/nilthon.guerra.7' },
  { name: 'X', icon: <FaXTwitter size={18} />, url: '#' },
]

export default function Footer() {
  const footerRef = useRef(null)
  const bigTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bigTextRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer ref={footerRef} className="footer" id="footer">
      <div className="footer-bg-text" ref={bigTextRef} aria-hidden>
        VENTAS FLOW
      </div>

      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div
              className="footer-logo"
              style={{ cursor: 'pointer' }}
              onClick={scrollTop}
            >
              <span className="logo-mark-f">N</span>
              <span className="logo-text-f">VENTASFLOW</span>
            </div>

            <p className="footer-tagline">
              Diseño, desarrollo y estrategia para marcas que no quieren ser promedio.
            </p>

            <div className="footer-social">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="footer-social-btn glass"
                  aria-label={s.name}
                  data-hover
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-grid">
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col} className="footer-col">
                <span className="label footer-col-head">{col}</span>
                <ul>
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="footer-link">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="label">
  © {new Date().getFullYear()} VENTASFLOW Digital Agency · Lima, Perú 🇵🇪
</span>
          <span className="label footer-crafted">Crafted with GN studio</span>

          <button className="back-to-top" onClick={scrollTop} data-hover>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 12V4M8 4L4 8M8 4L12 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="label">Top</span>
          </button>
        </div>
      </div>
    </footer>
  )
}