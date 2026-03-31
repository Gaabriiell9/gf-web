import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './OfferPage.module.css'

const profiles = [
  {
    icon: '🔨',
    name: 'Artisan & freelance',
    desc: "Plombier, électricien, graphiste, photographe — vous avez besoin d'être trouvé en ligne par vos clients locaux.",
  },
  {
    icon: '🛍️',
    name: 'Commerçant',
    desc: "Boutique, restaurant, salon — présentez vos produits, vos horaires et donnez envie de venir vous voir.",
  },
  {
    icon: '🤝',
    name: 'Association',
    desc: "Club sportif, association culturelle — un endroit pour présenter vos activités et recruter de nouveaux membres.",
  },
]

const obtentions = [
  {
    num: '01',
    title: 'Un site qui vous ressemble',
    desc: "Design créé spécialement pour vous, pas un template vu mille fois. Vos couleurs, votre ton, votre identité.",
  },
  {
    num: '02',
    title: 'Visible partout',
    desc: "S'adapte parfaitement aux téléphones, tablettes et ordinateurs. Vos clients vous trouvent quel que soit leur écran.",
  },
  {
    num: '03',
    title: 'Trouvable sur Google',
    desc: "Référencement intégré dès le départ — balises, vitesse, structure. Vous apparaissez quand vos clients cherchent.",
  },
  {
    num: '04',
    title: 'Livré en 2 semaines',
    desc: "Pas de projet qui traîne des mois. Du premier échange à la mise en ligne, comptez 1 à 2 semaines.",
  },
]

const steps = [
  {
    num: '01',
    title: 'On échange',
    desc: "Vous me parlez de votre activité. Je pose des questions. Devis gratuit sous 24h.",
  },
  {
    num: '02',
    title: 'Je conçois',
    desc: "Maquette complète à valider avant de coder. Vous voyez le résultat avant qu'il existe.",
  },
  {
    num: '03',
    title: 'Votre site est en ligne',
    desc: "Je m'occupe de tout. Vous recevez un site prêt à l'emploi, expliqué simplement.",
  },
]

export default function SiteVitrine() {
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
            <h1 className={`${styles.heroTitle} reveal`}>Site<br />Vitrine</h1>
            <p className={`${styles.heroTagline} reveal`}>
              Une présence en ligne professionnelle, livrée en deux semaines, sans vous prendre la tête.
            </p>
          </div>
          <div className={`${styles.heroBottom} reveal`}>
            <div className={styles.heroPriceBlock}>
              <span className={styles.heroPriceFrom}>À partir de</span>
              <span className={styles.heroPrice}>400€</span>
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
            {steps.map((s, i) => (
              <>
                <div key={s.num} className={styles.step}>
                  <span className={styles.stepNum}>{s.num}</span>
                  <p className={styles.stepTitle}>{s.title}</p>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div key={`arrow-${i}`} className={styles.stepArrow}>→</div>
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className={styles.ctaSection}>
        <div className={styles.wrap}>
          <div className={`${styles.ctaInner} reveal`}>
            <h2 className={styles.ctaTitle}>Prêt à<br />démarrer ?</h2>
            <p className={styles.ctaSub}>
              Décrivez votre projet en quelques lignes. Je vous réponds sous 24h avec un devis gratuit.
            </p>
            <a href="/#contact" className={styles.ctaBtn}>Prendre contact</a>
          </div>
        </div>
      </section>

    </div>
  )
}
