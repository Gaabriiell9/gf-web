import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Site Vitrine',
    price: '400€',
    priceLabel: 'À partir de',
    monthly: 'ou 35€/mois avec engagement 1 an',
    desc: 'Pour les artisans, freelances et associations qui veulent une présence web professionnelle.',
    items: [
      'Un site beau et professionnel',
      'Visible sur mobile et tablette',
      'Formulaire de contact intégré',
      'Référencé sur Google',
      'Livré en 1 à 2 semaines',
    ],
    cta: 'Voir les détails',
    href: '/site-vitrine',
    featured: true,
    badge: 'Populaire',
  },
  {
    name: 'Application Web',
    price: '900€',
    priceLabel: 'À partir de',
    monthly: 'ou 80€/mois avec engagement 1 an',
    desc: "Pour les projets nécessitant une logique métier, une base de données ou des paiements.",
    items: [
      'Espace client ou membre',
      'Paiement en ligne',
      'Gestion de commandes ou réservations',
      'Tableau de bord sur mesure',
      'Livré en 3 à 6 semaines',
    ],
    cta: 'Voir les détails',
    href: '/application-web',
    featured: false,
  },
  {
    name: 'Maintenance & Support',
    price: '30€/mois',
    priceLabel: 'À partir de',
    desc: 'Pour garder votre site à jour, sécurisé et fonctionnel sur la durée.',
    items: [
      'Je m\'occupe de tout techniquement',
      'Votre site reste rapide et sécurisé',
      'Vous me contactez, je réponds',
      'Sans engagement',
    ],
    cta: 'En savoir plus',
    href: '/#contact',
    featured: false,
  },
]

export default function Pricing() {
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

  return (
    <section className={styles.section} id="tarifs" ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.header} reveal`}>
          <p className="section-label">Tarifs</p>
          <h2 className={styles.title}>Formules & Pricing</h2>
        </div>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`${styles.card} ${plan.featured ? styles.featured : ''} reveal reveal-delay-${i + 1}`}
            >
              {plan.badge && (
                <span className={styles.badge}>{plan.badge}</span>
              )}

              <div className={styles.cardTop}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>{plan.priceLabel}</span>
                  <span className={styles.price}>{plan.price}</span>
                </div>
                {plan.monthly && (
                  <p className={styles.monthly}>{plan.monthly}</p>
                )}
                <p className={styles.desc}>{plan.desc}</p>
              </div>

              <ul className={styles.featureList}>
                {plan.items.map((item) => (
                  <li key={item} className={styles.featureItem}>
                    <span className={styles.check}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {plan.href.startsWith('/#') ? (
                <a href={plan.href} className={`${styles.cta} ${plan.featured ? styles.ctaFeatured : ''}`}>
                  {plan.cta}
                </a>
              ) : (
                <Link to={plan.href} className={`${styles.cta} ${plan.featured ? styles.ctaFeatured : ''}`}>
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        <p className={`${styles.note} reveal`}>
          Tous les projets font l'objet d'un devis personnalisé gratuit.
          TVA non applicable - franchise en base art. 293 B du CGI.
        </p>
      </div>
    </section>
  )
}
