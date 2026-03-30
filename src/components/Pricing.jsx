import { useEffect, useRef } from 'react'
import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Site Vitrine',
    price: 'À partir de 400€',
    desc: 'Pour les artisans, freelances et associations qui veulent une présence web professionnelle.',
    items: [
      'Design sur-mesure responsive',
      "Jusqu'à 5 sections / pages",
      'Formulaire de contact',
      'Optimisation SEO de base',
      'Hébergement conseillé',
      'Livraison en 1 à 2 semaines',
    ],
    cta: 'Demander un devis',
    href: '/#contact',
    featured: false,
  },
  {
    name: 'Application Web',
    price: 'À partir de 1 200€',
    desc: "Pour les projets nécessitant une logique métier, une base de données ou des paiements.",
    items: [
      'Authentification utilisateurs',
      'Base de données & API',
      'Intégration paiement Stripe',
      'Tableau de bord admin',
      'Déploiement inclus',
      'Livraison en 3 à 6 semaines',
    ],
    cta: 'Demander un devis',
    href: '/#contact',
    featured: true,
    badge: 'Populaire',
  },
  {
    name: 'Maintenance & Support',
    price: 'À partir de 80€/mois',
    desc: 'Pour garder votre site à jour, sécurisé et fonctionnel sur la durée.',
    items: [
      'Mises à jour techniques',
      'Corrections de bugs',
      'Sauvegardes hebdomadaires',
      'Monitoring disponibilité',
      'Support par email',
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
      <div className={styles.inner}>
        <div className="reveal">
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
                <p className={styles.price}>{plan.price}</p>
                <p className={styles.desc}>{plan.desc}</p>
              </div>
              <ul className={styles.featureList}>
                {plan.items.map((item) => (
                  <li key={item} className={styles.featureItem}>
                    <span className={styles.check}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={plan.href} className={`${styles.cta} ${plan.featured ? styles.ctaFeatured : ''}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className={`${styles.note} reveal`}>
          Tous les projets font l'objet d'un devis personnalisé gratuit.
          TVA non applicable — franchise en base art. 293 B du CGI.
        </p>
      </div>
    </section>
  )
}
