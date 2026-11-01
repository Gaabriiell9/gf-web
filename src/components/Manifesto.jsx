import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import s from './Manifesto.module.css'

const text =
  'Un site internet ne devrait pas être une dépense de plus. C’est un outil qui vous amène des clients, qui répond pendant que vous travaillez et qui tient la route pendant des années. Je le construis avec vous, je le mets en ligne, et je reste joignable après.'

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
      </div>
    </section>
  )
}
