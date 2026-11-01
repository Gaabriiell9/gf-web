import { useState } from 'react'
import { faq } from '../data/site'
import s from './Faq.module.css'

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className={`section ${s.section}`} id="faq" aria-labelledby="faq-titre">
      <div className={`wrap ${s.grid}`}>
        <div>
          <h2 id="faq-titre" className="h2">Vos questions</h2>
          <p className={`lead ${s.lead}`}>Une autre question ? Écrivez-moi, je réponds sous 24 h.</p>
        </div>
        <div className={s.list}>
          {faq.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q} className={`${s.item} ${isOpen ? s.open : ''}`}>
                <h3>
                  <button
                    type="button"
                    className={s.q}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{it.q}</span>
                    <span className={s.icon} aria-hidden="true" />
                  </button>
                </h3>
                <div className={s.a} id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div><p>{it.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
