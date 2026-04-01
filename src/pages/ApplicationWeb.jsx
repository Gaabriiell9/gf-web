import { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './EditorialPage.module.css'

const cards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    title: 'Espace membres',
    desc: "Inscription, connexion, profil. Vos clients accèdent à leur espace depuis n'importe où.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 15h4"/>
      </svg>
    ),
    title: 'Paiement en ligne',
    desc: "Vendez produits, abonnements ou prestations. Encaissement sécurisé et factures automatiques.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V14"/>
        <path d="M9 20V10"/>
        <path d="M14 20V4"/>
        <path d="M19 20v-6"/>
      </svg>
    ),
    title: 'Tableau de bord',
    desc: "Gérez données, commandes et utilisateurs depuis une interface claire faite pour vous.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L8 6H5a1 1 0 00-1 1v3l-2 5v1h20v-1l-2-5V7a1 1 0 00-1-1h-3L12 2z"/>
        <path d="M9 21v-1a3 3 0 006 0v1"/>
        <path d="M12 6v6"/>
        <path d="M9 12h6"/>
      </svg>
    ),
    title: 'Déploiement inclus',
    desc: "Mise en production complète, documentation et suivi post-lancement de 30 jours.",
  },
]

const steps = [
  {
    num: '01',
    title: 'On analyse',
    desc: "On cadre votre besoin, vos utilisateurs et vos priorités. Devis gratuit et détaillé sous 24h.",
  },
  {
    num: '02',
    title: 'Je développe',
    desc: "Développement par étapes avec démos régulières. Vous suivez et ajustez à tout moment.",
  },
  {
    num: '03',
    title: 'Votre appli est live',
    desc: "Déploiement, tests finaux, formation. Vous êtes autonome dès le premier jour.",
  },
]

export default function ApplicationWeb() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>

        {/* ── BACK ── */}
        <Link to="/#tarifs" className={styles.back}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retour aux tarifs
        </Link>

        {/* ── HERO ── */}
        <section className={styles.hero}>

          {/* Ligne 1 */}
          <div className={styles.heroRow1}>
            <div className={styles.heroLeft}>
              <span className={styles.badge}>Développement web</span>
              <h1 className={styles.heroTitle}>Application Web</h1>
            </div>
            <div className={styles.heroPriceBlock}>
              <span className={styles.priceFrom}>À partir de</span>
              <span className={styles.price}>1200€</span>
              <span className={styles.priceMonthly}>ou 110€/mois avec engagement 1 an</span>
            </div>
          </div>

          {/* Ligne 2 */}
          <div className={styles.heroRow2}>
            <p className={styles.tagline}>
              Un outil numérique taillé pour votre métier, de l'idée à la mise en ligne.
            </p>
            <a href="/#contact" className={styles.ctaBtn}>Demander un devis</a>
          </div>

        </section>

        <hr className={styles.divider} />

        {/* ── CARDS ── */}
        <section className={styles.cardsSection}>
          <span className={styles.sectionLabel}>Ce que vous obtenez</span>
          <div className={styles.cardsGrid}>
            {cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <span className={styles.cardIcon}>{c.icon}</span>
                <p className={styles.cardTitle}>{c.title}</p>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className={styles.timelineSection}>
          <span className={styles.sectionLabel}>Déroulement</span>
          <div className={styles.timelineRow}>
            {steps.map((s, i) => (
              <Fragment key={s.num}>
                <div className={styles.timelineStep}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <p className={styles.stepTitle}>{s.title}</p>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className={styles.timelineArrow}>→</div>
                )}
              </Fragment>
            ))}
          </div>
        </section>

      </div>

      {/* ── FINAL ── */}
      <section className={styles.finalSection}>
        <div className={styles.wrap}>
          <div className={styles.finalRow}>
            <div>
              <h2 className={styles.finalTitle}>Intéressé ?</h2>
              <p className={styles.finalSub}>
                Décrivez votre projet en quelques lignes. Je vous réponds sous 24h avec un retour technique et un devis gratuit.
              </p>
            </div>
            <a href="/#contact" className={styles.finalBtn}>Écrire un message</a>
          </div>
        </div>
      </section>

    </div>
  )
}
