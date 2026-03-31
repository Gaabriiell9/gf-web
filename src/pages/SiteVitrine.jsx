import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductPage.module.css'

const cards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Design sur-mesure',
    desc: "Créé spécialement pour vous — vos couleurs, votre ton, votre identité. Aucun template.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="15" height="11" rx="1"/>
        <path d="M17 8h3a1 1 0 011 1v7a1 1 0 01-1 1h-3"/>
        <path d="M6 18h6"/>
        <path d="M9 14v4"/>
      </svg>
    ),
    title: 'Responsive & rapide',
    desc: "Parfait sur téléphone, tablette et ordinateur. Chargement optimisé pour ne perdre aucun visiteur.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
    title: 'Référencé sur Google',
    desc: "SEO intégré dès le départ : balises, structure, vitesse. Vous apparaissez dans les recherches locales.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 15h.01M10 15h4"/>
      </svg>
    ),
    title: 'Formulaire de contact',
    desc: "Vos visiteurs vous écrivent directement depuis le site. Les messages arrivent dans votre boîte mail.",
  },
]

const steps = [
  {
    num: '01',
    title: 'On échange',
    desc: "Vous me parlez de votre activité et de vos attentes. Devis gratuit et personnalisé sous 24h.",
  },
  {
    num: '02',
    title: 'Je conçois',
    desc: "Je crée une maquette complète que vous validez avant que le moindre code soit écrit.",
  },
  {
    num: '03',
    title: 'Votre site est en ligne',
    desc: "Je m'occupe de tout — développement, mise en ligne, tests. Vous recevez les clés.",
  },
]

export default function SiteVitrine() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className={styles.page}>

      {/* ── 2. INTRO ── */}
      <section className={styles.intro}>
        <div className={styles.wrap}>
          <Link to="/#tarifs" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour aux tarifs
          </Link>
          <div className={styles.introGrid}>
            <div className={styles.introLeft}>
              <span className={styles.introLabel}>Développement web</span>
              <h1 className={styles.introTitle}>Site<br />Vitrine</h1>
              <p className={styles.introTagline}>
                Une présence en ligne professionnelle, livrée en deux semaines, sans vous prendre la tête.
              </p>
            </div>
            <div className={styles.introRight}>
              <span className={styles.priceFrom}>À partir de</span>
              <span className={styles.priceMain}>400€</span>
              <span className={styles.priceMonthly}>ou 35€/mois avec engagement 1 an</span>
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
                <span className={styles.cardIcon} style={{ color: '#c8f135' }}>{c.icon}</span>
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
              Décrivez votre projet en quelques lignes. Je vous réponds sous 24h avec un devis gratuit et sans engagement.
            </p>
            <a href="/#contact" className={styles.finalBtn}>Écrire un message</a>
          </div>
        </div>
      </section>

    </div>
  )
}
