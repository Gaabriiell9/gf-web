import { SmartLink, ArrowLeft } from './ui'
import s from '../pages/Page.module.css'

export function Back({ to = '/', children = 'Retour à l’accueil' }) {
  return <SmartLink to={to} className={s.back}><ArrowLeft />{children}</SmartLink>
}

export function Cta({ title = 'Un projet en tête ?', text = 'Décrivez-moi votre besoin, je vous réponds rapidement.', subject }) {
  const to = subject ? `/?sujet=${encodeURIComponent(subject)}#contact` : '/#contact'
  return (
    <section className="section">
      <div className="wrap">
        <div className={s.cta}>
          <h2 className="h2">{title}</h2>
          <p>{text}</p>
          <SmartLink to={to} className="btn btn-white">Me contacter</SmartLink>
        </div>
      </div>
    </section>
  )
}
