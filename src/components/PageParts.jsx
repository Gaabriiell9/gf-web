import { Link } from 'react-router-dom'
import { SmartLink, ArrowLeft, ArrowRight } from './ui'
import s from '../pages/Page.module.css'

export function Back({ to = '/', children = 'Retour à l’accueil' }) {
  return <SmartLink to={to} className={s.back}><ArrowLeft />{children}</SmartLink>
}

export function PageCta({ title, sub, subject, label = 'Demander un devis' }) {
  const to = subject ? `/?sujet=${encodeURIComponent(subject)}#contact` : '/#contact'
  return (
    <section className={`${s.ctaBand} blueprint on-blue`}>
      <div className={`wrap ${s.ctaInner}`}>
        <h2 className="h2">{title}</h2>
        <div>
          <p className="lead">{sub}</p>
          <Link to={to} className="btn btn-white">{label} <ArrowRight /></Link>
        </div>
      </div>
    </section>
  )
}
