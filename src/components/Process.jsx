import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import { steps } from '../data/site'
import s from './Process.module.css'

export default function Process() {
  const root = useRef(null)

  useGsap(() => {
    if (prefersReducedMotion()) return
    const list = root.current.querySelector('[data-steps]')
    gsap.fromTo(root.current.querySelector('[data-line]'), { scaleX: 0, scaleY: 0 }, {
      scaleX: 1, scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 75%', end: 'bottom 55%', scrub: 0.5 },
    })
    root.current.querySelectorAll('[data-step]').forEach((el) => {
      gsap.fromTo(el, { '--on': 0 }, {
        '--on': 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
      })
    })
  }, root)

  return (
    <section className={`section on-night ${s.section}`} ref={root} aria-labelledby="methode-titre">
      <div className="wrap">
        <div className={s.head}>
          <h2 id="methode-titre" className="h2">Comment on travaille ensemble</h2>
          <p className="lead">Quatre étapes, un seul interlocuteur, et aucune ligne de code avant que vous ayez validé la maquette.</p>
        </div>
        <ol className={s.steps} data-steps>
          <span className={s.line} aria-hidden="true"><span data-line /></span>
          {steps.map((st, i) => (
            <li key={st.title} className={s.step} data-step>
              <span className={s.num} aria-hidden="true">{i + 1}</span>
              <h3 className={s.title}>{st.title}</h3>
              <p className={s.desc}>{st.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
