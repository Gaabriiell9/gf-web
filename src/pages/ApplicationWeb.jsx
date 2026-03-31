import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductPage.module.css'

const cards = [
  {
    icon: '🔐',
    title: 'Espace membres',
    desc: "Inscription, connexion, profil personnel. Vos clients accèdent à leur espace privé depuis n'importe quel appareil.",
  },
  {
    icon: '💳',
    title: 'Paiement en ligne',
    desc: "Vendez des produits, abonnements ou prestations. Encaissement sécurisé et factures automatiques.",
  },
  {
    icon: '📊',
    title: 'Tableau de bord',
    desc: "Gérez vos données, commandes et utilisateurs depuis une interface claire faite sur mesure pour vous.",
  },
  {
    icon: '🚀',
    title: 'Déploiement inclus',
    desc: "Mise en production complète, documentation et suivi post-lancement de 30 jours inclus.",
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
    desc: "Développement par étapes avec démos régulières. Vous suivez l'avancement et ajustez à tout moment.",
  },
  {
    num: '03',
    title: 'Votre appli est live',
    desc: "Déploiement, tests finaux, formation. Vous êtes autonome dès le premier jour.",
  },
]

export default function ApplicationWeb() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={styles.page}>

      {/* ── 1. TOPBAR ── */}
      <nav className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link to="/#tarifs" className={styles.topbarBack}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Retour aux tarifs</span>
          </Link>
          <span className={styles.topbarTitle}>Application Web</span>
          <a href="/#contact" className={styles.topbarCta}>Demander un devis</a>
        </div>
      </nav>

      {/* ── 2. INTRO ── */}
      <section className={styles.intro}>
        <div className={styles.wrap}>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <span className={styles.introLabel}>Développement web</span>
              <h1 className={styles.introTitle}>Application<br />Web</h1>
              <p className={styles.introTagline}>
                Un outil numérique taillé pour votre métier, de l'idée à la mise en ligne.
              </p>
            </div>
            <div className={styles.introRight}>
              <span className={styles.priceFrom}>À partir de</span>
              <span className={styles.priceMain}>1200€</span>
              <span className={styles.priceMonthly}>ou 110€/mois avec engagement 1 an</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SÉPARATEUR ── */}
      <div className={styles.divider} />

      {/* ── 4. INCLUS ── */}
      <section className={styles.inclus}>
        <div className={styles.wrap}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Ce que vous obtenez</span>
            <h2 className={styles.sectionTitle}>Inclus dans cette formule</h2>
          </div>
          <div className={styles.cardsGrid}>
            {cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <span className={styles.cardIcon}>{c.icon}</span>
                <p className={styles.cardTitle}>{c.title}</p>
                <p className={styles.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TIMELINE ── */}
      <section className={styles.timeline}>
        <div className={styles.wrap}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Déroulement</span>
            <h2 className={styles.sectionTitle}>Comment ça se passe ?</h2>
          </div>
          <div className={styles.timelineSteps}>
            {steps.map((s) => (
              <div key={s.num} className={styles.timelineStep}>
                <span className={styles.timelineNum}>{s.num}</span>
                <p className={styles.timelineTitle}>{s.title}</p>
                <p className={styles.timelineDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. BLOC FINAL ── */}
      <section className={styles.finalBlock}>
        <div className={styles.wrap}>
          <div className={styles.finalInner}>
            <h2 className={styles.finalTitle}>Une question ?<br />Parlons-en.</h2>
            <p className={styles.finalSub}>
              Décrivez votre projet en quelques lignes. Je vous réponds sous 24h avec un retour technique et un devis gratuit.
            </p>
            <a href="/#contact" className={styles.finalBtn}>Écrire un message</a>
          </div>
        </div>
      </section>

    </div>
  )
}
