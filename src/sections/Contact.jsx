import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);

  const DESTINATION_EMAIL = "guerraramireznilton@gmail.com";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-head > *",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-head", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-grid > *",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const update = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      project: "",
      budget: "",
      message: "",
    });
    setFocused(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Completa nombre, correo y mensaje.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://formsubmit.co/ajax/${DESTINATION_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            project: form.project,
            budget: form.budget,
            message: form.message,
            _subject: "Nuevo mensaje desde tu web",
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No se pudo enviar el formulario.");
      }

      setSent(true);
      resetForm();
    } catch (err) {
      setError(
        err.message || "Ocurrió un error al enviar. Inténtalo nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="contact section noise" id="contacto">
      <div className="contact-glow" />

      <div className="container">
        <div className="contact-head">
          <div className="pill">
            <span className="dot" />
            <span>Hablemos</span>
          </div>

          <h2 className="display-md">
            Tu próximo proyecto
            <br />
            <em style={{ fontStyle: "normal", color: "var(--accent)" }}>
              empieza aquí
            </em>
          </h2>

          <p className="body-lg contact-tagline">
            Cuéntanos tu idea. Respondemos en menos de 24 horas
            <br />
            con un plan de acción concreto, sin venta agresiva.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-col">
            <div className="contact-info-block">
              <span
                className="label"
                style={{ marginBottom: "0.75rem", display: "block" }}
              >
                Escríbenos
              </span>
              <a
                href={`mailto:${DESTINATION_EMAIL}`}
                className="contact-big-link"
              >
                {DESTINATION_EMAIL}
              </a>
            </div>

            <div className="contact-info-block">
              <span
                className="label"
                style={{ marginBottom: "0.75rem", display: "block" }}
              >
                Llámanos
              </span>
              <a href="tel:+51999000000" className="contact-big-link">
                +51 999 000 000
              </a>
            </div>

            <div className="contact-info-block">
              <span
                className="label"
                style={{ marginBottom: "0.75rem", display: "block" }}
              >
                Ubicación
              </span>
              <span
                className="contact-big-link"
                style={{
                  cursor: "default",
                  fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
                }}
              >
                Lima, Perú
                <br />
                <span
                  style={{ color: "var(--white-dim)", fontSize: "0.85rem" }}
                >
                  Disponibles globalmente en remoto
                </span>
              </span>
            </div>

            <div className="contact-social">
              <a
                href={`mailto:${DESTINATION_EMAIL}?subject=Quiero%20trabajar%20con%20ustedes`}
                className="social-link"
                data-hover
                aria-label="Gmail"
                target="_blank"
                rel="noreferrer"
              >
                <SiGmail />
              </a>

              <a
                href="https://www.instagram.com/og__nilthon/"
                className="social-link"
                data-hover
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.facebook.com/nilthon.guerra.7"
                className="social-link"
                data-hover
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="social-link"
                data-hover
                aria-label="X"
              >
                <FaXTwitter />
              </a>
            </div>

            <div className="contact-availability glass">
              <div className="availability-dot" />
              <div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    marginBottom: "0.2rem",
                  }}
                >
                  Disponibles para nuevos proyectos
                </div>
                <div className="label">Inicio: Julio 2025</div>
              </div>
            </div>
          </div>

          <div className="contact-form-col">
            {!sent ? (
              <form className="contact-form glass" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div
                    className={`form-group ${focused === "name" ? "focused" : ""} ${form.name ? "has-value" : ""}`}
                  >
                    <label htmlFor="name">Nombre completo</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={update("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="María García"
                      required
                    />
                  </div>

                  <div
                    className={`form-group ${focused === "email" ? "focused" : ""} ${form.email ? "has-value" : ""}`}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={update("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="maria@empresa.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div
                    className={`form-group ${focused === "company" ? "focused" : ""} ${form.company ? "has-value" : ""}`}
                  >
                    <label htmlFor="company">Empresa (opcional)</label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={update("company")}
                      onFocus={() => setFocused("company")}
                      onBlur={() => setFocused(null)}
                      placeholder="Mi Empresa S.A."
                    />
                  </div>

                  <div
                    className={`form-group ${focused === "budget" ? "focused" : ""} ${form.budget ? "has-value" : ""}`}
                  >
                    <label htmlFor="budget">Presupuesto</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={update("budget")}
                      onFocus={() => setFocused("budget")}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="">Selecciona un rango</option>
                      <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                      <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                      <option value="$15,000 – $50,000">
                        $15,000 – $50,000
                      </option>
                      <option value="+$50,000">+$50,000</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`form-group ${focused === "project" ? "focused" : ""} ${form.project ? "has-value" : ""}`}
                >
                  <label htmlFor="project">Tipo de proyecto</label>
                  <select
                    id="project"
                    name="project"
                    value={form.project}
                    onChange={update("project")}
                    onFocus={() => setFocused("project")}
                    onBlur={() => setFocused(null)}
                  >
                    <option value="">¿En qué podemos ayudarte?</option>
                    <option value="Diseño de marca e identidad visual">
                      Diseño de marca e identidad visual
                    </option>
                    <option value="Desarrollo web (sitio o landing)">
                      Desarrollo web (sitio o landing)
                    </option>
                    <option value="Aplicación o software a medida">
                      Aplicación o software a medida
                    </option>
                    <option value="SEO y posicionamiento orgánico">
                      SEO y posicionamiento orgánico
                    </option>
                    <option value="Asesoría estratégica digital">
                      Asesoría estratégica digital
                    </option>
                    <option value="Proyecto completo (todo lo anterior 🚀)">
                      Proyecto completo (todo lo anterior 🚀)
                    </option>
                  </select>
                </div>

                <div
                  className={`form-group ${focused === "message" ? "focused" : ""} ${form.message ? "has-value" : ""}`}
                >
                  <label htmlFor="message">Cuéntanos tu proyecto</label>
                  <textarea
                    id="message"
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={update("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Describe brevemente tu idea, objetivos y cualquier detalle relevante..."
                    required
                  />
                </div>

                {error && (
                  <p
                    className="label"
                    style={{
                      color: "#ff6b6b",
                      marginTop: "0.25rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <span>{loading ? "Enviando..." : "Enviar mensaje"}</span>
                  {!loading && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M1 13L13 1M13 1H4M13 1V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                <p className="form-disclaimer label">
                  Sin spam. Sin venta agresiva. Solo una conversación honesta
                  sobre tu proyecto.
                </p>
              </form>
            ) : (
              <div className="contact-success glass">
                <div className="success-ring">
                  <div className="success-icon-inner">✓</div>
                </div>

                <h3 className="display-md">Recibido.</h3>

                <p className="body-lg">
                  Gracias. Tu mensaje llegó.
                  <br />
                  Te respondemos antes de 24h con un plan concreto.
                </p>

                <div className="success-meta label">
                  El mensaje fue enviado a: {DESTINATION_EMAIL}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}