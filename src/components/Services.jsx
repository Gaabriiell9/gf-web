import { services } from '../data/site'
import { SmartLink, ArrowUpRight } from './ui'
import s from './Services.module.css'

export default function Services() {
  return (
    <section className={`section ${s.section}`} id="services" aria-labelledby="services-titre">
      <div className="wrap">
        <div className={s.head}>
          <h2 id="services-titre" className="h2">Ce que je fais pour vous</h2>
          <p className="lead">
            Le web d’abord, mais aussi tout ce qui fait tourner une petite entreprise : serveurs,
            ordinateurs, automatisations. Un seul interlocuteur pour la technique.
          </p>
        </div>
        <ul className={s.list}>
          {services.map((sv) => (
            <li key={sv.id}>
              <SmartLink to={sv.to} className={s.row} aria-label={`${sv.title} : ${sv.linkLabel}`}>
                <h3 className={s.title}>{sv.title}</h3>
                <div className={s.more}>
                  <div className={s.moreInner}>
                    <p className={s.desc}>{sv.desc}</p>
                    <ul className={s.tags}>{sv.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                </div>
                <span className={s.go} aria-hidden="true"><ArrowUpRight /></span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
