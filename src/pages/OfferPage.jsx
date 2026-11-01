import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { offers } from '../data/offers'
import { getProject } from '../data/projects'
import { site } from '../data/site'
import ProjectMock from '../components/ProjectMock'
import { Back, PageCta } from '../components/PageParts'
import { ArrowRight } from '../components/ui'
import s from './Page.module.css'

const subjects = { 'site-vitrine': 'Création de site vitrine', 'application-web': 'Application web / SaaS' }

export default function OfferPage({ id }) {
  const o = offers[id]
  const rel = getProject(o.related)
  const devis = `/?sujet=${encodeURIComponent(subjects[id])}#contact`

  return (
    <>
      <Helmet>
        <title>{o.seoTitle}</title>
        <meta name="description" content={o.seoDesc} />
        <link rel="canonical" href={`https://gf-web.fr/${id}`} />
      </Helmet>

      <section className={`wrap ${s.pageHero}`}>
        <Back to="/#tarifs">Retour aux tarifs</Back>
        <div className={s.heroSplit}>
          <div>
            <p className={s.kicker}>Développement web</p>
            <h1 className="h1">{o.title}</h1>
            <p className={`lead ${s.heroLead}`}>{o.tagline}</p>
            <div className={s.heroActions}>
              <Link to={devis} className="btn btn-cobalt">Demander un devis <ArrowRight /></Link>
            </div>
          </div>
          <div className={`${s.priceBox} on-blue blueprint`}>
            <p className={s.priceFrom}>À partir de</p>
            <p className={s.priceBig}>{o.price}</p>
            <p className={s.priceMonthly}>{o.monthly}</p>
            <dl className={s.meta} style={{ marginTop: 28, borderTopColor: 'rgba(255,255,255,.5)' }}>
              <div style={{ borderBottomColor: 'var(--on-blue-line)' }}><dt style={{ color: 'var(--on-blue-2)' }}>Pour</dt><dd>{o.for}</dd></div>
              <div style={{ borderBottomColor: 'var(--on-blue-line)' }}><dt style={{ color: 'var(--on-blue-2)' }}>Délai</dt><dd>{o.delay}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={s.sectionHead}><h2 className="h2">Ce que vous obtenez</h2></div>
        <div className={s.features}>
          {o.features.map((f) => (
            <div key={f.title} className={s.feature}>
              <h3 className={s.featureTitle}>{f.title}</h3>
              <p className={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section on-night">
        <div className="wrap">
          <div className={s.sectionHead}><h2 className="h2">Comment ça se passe</h2></div>
          <ol className={s.steps} style={{ '--n': o.steps.length }}>
            {o.steps.map((st) => (
              <li key={st.title} className={s.step}>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepDesc}>{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {rel && (
        <section className="section wrap">
          <div className={s.split} style={{ alignItems: 'center' }}>
            <div>
              <p className={s.kicker}>Un exemple réalisé</p>
              <h2 className="h2">{rel.name}</h2>
              <p className={`lead ${s.heroLead}`}>{rel.summary}</p>
              <div className={s.heroActions}><Link to={`/realisations/${rel.slug}`} className="btn btn-ghost">Voir le projet <ArrowRight /></Link></div>
            </div>
            <Link to={`/realisations/${rel.slug}`} tabIndex={-1} aria-hidden="true"><ProjectMock project={rel} /></Link>
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <p className={s.tableNote}>{site.tva} Tous les projets font l’objet d’un devis personnalisé gratuit.</p>
      </section>

      <PageCta
        title="Intéressé ?"
        sub="Décrivez votre projet en quelques lignes. Je vous réponds sous 24 h avec un devis gratuit et sans engagement."
        subject={subjects[id]}
      />
    </>
  )
}
