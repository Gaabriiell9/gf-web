import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import s from './Page.module.css'

export default function NotFound() {
  return (
    <section className={`${s.pageHero} wrap`}>
      <Helmet><title>Page introuvable | GF Web</title><meta name="robots" content="noindex" /></Helmet>
      <h1 className="h1">Cette page n’existe pas.</h1>
      <p className={`lead ${s.heroLead}`}>Le lien est peut-être ancien, ou l’adresse contient une faute de frappe.</p>
      <div className={s.heroActions}><Link to="/" className="btn">Retour à l’accueil</Link></div>
    </section>
  )
}
