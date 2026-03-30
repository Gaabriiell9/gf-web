import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './About.module.css'

const timeline = [
  {
    year: '2019',
    title: 'Premiers pas',
    description:
      'Découverte du développement web en autodidacte. HTML, CSS, JavaScript, premiers sites construits depuis zéro par curiosité pure.',
  },
  {
    year: '2021',
    title: 'Baccalauréat',
    description:
      'Obtention du bac. En parallèle, exploration intensive de Linux, des réseaux et de la cybersécurité sur mon temps libre.',
  },
  {
    year: '2022 - 2023',
    title: 'L1 Informatique',
    description:
      'Première année de licence informatique. Fondamentaux en algorithmique, programmation orientée objet et architecture des systèmes.',
  },
  {
    year: '2023 - 2025',
    title: 'Bachelor Cybersécurité & Ethical Hacking',
    description:
      'Formation spécialisée en sécurité offensive et défensive. Pentesting, analyse de vulnérabilités, réseaux, cryptographie et tests d\'intrusion sur environnements contrôlés.',
  },
  {
    year: '2025',
    title: 'Infrastructure personnelle',
    description:
      'Mise en place d\'un serveur auto-hébergé à Bordeaux : VPN WireGuard, monitoring, sauvegardes automatisées, sécurité réseau.',
  },
  {
    year: '2026',
    title: 'GF Web',
    description:
      'Création officielle de la micro-entreprise. Développement web, infrastructure et conseil en informatique pour clients et entreprises.',
  },
]

const passions = [
  {
    title: 'Développement web',
    desc: "Créer des interfaces et des applications de zéro. J'aime autant le pixel perfect frontend que l'architecture backend bien pensée.",
  },
  {
    title: 'Cybersécurité',
    desc: 'Pentesting, reconnaissance réseau, CTF. Comprendre les failles pour mieux construire. Lab Kali Linux, tests sur environnements isolés.',
  },
  {
    title: 'Hardware & systèmes',
    desc: "Assemblage PC sur-mesure, diagnostics matériels, serveurs maison. L'informatique physique autant que logicielle.",
  },
]

const companyInfo = [
  { label: 'Nom commercial', value: 'GF WEB' },
  { label: 'Forme juridique', value: 'Entrepreneur individuel' },
  { label: 'SIRET', value: '10303012800013' },
  { label: 'Localisation', value: 'Bègles, 33130, France' },
  { label: 'Email', value: 'joaofarias20@icloud.com', href: 'mailto:joaofarias20@icloud.com' },
]

export default function About() {
  const pageRef = useRef(null)

  useEffect(() => {
    const items = pageRef.current?.querySelectorAll('.reveal')
    if (!items) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page} ref={pageRef}>

      <Link to="/" className={styles.backBtn}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour
      </Link>

      {/* ── HERO ── */}
      <section className={styles.heroSection}>
        <div className={styles.inner}>
          <p className="section-label reveal">À propos</p>
          <h1 className={`${styles.heroHeadline} reveal`}>
            <span>Joao Gabriel</span>
            <span className={styles.headlineMuted}>Farias Gomes Franca</span>
          </h1>
          <p className={`${styles.heroSub} reveal`}>
            Développeur web et passionné d'informatique, basé à Bordeaux
          </p>
          <div className={`${styles.pills} reveal`}>
            {['21 ans', 'Micro-entrepreneur', 'Développeur web', 'Expert en informatique'].map((p) => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>
          <div className={`${styles.stats} reveal`}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4</span>
              <span className={styles.statLabel}>Projets livrés</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>3</span>
              <span className={styles.statLabel}>Clients actifs</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>7</span>
              <span className={styles.statLabel}>Ans de pratique</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUI JE SUIS ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className="section-label reveal">Qui je suis</p>
          <div className={`${styles.introBlock} reveal`}>
            <p className={styles.introText}>
              Né au Brésil et grandi en France, je suis développeur web freelance basé à Bordeaux.
              Depuis mes débuts, l'informatique est une passion avant d'être un métier :
              comprendre comment les systèmes fonctionnent, les décortiquer, les améliorer.
            </p>
            <p className={styles.introText}>
              J'ai poursuivi des études en informatique, explorant aussi bien le développement
              web que les réseaux et la cybersécurité. Convaincu que le meilleur moyen d'apprendre
              est de construire, j'ai multiplié les projets concrets : sites clients, applications SaaS,
              infrastructure auto-hébergée, assemblage de machines.
            </p>
            <p className={styles.introText}>
              Cette expérience m'a naturellement conduit à créer GF Web, ma micro-entreprise,
              pour mettre ces compétences au service de clients qui veulent un interlocuteur technique
              sérieux, disponible et passionné.
            </p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className="section-label reveal">Mon parcours</p>
          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <div key={item.year} className={`${styles.timelineItem} reveal reveal-delay-${(i % 4) + 1}`}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PASSIONS ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <p className="section-label reveal">Mes passions</p>
          <div className={styles.passionsGrid}>
            {passions.map((p, i) => (
              <div key={p.title} className={`${styles.passionCard} reveal reveal-delay-${i + 1}`}>
                <h3 className={styles.passionTitle}>{p.title}</h3>
                <p className={styles.passionDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTREPRISE ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className="section-label reveal">Mon entreprise</p>
          <p className={`${styles.introText} reveal`}>
            GF Web est une micro-entreprise de développement web et conseil en systèmes informatiques,
            créée le 27 mars 2026 à Bègles, Bordeaux. Activité libérale non réglementée, régime BNC,
            franchise en base de TVA.
          </p>
          <div className={`${styles.infoGrid} reveal`}>
            {companyInfo.map((item) => (
              <div key={item.label} className={styles.infoRow}>
                <span className={styles.infoLabel}>{item.label}</span>
                {item.href ? (
                  <a href={item.href} className={styles.infoValue}>{item.value}</a>
                ) : (
                  <span className={styles.infoValue}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={`${styles.cta} reveal`}>
            <a href="/#realisations" className={styles.btnPrimary}>
              Voir mes réalisations
            </a>
            <a href="/#contact" className={styles.btnGhost}>
              Me contacter
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
