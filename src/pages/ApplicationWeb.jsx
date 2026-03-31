import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './WebOfferPage.module.css'

const included = [
  {
    number: '01',
    title: 'Authentification utilisateurs',
    desc: "Inscription, connexion, gestion des rôles (admin / utilisateur). OAuth (Google, GitHub) sur demande. Sessions sécurisées JWT ou cookie.",
    tags: ['Auth', 'Sécurité'],
  },
  {
    number: '02',
    title: 'Base de données & API',
    desc: "Architecture backend sur-mesure : API REST ou GraphQL, base de données relationnelle (PostgreSQL) ou NoSQL selon votre besoin.",
    tags: ['API', 'BDD'],
  },
  {
    number: '03',
    title: 'Intégration paiement Stripe',
    desc: "Paiement unique, abonnement récurrent ou marketplace. Gestion des webhooks, factures automatiques et tableau de bord Stripe.",
    tags: ['Stripe', 'SaaS'],
  },
  {
    number: '04',
    title: 'Tableau de bord admin',
    desc: "Interface d'administration pour gérer vos données, vos utilisateurs et votre contenu sans toucher au code.",
    tags: ['Dashboard', 'CRUD'],
  },
  {
    number: '05',
    title: 'Déploiement inclus',
    desc: "Mise en production sur Vercel, Railway ou VPS selon votre besoin. CI/CD, variables d'environnement, certificat SSL.",
    tags: ['DevOps', 'CI/CD'],
  },
  {
    number: '06',
    title: 'Documentation technique',
    desc: "Documentation de l'API, guide de déploiement et README complet pour faciliter la reprise du projet.",
    tags: ['Docs', 'Maintenabilité'],
  },
]

const techStack = [
  { label: 'Frontend', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js / Express', 'Prisma ORM', 'PostgreSQL'] },
  { label: 'Infra', items: ['Vercel / Railway', 'GitHub Actions', 'Stripe'] },
]

const steps = [
  {
    num: '01',
    title: 'Analyse des besoins',
    desc: "Entretien approfondi pour comprendre votre logique métier, vos utilisateurs et vos contraintes techniques. Spécifications fonctionnelles rédigées ensemble.",
  },
  {
    num: '02',
    title: 'Architecture & maquettes',
    desc: "Choix de la stack technique, modélisation de la base de données, wireframes UX. Tout est validé avant de coder.",
  },
  {
    num: '03',
    title: 'Développement itératif',
    desc: "Développement par sprints avec démonstrations régulières. Vous suivez l'avancement et pouvez ajuster les priorités.",
  },
  {
    num: '04',
    title: 'Tests & recette',
    desc: "Tests fonctionnels, tests de charge et audit de sécurité de base. Corrections jusqu'à validation complète.",
  },
  {
    num: '05',
    title: 'Déploiement & transfert',
    desc: "Mise en production, formation à l'utilisation et documentation remise. Suivi post-lancement inclus pendant 30 jours.",
  },
]

const faq = [
  {
    q: "Combien de temps prend le développement d'une application web ?",
    a: "Entre 3 et 6 semaines selon la complexité. Un MVP simple (auth + CRUD + paiement) prend environ 3 semaines. Une application avec des flux métier complexes peut nécessiter 6 semaines ou plus.",
  },
  {
    q: "Le prix de 1 200€ couvre-t-il tout ?",
    a: "Il couvre l'analyse, le design, le développement, le déploiement et la documentation. Les services tiers (Stripe, hébergement, nom de domaine) sont à votre charge mais représentent généralement moins de 20€/mois au démarrage.",
  },
  {
    q: "Puis-je reprendre le code après livraison ?",
    a: "Absolument. Le code source vous appartient intégralement. Je fournis un repo Git propre avec une documentation suffisante pour qu'un autre développeur puisse reprendre le projet.",
  },
  {
    q: "Quelle différence avec un site vitrine ?",
    a: "Un site vitrine présente votre activité. Une application web permet à vos utilisateurs de faire quelque chose : créer un compte, passer une commande, accéder à un espace privé, interagir avec des données.",
  },
  {
    q: "Proposez-vous de la maintenance après livraison ?",
    a: "Oui, via le forfait Maintenance & Support à 30€/mois : mises à jour de dépendances, corrections de bugs, sauvegardes et monitoring. Les nouvelles fonctionnalités sont facturées séparément.",
  },
  {
    q: "Travaillez-vous sur des projets déjà existants ?",
    a: "Oui. Audit de code, refactoring, ajout de fonctionnalités sur une base existante — contactez-moi en décrivant votre stack actuelle et ce que vous souhaitez améliorer.",
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
            <span>Application Web</span>
            <span className={styles.headlineMuted}>Votre métier, digitalisé</span>
          </h1>
          <p className={`${styles.heroSub} reveal`}>
            SaaS, marketplace, outil interne ou plateforme client — je conçois et développe
            des applications web robustes, de l'idée à la mise en production.
          </p>
          <div className={`${styles.pills} reveal`}>
            {['À partir de 1 200€', 'Livraison 3–6 semaines', 'Devis gratuit sous 24h', 'Bordeaux & remote'].map((p) => (
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
              Un produit complet, du design à l'infrastructure.
              Chaque élément pensé pour être maintenable et évolutif.
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

      {/* ── STACK TECHNIQUE ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Stack</p>
            <h2 className={styles.sectionTitle}>Technologies utilisées</h2>
            <p className={styles.introText}>
              Des technologies éprouvées, modernes et maintenues activement.
              La stack s'adapte à votre projet si vous avez des contraintes spécifiques.
            </p>
          </div>
          <div className={styles.cardsGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {techStack.map((group, i) => (
              <div key={group.label} className={`${styles.card} reveal reveal-delay-${i + 1}`}>
                <span className={styles.cardNumber}>{group.label}</span>
                <div className={styles.tags} style={{ marginTop: 0 }}>
                  {group.items.map((item) => (
                    <span key={item} className={styles.tag}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESSUS ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Processus</p>
            <h2 className={styles.sectionTitle}>Comment ça se passe ?</h2>
            <p className={styles.introText}>
              Un développement structuré avec des points de validation à chaque étape.
              Vous gardez le contrôle tout au long du projet.
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
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Tarif</p>
            <h2 className={styles.sectionTitle}>Transparent sur les prix</h2>
          </div>
          <div className={`${styles.pricingBlock} reveal`}>
            <div>
              <p className={styles.pricingBlockPrice}>À partir de 1&nbsp;200€</p>
              <p className={styles.pricingBlockMonthly}>ou 110€/mois avec engagement 1 an</p>
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
                Suivi post-lancement 30 jours inclus
              </li>
            </ul>
            <p className={styles.pricingNote}>
              Devis personnalisé gratuit · TVA non applicable — art. 293 B du CGI
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
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
            <h2 className={styles.ctaTitle}>Un projet en tête ?</h2>
            <p className={styles.ctaSub}>
              Décrivez votre idée et je reviens vers vous sous 24h avec un retour technique
              et un devis gratuit sans engagement.
            </p>
            <div className={styles.ctaActions}>
              <a href="/#contact" className={styles.btnPrimary}>Discuter de mon projet</a>
              <Link to="/site-vitrine" className={styles.btnGhost}>Voir le forfait Site Vitrine</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
