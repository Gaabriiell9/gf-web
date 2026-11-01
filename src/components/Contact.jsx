import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { ArrowRight } from './ui'
import s from './Contact.module.css'

const SUBJECTS = [
  'Création de site vitrine',
  'Application web / SaaS',
  'E-commerce',
  'Réparation PC',
  'Montage PC',
  'Maintenance & support',
  'Autre',
]

export default function Contact() {
  const { search } = useLocation()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  useEffect(() => {
    const wanted = new URLSearchParams(search).get('sujet')
    if (wanted && SUBJECTS.includes(wanted)) setForm((f) => ({ ...f, subject: wanted }))
  }, [search])

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
    <section className={`section blueprint on-blue ${s.section}`} id="contact" aria-labelledby="contact-titre">
      <div className={`wrap ${s.grid}`}>
        <div className={s.left}>
          <h2 id="contact-titre" className="h1">Parlons de votre projet.</h2>
          <p className={`lead ${s.intro}`}>
            Un site à créer, une boutique à lancer, un ordinateur à réparer ? Décrivez votre besoin,
            je vous réponds sous 24 h avec un devis gratuit.
          </p>
          <dl className={s.info}>
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${site.email}`} className="tlink">{site.email}</a></dd>
            </div>
            <div>
              <dt>Basé à</dt>
              <dd>Bordeaux, et à distance partout en France et DOM-TOM</dd>
            </div>
            <div>
              <dt>Disponibilité</dt>
              <dd className={s.available}><span className={s.dot} aria-hidden="true" />Disponible pour un nouveau projet</dd>
            </div>
          </dl>
        </div>

        <div className={s.card}>
          {status === 'success' ? (
            <div className={s.success} role="status">
              <span className={s.successIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <h3>Message envoyé</h3>
              <p>Merci. Vous recevez une confirmation par email et je vous réponds sous 24 h.</p>
              <button type="button" onClick={() => setStatus('idle')} className="btn btn-ghost">Écrire un autre message</button>
            </div>
          ) : (
            <form className={s.form} onSubmit={submit} noValidate={false}>
              <div className={s.row}>
                <div className={s.field}>
                  <label htmlFor="name">Nom et prénom</label>
                  <input id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handle} required />
                </div>
                <div className={s.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handle} required />
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="subject">Sujet</label>
                <div className={s.selectWrap}>
                  <select id="subject" name="subject" value={form.subject} onChange={handle} required>
                    <option value="">Choisir un sujet</option>
                    {SUBJECTS.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div className={s.field}>
                <label htmlFor="message">Votre besoin</label>
                <textarea id="message" name="message" rows={6} placeholder="Votre activité, ce que vous souhaitez, vos délais..." value={form.message} onChange={handle} required />
              </div>
              {status === 'error' && (
                <p className={s.error} role="alert">
                  Le message n’est pas parti. Réessayez, ou écrivez directement à {site.email}.
                </p>
              )}
              <button type="submit" className={`btn btn-cobalt ${s.submit}`} disabled={status === 'loading'}>
                {status === 'loading' ? <><span className={s.spinner} aria-hidden="true" />Envoi en cours</> : <>Envoyer le message <ArrowRight /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
