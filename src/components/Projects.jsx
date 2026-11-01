import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import { projects } from '../data/projects'
import ProjectMock from './ProjectMock'
import { ArrowRight, ArrowUpRight } from './ui'
import s from './Projects.module.css'

export default function Projects() {
  const root = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)

  useGsap(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const el = track.current
      const distance = () => el.scrollWidth - window.innerWidth
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})` },
        },
      })
      el.querySelectorAll('[data-mock]').forEach((m) => {
        gsap.fromTo(m, { xPercent: 10, rotate: 2 }, {
          xPercent: -6, rotate: -1, ease: 'none',
          scrollTrigger: { trigger: m, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
    mm.add('(max-width: 1023px)', () => {
      gsap.utils.toArray(root.current.querySelectorAll('[data-mock]')).forEach((m) => {
        gsap.from(m, { y: 60, rotate: 3, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: m, start: 'top 88%' } })
      })
    })
    return () => mm.revert()
  }, root)

  return (
    <section className={`${s.section} blueprint on-blue`} id="realisations" ref={root} aria-labelledby="realisations-titre">
      <div className={s.track} ref={track}>
        <div className={s.intro}>
          <h2 id="realisations-titre" className="h1">Réalisations</h2>
          <p className={`lead ${s.introLead}`}>
            Des sites et des outils en ligne, utilisés chaque jour par des clients et leurs visiteurs.
            Faites défiler pour les parcourir.
          </p>
          <span className={s.hint} aria-hidden="true">
            <ArrowRight />
          </span>
        </div>

        {projects.map((p, i) => (
          <article key={p.slug} className={s.panel}>
            <div className={s.info}>
              <p className={s.count}>{i + 1} sur {projects.length}</p>
              <p className={s.type}>{p.type}</p>
              <h3 className={s.name}>{p.name}</h3>
              <p className={s.client}>{p.client}</p>
              <p className={s.summary}>{p.summary}</p>
              <ul className={s.stack} aria-label="Technologies">
                {p.stack.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
              </ul>
              <div className={s.links}>
                <Link to={`/realisations/${p.slug}`} className="btn btn-white">Voir le projet <ArrowRight /></Link>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={`tlink ${s.visit}`}>
                  {p.domain}<span className="sr-only"> (nouvel onglet)</span>
                  <ArrowUpRight />
                </a>
              </div>
            </div>
            <Link to={`/realisations/${p.slug}`} className={s.mockLink} tabIndex={-1} aria-hidden="true">
              <div data-mock className={s.mockWrap}>
                <ProjectMock project={p} />
              </div>
            </Link>
          </article>
        ))}
        <div className={s.end} aria-hidden="true" />
      </div>
      <div className={s.progress} aria-hidden="true"><span ref={bar} /></div>
    </section>
  )
}
