import { useState, useEffect, useRef } from 'react'
import styles from './Faq.module.css'

const items = [
  {
    q: 'Quels sont vos délais de livraison ?',
    a: 'Un site vitrine simple est livré en 1 à 2 semaines. Une application web ou un SaaS prend généralement 3 à 8 semaines selon la complexité. Je fournis un calendrier précis avant chaque démarrage de projet.',
  },
  {
    q: 'Proposez-vous la maintenance après livraison ?',
    a: 'Oui. Je propose des forfaits de maintenance mensuelle incluant mises à jour, corrections de bugs, sauvegardes et monitoring. Le tarif dépend du type de projet.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: "Je demande généralement 30% à 50% d'acompte au démarrage, et le solde à la livraison. Je peux m'adapter selon la nature et la durée du projet.",
  },
  {
    q: 'Puis-je modifier mon site moi-même après livraison ?',
    a: "Oui, si vous le souhaitez. Je peux intégrer un CMS simple ou vous former à l'utilisation du projet. Je peux aussi tout gérer pour vous dans le cadre d'un contrat de maintenance.",
  },
  {
    q: 'Travaillez-vous avec des clients hors Bordeaux ?',
    a: 'Absolument. Je travaille à distance avec des clients partout en France et dans les DOM-TOM. La communication se fait par email, visio ou messagerie selon vos préférences.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className={styles.section} id="faq" ref={sectionRef}>
      <div className={styles.inner}>
        <div className="reveal">
          <p className="section-label">FAQ</p>
          <h2 className={styles.title}>Questions fréquentes</h2>
        </div>

        <div className={styles.list}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} reveal reveal-delay-${(i % 4) + 1}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className={`${styles.icon} ${open === i ? styles.iconOpen : ''}`}>
                  {open === i ? '×' : '+'}
                </span>
              </button>
              <div
                className={styles.answer}
                style={{ maxHeight: open === i ? '400px' : '0' }}
              >
                <p className={styles.answerText}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
