import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { projects, getProject } from '../data/projects'
import ProjectMock from '../components/ProjectMock'
import { Back, PageCta } from '../components/PageParts'
import { ArrowRight, ArrowUpRight } from '../components/ui'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import NotFound from './NotFound'
import s from './Page.module.css'

export default function ProjectPage() {
  const { slug } = useParams()
  const p = getProject(slug)
  const root = useRef(null)

  useGsap(() => {
    if (!p || prefersReducedMotion()) return
    const q = gsap.utils.selector(root)
    gsap.from(q('[data-line]'), { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.08, delay: 0.1 })
    gsap.fromTo(q('[data-mock]'), { scale: 0.86, y: 40 }, {
      scale: 1, y: 0, ease: 'none',
      scrollTrigger: { trigger: q('[data-band]')[0], start: 'top bottom', end: 'center center', scrub: 0.6 },
    })
  }, root, [slug])

  if (!p) return <NotFound />
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]

  return (
    <div ref={root}>
      <Helmet>
        <title>{`${p.name} : ${p.type.toLowerCase()} réalisé par GF Web`}</title>
        <meta name="description" content={`${p.summary} Projet conçu et développé par GF Web, développeur web à Bordeaux.`} />
        <link rel="canonical" href={`https://gf-web.fr/realisations/${p.slug}`} />
      </Helmet>

      <section className={`wrap ${s.pageHero}`}>
        <Back to="/#realisations">Toutes les réalisations</Back>
        <div className={s.heroSplit}>
          <div>
            <p className={s.kicker}>{p.type}</p>
            <h1 className="h1">
              <span className="line-mask"><span className="line-inner" data-line>{p.name}</span></span>
            </h1>
            <p className={`lead ${s.heroLead}`}>{p.summary}</p>
            <div className={s.heroActions}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn">
                Visiter {p.domain} <ArrowUpRight /><span className="sr-only"> (nouvel onglet)</span>
              </a>
            </div>
          </div>
          <dl className={s.meta}>
            <div><dt>Projet</dt><dd>{p.type}</dd></div>
            <div><dt>Pour</dt><dd>{p.client}</dd></div>
            <div><dt>En ligne</dt><dd><a href={p.url} target="_blank" rel="noopener noreferrer" className="tlink">{p.domain}</a></dd></div>
          </dl>
        </div>
      </section>

      <div className={`${s.band} blueprint`} data-band>
        <div className="wrap">
          <div className={s.bandMock} data-mock><ProjectMock project={p} /></div>
        </div>
      </div>

      <section className="section wrap">
        <div className={s.split}>
          <h2 className="h2">Le besoin</h2>
          <p className={s.bigText}>{p.context}</p>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={s.sectionHead}>
          <h2 className="h2">Ce que j’ai construit</h2>
        </div>
        <div className={s.features}>
          {p.built.map((b) => (
            <div key={b.title} className={s.feature}>
              <h3 className={s.featureTitle}>{b.title}</h3>
              <p className={s.featureDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={s.split}>
          <h2 className="h3">Technologies utilisées</h2>
          <ul className={s.stackList}>{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      <section className={s.next} aria-labelledby="projet-suivant">
        <div className={`wrap ${s.nextGrid}`}>
          <div>
            <p className={s.nextLabel} id="projet-suivant">Projet suivant</p>
            <h2 className={s.nextName}>{next.name}</h2>
            <p className={s.nextType}>{next.summary}</p>
            <div className={s.nextActions}>
              <Link to={`/realisations/${next.slug}`} className="btn btn-ghost">Voir le projet <ArrowRight /></Link>
            </div>
          </div>
          <Link to={`/realisations/${next.slug}`} className={s.nextThumb} tabIndex={-1} aria-hidden="true">
            <ProjectMock project={next} />
          </Link>
        </div>
      </section>

      <PageCta
        title="Un projet comme celui‑ci ?"
        sub="Parlez-moi de votre activité. Je vous réponds sous 24 h avec un devis gratuit et sans engagement."
      />
    </div>
  )
}
