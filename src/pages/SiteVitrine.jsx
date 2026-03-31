import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './WebOfferPage.module.css'

const included = [
  {
    number: '01',
    title: 'Design sur-mesure',
    desc: 'Maquette unique pensée pour votre activité. Palette, typographie et mise en page adaptées à votre image. Aucun template générique.',
    tags: ['UI Design', 'Responsive'],
  },
  {
    number: '02',
    title: "Jusqu'à 5 sections / pages",
    desc: "Accueil, services, à propos, galerie, contact — les sections essentielles pour présenter votre activité et convertir vos visiteurs.",
    tags: ['Multi-pages', 'SPA'],
  },
  {
    number: '03',
    title: 'Formulaire de contact',
    desc: "Formulaire fonctionnel avec envoi par email. Vous recevez les messages de vos prospects directement dans votre boîte mail.",
    tags: ['Email', 'Anti-spam'],
  },
  {
    number: '04',
    title: 'SEO de base',
    desc: 'Balises meta, titres structurés, Open Graph pour le partage social, sitemap.xml et robots.txt. Votre site indexé dès le lancement.',
    tags: ['SEO', 'Performance'],
  },
  {
    number: '05',
    title: 'Performances & accessibilité',
    desc: "Code optimisé pour un chargement rapide. Score Lighthouse > 90. Site accessible sur tous les navigateurs et appareils.",
    tags: ['Lighthouse', 'Mobile-first'],
  },
  {
    number: '06',
    title: 'Conseil hébergement & nom de domaine',
    desc: "Je vous guide dans le choix de l'hébergeur adapté à votre budget et votre trafic. Mise en ligne assistée incluse.",
    tags: ['Déploiement', 'DNS'],
  },
]

const steps = [
  {
    num: '01',
    title: 'Brief & cahier des charges',
    desc: "On échange sur votre activité, vos objectifs et vos préférences visuelles. Je prépare un devis détaillé gratuit sous 24h.",
  },
  {
    num: '02',
    title: 'Maquette',
    desc: "Je conçois une maquette complète de votre site. Vous validez le design avant que le développement commence.",
  },
  {
    num: '03',
    title: 'Développement',
    desc: "Intégration du design en code propre, responsive et optimisé. Vous suivez l'avancement à chaque étape.",
  },
  {
    num: '04',
    title: 'Révisions & recette',
    desc: "Deux tours de révisions inclus. Je corrige, ajuste, peaufine jusqu'à ce que le résultat soit à la hauteur.",
  },
  {
    num: '05',
    title: 'Mise en ligne',
    desc: "Déploiement sur votre hébergeur, configuration DNS, tests sur tous les appareils. Votre site est en ligne.",
  },
]

