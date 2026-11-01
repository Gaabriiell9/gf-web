import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import s from './Manifesto.module.css'

const text =
  'Un site internet ne devrait pas être une dépense de plus. C’est un outil qui vous amène des clients, qui répond pendant que vous travaillez et qui tient la route pendant des années. Je le construis avec vous, je le mets en ligne, et je reste joignable après.'

const facts = [
  { k: '2019', v: 'J’écris du code depuis cette année-là, par passion avant d’en faire mon métier.' },
  { k: '4', v: 'projets en ligne aujourd’hui, utilisés par des clients et des visiteurs réels.' },
  { k: '24 h', v: 'pour recevoir une réponse à votre demande, avec un devis gratuit.' },
  { k: '0', v: 'template acheté : chaque site est dessiné et codé pour son activité.' },
]

export default function Manifesto() {
  const root = useRef(null)

  useGsap(() => {
    if (prefersReducedMotion()) return
    const words = root.current.querySelectorAll('[data-w]')
    gsap.fromTo(words, { opacity: 0.16 }, {
      opacity: 1,
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: root.current.querySelector('[data-text]'), start: 'top 78%', end: 'bottom 45%', scrub: 0.6 },
    })
    gsap.from(root.current.querySelectorAll('[data-fact]'), {
      y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: root.current.querySelector('[data-facts]'), start: 'top 85%' },
    })
  }, root)

  return (
    <section className={`section ${s.section}`} ref={root} aria-labelledby="manifeste">
      <div className="wrap">
        <h2 id="manifeste" className="sr-only">Ma façon de travailler</h2>
        <p className={s.text} data-text>
          {text.split(' ').map((w, i) => (
            <span key={i} data-w className={s.word}>{w} </span>
          ))}
        </p>
        <dl className={s.facts} data-facts>
          {facts.map((f) => (
            <div key={f.k} className={s.fact} data-fact>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
