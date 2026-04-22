import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', project: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-head > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-head', start: 'top 80%' },
        }
      )
      gsap.fromTo('.contact-grid > *',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = () => {
    if (!form.name || !form.email) return
    setSent(true)
  }

  return (
    <section ref={sectionRef} className="contact section noise" id="contacto">
      <div className="contact-glow" />
      <div className="container">
        <div className="contact-head">
          <div className="pill"><span className="dot" /><span>Hablemos</span></div>
          <h2 className="display-md">
            Tu próximo proyecto<br />
            <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>empieza aquí</em>
          </h2>
          <p className="body-lg contact-tagline">
            Cuéntanos tu idea. Respondemos en menos de 24 horas<br />con un plan de acción concreto, sin venta agresiva.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: info */}
          <div className="contact-info-col">
            <div className="contact-info-block">
              <span className="label" style={{ marginBottom: '0.75rem', display: 'block' }}>Escríbenos</span>
              <a href="mailto:hola@nexus.pe" className="contact-big-link">hola@nexus.pe</a>
            </div>
            <div className="contact-info-block">
              <span className="label" style={{ marginBottom: '0.75rem', display: 'block' }}>Llámanos</span>
              <a href="tel:+51999000000" className="contact-big-link">+51 999 000 000</a>
            </div>
            <div className="contact-info-block">
              <span className="label" style={{ marginBottom: '0.75rem', display: 'block' }}>Ubicación</span>
              <span className="contact-big-link" style={{ cursor: 'default', fontSize: 'clamp(1rem, 1.4vw, 1.4rem)' }}>
                Lima, Perú<br />
                <span style={{ color: 'var(--white-dim)', fontSize: '0.85rem' }}>Disponibles globalmente en remoto</span>
              </span>
            </div>

            <div className="contact-social">
              {['LinkedIn', 'Instagram', 'Facebook'].map(s => (
                <a key={s} href="#" className="social-link" data-hover>{s}</a>
              ))}
            </div>

            <div className="contact-availability glass">
              <div className="availability-dot" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.2rem' }}>
                  Disponibles para nuevos proyectos
                </div>
                <div className="label">Inicio: Julio 2025</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-col">
            {!sent ? (
              <div className="contact-form glass">
                <div className="form-row">
                  <div className={`form-group ${focused === 'name' ? 'focused' : ''} ${form.name ? 'has-value' : ''}`}>
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="María García"
                    />
                  </div>
                  <div className={`form-group ${focused === 'email' ? 'focused' : ''} ${form.email ? 'has-value' : ''}`}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="maria@empresa.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className={`form-group ${focused === 'company' ? 'focused' : ''} ${form.company ? 'has-value' : ''}`}>
                    <label>Empresa (opcional)</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={update('company')}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                      placeholder="Mi Empresa S.A."
                    />
                  </div>
                  <div className={`form-group ${focused === 'budget' ? 'focused' : ''} ${form.budget ? 'has-value' : ''}`}>
                    <label>Presupuesto</label>
                    <select
                      value={form.budget}
                      onChange={update('budget')}
                      onFocus={() => setFocused('budget')}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Selecciona un rango</option>
                      <option>$2,000 – $5,000</option>
                      <option>$5,000 – $15,000</option>
                      <option>$15,000 – $50,000</option>
                      <option>+$50,000</option>
                    </select>
                  </div>
                </div>

                <div className={`form-group ${focused === 'project' ? 'focused' : ''} ${form.project ? 'has-value' : ''}`}>
                  <label>Tipo de proyecto</label>
                  <select
                    value={form.project}
                    onChange={update('project')}
                    onFocus={() => setFocused('project')}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="">¿En qué podemos ayudarte?</option>
                    <option>Diseño de marca e identidad visual</option>
                    <option>Desarrollo web (sitio o landing)</option>
                    <option>Aplicación o software a medida</option>
                    <option>SEO y posicionamiento orgánico</option>
                    <option>Asesoría estratégica digital</option>
                    <option>Proyecto completo (todo lo anterior 🚀)</option>
                  </select>
                </div>

                <div className={`form-group ${focused === 'message' ? 'focused' : ''} ${form.message ? 'has-value' : ''}`}>
                  <label>Cuéntanos tu proyecto</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Describe brevemente tu idea, objetivos y cualquier detalle relevante..."
                  />
                </div>

                <button className="btn-primary form-submit" onClick={handleSubmit}>
                  <span>Enviar mensaje</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <p className="form-disclaimer label">
                  Sin spam. Sin venta agresiva. Solo una conversación honesta sobre tu proyecto.
                </p>
              </div>
            ) : (
              <div className="contact-success glass">
                <div className="success-ring">
                  <div className="success-icon-inner">✓</div>
                </div>
                <h3 className="display-md">Recibido.</h3>
                <p className="body-lg">
                  Gracias, {form.name.split(' ')[0]}. Tu mensaje llegó.<br />
                  Te respondemos antes de 24h con un plan concreto.
                </p>
                <div className="success-meta label">
                  Enviado desde: {form.email}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
