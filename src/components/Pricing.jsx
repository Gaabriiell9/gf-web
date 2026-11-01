import { plans, site } from '../data/site'
import { SmartLink, ArrowRight } from './ui'
import s from './Pricing.module.css'

const Check = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={s.check}>
    <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Pricing() {
  return (
    <section className={`section ${s.section}`} id="tarifs" aria-labelledby="tarifs-titre">
      <div className="wrap">
        <div className={s.head}>
          <h2 id="tarifs-titre" className="h2">Des prix clairs, annoncés avant de commencer</h2>
          <p className="lead">Chaque projet fait l’objet d’un devis gratuit et personnalisé. Vous savez exactement ce que vous payez, et pourquoi.</p>
        </div>
        <div className={s.grid}>
          {plans.map((p) => (
            <article key={p.name} className={`${s.card} ${p.featured ? `${s.featured} on-blue` : ''}`}>
              {p.featured && <p className={s.badge}>Le plus demandé</p>}
              <h3 className={s.name}>{p.name}</h3>
              <p className={s.from}>{p.from}</p>
              <p className={s.price}>{p.price}</p>
              {p.monthly && <p className={s.monthly}>{p.monthly}</p>}
              <p className={s.desc}>{p.desc}</p>
              <ul className={s.items}>
                {p.items.map((it) => <li key={it}><Check />{it}</li>)}
              </ul>
              <SmartLink to={p.to} className={`btn ${p.featured ? 'btn-signal' : 'btn-ghost'} ${s.cta}`}>
                {p.cta} <ArrowRight />
              </SmartLink>
            </article>
          ))}
        </div>
        <p className={s.note}>{site.tva} Franchise en base de TVA.</p>
      </div>
    </section>
  )
}