const faq = [
  {
    q: "Combien de temps prend la création d'un site vitrine ?",
    a: "Entre 1 et 2 semaines selon la complexité. Un site 1 page simple peut être livré en 5 jours ouvrés. Un site multi-pages avec contenu riche prend 10 à 14 jours.",
  },
  {
    q: "Est-ce que je dois fournir les textes et les photos ?",
    a: "Idéalement oui — vous connaissez votre activité mieux que quiconque. Si vous n'avez pas de photos, je vous conseille des banques d'images gratuites ou professionnelles adaptées à votre secteur.",
  },
  {
    q: "Le site sera-t-il modifiable après livraison ?",
    a: "Oui. Je livre le code source complet. Selon les technologies utilisées, je peux intégrer une interface d'administration simple pour que vous puissiez modifier textes et images sans toucher au code.",
  },
  {
    q: "Que comprend le prix de 400€ ?",
    a: "Le design, le développement, l'intégration du formulaire de contact, l'optimisation SEO de base et la mise en ligne assistée. Le nom de domaine et l'hébergement sont à votre charge (env. 5 à 15€/mois selon le prestataire).",
  },
  {
    q: "Que se passe-t-il si j'ai besoin de modifications après livraison ?",
    a: "Les modifications mineures (texte, image) dans le mois suivant la livraison sont gratuites. Au-delà, je facture selon la complexité. Un forfait maintenance à 30€/mois est disponible pour un suivi régulier.",
  },
  {
    q: "Travaillez-vous avec des CMS comme WordPress ?",
    a: "Sur demande. Par défaut, je développe en React/Vite pour des performances maximales. Si vous avez besoin de gérer votre contenu en autonomie, je peux intégrer un CMS headless comme Sanity ou Contentful.",
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
      <section className={styles.heroSection}>
        <Link to="/" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour
        </Link>
        <div className={styles.heroContent}>
          <p className="section-label reveal">Développement web</p>
          <h1 className={`${styles.heroHeadline} reveal`}>
            <span>Site Vitrine</span>
            <span className={styles.headlineMuted}>Professionnel & sur-mesure</span>
          </h1>
          <p className={`${styles.heroSub} reveal`}>
            Un site qui vous ressemble, rapide, bien référencé et livré en 1 à 2 semaines.
            Conçu pour convertir vos visiteurs en clients.
          </p>
          <div className={`${styles.pills} reveal`}>
            {['À partir de 400€', 'Livraison 1–2 semaines', 'Devis gratuit sous 24h', 'Bordeaux & remote'].map((p) => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUI EST INCLUS ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Inclus</p>
            <h2 className={styles.sectionTitle}>Ce que vous recevez</h2>
            <p className={styles.introText}>
              Un site vitrine complet, de la maquette à la mise en ligne.
              Pas de surprises, pas de coûts cachés.
            </p>
          </div>
          <div className={styles.cardsGrid}>
            {included.map((card, i) => (
              <div key={card.number} className={`${styles.card} reveal reveal-delay-${(i % 4) + 1}`}>
                <span className={styles.cardNumber}>{card.number}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.tags}>
                  {card.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Processus</p>
            <h2 className={styles.sectionTitle}>Comment ça se passe ?</h2>
            <p className={styles.introText}>
              Un processus structuré en 5 étapes pour que vous sachiez exactement
              où en est votre projet à tout moment.
            </p>
          </div>
          <div className={`${styles.processSteps} reveal`}>
            {steps.map((step) => (
              <div key={step.num} className={styles.processStep}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIF ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Tarif</p>
            <h2 className={styles.sectionTitle}>Transparent sur les prix</h2>
          </div>
          <div className={`${styles.pricingBlock} reveal`}>
            <div>
              <p className={styles.pricingBlockPrice}>À partir de 400€</p>
              <p className={styles.pricingBlockMonthly}>ou 35€/mois avec engagement 1 an</p>
            </div>
            <ul className={styles.pricingBlockItems}>
              {included.map((item) => (
                <li key={item.title} className={styles.pricingBlockItem}>
                  <span className={styles.check}>✓</span>
                  {item.title}
                </li>
              ))}
              <li className={styles.pricingBlockItem}>
                <span className={styles.check}>✓</span>
                2 tours de révisions inclus
              </li>
            </ul>
            <p className={styles.pricingNote}>
              Devis personnalisé gratuit · TVA non applicable — art. 293 B du CGI
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">FAQ</p>
            <h2 className={styles.sectionTitle}>Questions fréquentes</h2>
          </div>
          <div className={`${styles.faqList} reveal`}>
            {faq.map((item) => (
              <div key={item.q} className={styles.faqItem}>
                <p className={styles.faqQ}>{item.q}</p>
                <p className={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <div className={`${styles.ctaBlock} reveal`}>
            <h2 className={styles.ctaTitle}>Prêt à lancer votre site ?</h2>
            <p className={styles.ctaSub}>
              Décrivez votre projet et je reviens vers vous sous 24h avec un devis gratuit et sans engagement.
            </p>
            <div className={styles.ctaActions}>
              <a href="/#contact" className={styles.btnPrimary}>Demander un devis gratuit</a>
              <Link to="/" className={styles.btnGhost}>Voir les réalisations</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
