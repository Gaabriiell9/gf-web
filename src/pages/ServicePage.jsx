import { Helmet } from 'react-helmet-async'
import { Back, PageCta } from '../components/PageParts'
import s from './Page.module.css'

export default function ServicePage({ data: d, kind }) {
  const path = kind === 'repair' ? 'reparation-pc' : 'montage-pc'
  return (
    <>
      <Helmet>
        <title>{d.seoTitle}</title>
        <meta name="description" content={d.seoDesc} />
        <link rel="canonical" href={`https://gf-web.fr/${path}`} />
      </Helmet>

      <section className={`wrap ${s.pageHero}`}>
        <Back />
        <p className={s.kicker}>{d.kicker}</p>
        <h1 className="h1">{d.title[0]}<br /><span className={s.titleMuted}>{d.title[1]}</span></h1>
        <p className={`lead ${s.heroLead}`}>{d.intro}</p>
        <ul className={s.pills}>{d.pills.map((p) => <li key={p}>{p}</li>)}</ul>
      </section>

      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className={s.sectionHead}>
            <h2 className="h2">{d.sectionTitle}</h2>
            <p className="lead">{d.sectionIntro}</p>
          </div>
          {kind === 'repair' ? (
            <div className={s.cards}>
              {d.cards.map((c) => (
                <article key={c.title} className={s.card}>
                  <h3 className={s.cardTitle}>{c.title}</h3>
                  <p className={s.cardDesc}>{c.desc}</p>
                  <ul className={s.tags}>{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </article>
              ))}
            </div>
          ) : (
            <div className={s.cards}>
              {d.builds.map((b, i) => (
                <article key={b.title} className={`${s.card} ${i === 0 ? s.cardBlue : ''}`}>
                  <h3 className={s.cardTitle}>{b.title}</h3>
                  <p className={s.cardDesc}>{b.desc}</p>
                  <ul className={s.tags}>{b.specs.map((t) => <li key={t}>{t}</li>)}</ul>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {d.steps && (
        <section className="section on-night">
          <div className="wrap">
            <div className={s.sectionHead}><h2 className="h2">Le montage, de A à Z</h2></div>
            <ol className={s.steps} style={{ '--n': d.steps.length }}>
              {d.steps.map((st) => (
                <li key={st.title} className={s.step}>
                  <h3 className={s.stepTitle}>{st.title}</h3>
                  <p className={s.stepDesc}>{st.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="section wrap">
        <div className={s.split}>
          <div>
            <h2 className="h2">Tarifs indicatifs</h2>
            {d.pricingIntro && <p className={`lead ${s.heroLead}`}>{d.pricingIntro}</p>}
          </div>
          <div>
            <div className={s.table}>
              {d.pricing.map((r) => (
                <div key={r.label} className={s.tableRow}><span>{r.label}</span><span>{r.price}</span></div>
              ))}
            </div>
            <p className={s.tableNote}>{d.pricingNote}</p>
          </div>
        </div>
      </section>

      <PageCta title={d.ctaTitle} sub={d.ctaSub} subject={d.subject} label="Prendre contact" />
    </>
  )
}
