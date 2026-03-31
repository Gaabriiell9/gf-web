import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './OfferPage.module.css'

const profiles = [
  {
    icon: '🚀',
    name: 'Entrepreneur',
    desc: "Vous avez une idée de produit digital — plateforme, outil SaaS, service en ligne — et vous voulez la lancer.",
  },
  {
    icon: '🏢',
    name: 'PME & commerce',
    desc: "Vous avez besoin d'automatiser un process, gérer des commandes ou offrir un espace client.",
  },
  {
    icon: '🌱',
    name: 'Startup',
    desc: "Vous lancez un MVP et cherchez un développeur qui comprend les enjeux business autant que le code.",
  },
]

const obtentions = [
  {
    num: '01',
    title: 'Un espace pour vos utilisateurs',
    desc: "Inscription, connexion, profil personnel. Vos clients ou membres accèdent à leur espace privé depuis n'importe quel appareil.",
  },
  {
    num: '02',
    title: 'Le paiement en ligne',
    desc: "Vendez des produits, des abonnements ou des prestations. Encaissement sécurisé, factures automatiques.",
  },
  {
    num: '03',
    title: 'Un tableau de bord sur mesure',
    desc: "Gérez vos données, commandes et utilisateurs depuis une interface claire faite pour vous.",
  },
  {
    num: '04',
    title: 'Livré et déployé',
    desc: "Mise en production incluse. Un produit complet, documenté, prêt pour vos premiers utilisateurs.",
  },
]

const steps = [
  {
    num: '01',
    title: 'On analyse',
    desc: "On cadre votre besoin, vos utilisateurs, vos priorités. Devis gratuit sous 24h.",
  },
  {
    num: '02',
    title: 'Je développe',
    desc: "Par étapes avec démos régulières. Vous suivez et vous ajustez.",
  },
  {
    num: '03',
    title: 'Votre appli est live',
    desc: "Déploiement, tests, formation. Vous êtes autonome dès le premier jour.",
  },
]

export default function ApplicationWeb() {
  const pageRef = useRef(null)

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page} ref={pageRef}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.heroTop}>
            <Link to="/#tarifs" className={styles.back}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour aux tarifs
            </Link>
            <p className={`${styles.heroLabel} reveal`}>Développement web</p>
            <h1 className={`${styles.heroTitle} reveal`}>Application<br />Web</h1>
            <p className={`${styles.heroTagline} reveal`}>
              Un outil numérique taillé pour votre métier, de l'idée à la mise en ligne.
            </p>
          </div>
          <div className={`${styles.heroBottom} reveal`}>
            <div className={styles.heroPriceBlock}>
              <span className={styles.heroPriceFrom}>À partir de</span>
              <span className={styles.heroPrice}>1200€</span>
            </div>
            <a href="/#contact" className={styles.heroCta}>Demander un devis</a>
          </div>
        </div>
      </section>

      {/* ── POUR QUI ── */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={`${styles.sectionMeta} reveal`}>
            <span className={styles.sectionNum}>01</span>
            <h2 className={styles.sectionTitle}>Pour qui ?</h2>
          </div>
          <div className={`${styles.profiles} reveal`}>
            {profiles.map((p) => (
              <div key={p.name} className={styles.profileCard}>
                <span className={styles.profileIcon}>{p.icon}</span>
                <p className={styles.profileName}>{p.name}</p>
                <p className={styles.profileDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUE VOUS OBTENEZ ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.wrap}>
          <div className={`${styles.sectionMeta} reveal`}>
            <span className={styles.sectionNum}>02</span>
            <h2 className={styles.sectionTitle}>Ce que vous obtenez</h2>
          </div>
          <div className={styles.obtentions}>
            {obtentions.map((o, i) => (
              <div key={o.num} className={`${styles.obtentionItem} reveal reveal-delay-${(i % 2) + 1}`}>
                <span className={styles.obtentionNum}>{o.num}</span>
                <h3 className={styles.obtentionTitle}>{o.title}</h3>
                <p className={styles.obtentionDesc}>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA SE PASSE ── */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={`${styles.sectionMeta} reveal`}>
            <span className={styles.sectionNum}>03</span>
            <h2 className={styles.sectionTitle}>Comment ça se passe ?</h2>
          </div>
          <div className={`${styles.steps} reveal`}>
            {steps.map((s, i) => [
              <div key={s.num} className={styles.step}>
                <span className={styles.stepNum}>{s.num}</span>
                <p className={styles.stepTitle}>{s.title}</p>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>,
              i < steps.length - 1 && (
                <div key={`arr-${i}`} className={styles.stepArrow}>→</div>
              ),
            ])}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={styles.ctaSection}>
        <div className={styles.wrap}>
          <div className={`${styles.ctaInner} reveal`}>
            <h2 className={styles.ctaTitle}>Votre idée<br />mérite d'exister.</h2>
            <p className={styles.ctaSub}>
              Décrivez votre projet en quelques lignes. Je vous réponds sous 24h avec un retour technique et un devis gratuit.
            </p>
            <a href="/#contact" className={styles.ctaBtn}>Prendre contact</a>
          </div>
        </div>
      </section>

    </div>
  )
}
