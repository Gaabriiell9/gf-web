import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { projects, getProject, shots } from '../data/projects'
import { Laptop, Phone } from '../components/Devices'
import { Back, Cta } from '../components/PageParts'
import { ArrowRight, ArrowUpRight } from '../components/ui'
import { useReveal } from '../hooks/useReveal'
import NotFound from './NotFound'
import s from './Page.module.css'

export default function ProjectPage() {
  const { slug } = useParams()
  const p = getProject(slug)
  useReveal([slug])
  if (!p) return <NotFound />
  const sh = shots(p)
  const next = projects[(projects.indexOf(p) + 1) % projects.length]

  return (
    <>
      <Helmet>
        <title>{`${p.name} | Réalisation GF Web`}</title>
        <meta name="description" content={`${p.summary} Projet conçu et développé par GF Web, développeur web à Bordeaux.`} />
        <link rel="canonical" href={`https://gf-web.fr/realisations/${p.slug}`} />
      </Helmet>

      <section className={`wrap ${s.pageHero}`}>
        <Back to="/#realisations">Toutes les réalisations</Back>
        <div className={s.split}>
          <div>
            <p className="kicker">{p.type.toUpperCase()}</p>
            <h1 className="h1">{p.name}</h1>
            <p className={`lead ${s.heroLead}`}>{p.summary}</p>
            <div className={s.actions}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn">Visiter le site <ArrowUpRight /><span className="sr-only"> (nouvel onglet)</span></a>
            </div>
          </div>
          <dl className={s.meta}>
            <div><dt>Projet</dt><dd>{p.type}</dd></div>
            <div><dt>Pour</dt><dd>{p.client}</dd></div>
            <div><dt>Adresse</dt><dd><a href={p.url} target="_blank" rel="noopener noreferrer">{p.domain}</a></dd></div>
          </dl>
        </div>
      </section>

      <section className="soft" style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="wrap">
          <div className={s.devices}>
            <Laptop src={sh.desktop} alt={`Page d’accueil de ${p.name} sur ordinateur`} eager />
            <Phone src={sh.mobile} alt={`Page d’accueil de ${p.name} sur téléphone`} className={s.devicesPhone} eager />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className={`${s.split} reveal`}>
          <h2 className="h2">Le besoin</h2>
          <p className="lead">{p.context}</p>
        </div>
        <div className="reveal" style={{ marginTop: 'var(--section)' }}>
          <h2 className="h2">Ce que j’ai réalisé</h2>
          <div className={s.cards}>
            {p.built.map((b) => (
              <div key={b.title} className={s.card}><h3 className="h3">{b.title}</h3><p>{b.desc}</p></div>
            ))}
          </div>
        </div>
        <div className={`${s.split} reveal`} style={{ marginTop: 'var(--section)' }}>
          <h2 className="h2">Technologies</h2>
          <ul className={s.tags}>{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <Link to={`/realisations/${next.slug}`} className={`${s.next} reveal`} style={{ marginTop: 'var(--section)' }}>
          <span><span className={s.nextLabel}>Projet suivant</span><br /><span className={s.nextName}>{next.name}</span></span>
          <span className="link">Voir <ArrowRight /></span>
        </Link>
      </section>

      <Cta title={'Un projet comme celui‑ci ?'} />
    </>
  )
}
