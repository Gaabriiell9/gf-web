import { Link } from 'react-router-dom'
import { services } from '../data/site'
import { ArrowRight } from './ui'
import s from './Services.module.css'

const icons = {
  monitor: <path d="M3 5h18v11H3zM8 20h8M12 16v4" />,
  bag: <path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 016 0v2" />,
  layers: <path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" />,
  cpu: <path d="M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />,
}

export default function Services() {
  return (
    <>
      <section className={`section center ${s.intro}`}>
        <div className="wrap reveal">
          <p className="kicker">BESOIN D’UN DÉVELOPPEUR WEB ?</p>
          <h2 className="h2">Un site qui vous ressemble et qui vous amène des clients</h2>
          <p className={`lead ${s.introText}`}>
            Je conçois et je développe des sites internet sur mesure pour les artisans, commerçants,
            associations et entreprises. Un seul interlocuteur, de l’idée à la mise en ligne,
            et je reste disponible après.
          </p>
        </div>
      </section>

      <section className="section soft" id="services" aria-labelledby="services-titre">
        <div className="wrap">
          <div className="center reveal">
            <p className="kicker">MES SERVICES</p>
            <h2 id="services-titre" className="h2">Ce que je peux faire pour vous</h2>
          </div>
          <div className={s.grid}>
            {services.map((sv) => (
              <article key={sv.id} className={`${s.card} reveal`}>
                <span className={s.icon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[sv.icon]}</svg>
                </span>
                <h3 className="h3">{sv.title}</h3>
                <p className={s.desc}>{sv.desc}</p>
                {sv.to && <Link to={sv.to} className={`link ${s.more}`}>En savoir plus <ArrowRight /></Link>}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
