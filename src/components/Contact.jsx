import { useEffect, useRef, useState } from 'react'
import styles from './Contact.module.css'

const SUBJECTS = [
  'Création de site vitrine',
  'Application web / SaaS',
  'E-commerce',
  'Maintenance & support',
  'Autre',
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.inner}>
        <div className={`${styles.left} reveal`}>
          <p className="section-label">Contact</p>
          <h2 className={styles.title}>
            Travaillons<br />ensemble
          </h2>
          <p className={styles.intro}>
            Un projet en tête ? Une question sur une prestation ?
            Décrivez votre besoin et je reviens vers vous sous 24h.
          </p>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a href="mailto:contact@gf-web.fr" className={styles.infoValue}>
                contact@gf-web.fr
              </a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Localisation</span>
              <span className={styles.infoValue}>Bordeaux, France</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Disponibilité</span>
              <span className={`${styles.infoValue} ${styles.available}`}>
                <span className={styles.dot} />
                Disponible
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles.right} reveal reveal-delay-2`}>
          {status === 'success' ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Message envoyé</h3>
              <p>Je reviendrai vers vous dans les plus brefs délais.</p>
              <button onClick={() => setStatus('idle')} className={styles.reset}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jean Dupont"
                    value={form.name}
                    onChange={handle}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean@exemple.fr"
                    value={form.email}
                    onChange={handle}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="subject">Sujet</label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handle}
                  required
                >
                  <option value="">Sélectionner un sujet</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Décrivez votre projet ou votre besoin..."
                  value={form.message}
                  onChange={handle}
                  required
                />
              </div>

              {status === 'error' && (
                <p className={styles.error}>
                  Une erreur est survenue. Réessayez ou contactez-moi directement par email.
                </p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className={styles.spinner} />
                ) : (
                  <>
                    Envoyer le message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
