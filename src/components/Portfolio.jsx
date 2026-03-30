import { useEffect, useRef } from 'react'
import styles from './Portfolio.module.css'

const projects = [
  {
    name: 'Sena Électricité',
    url: 'https://senaelec.fr',
    slug: 'senaelec.fr',
    type: 'Site vitrine',
    description:
      'Refonte complète pour un électricien artisan de la région bordelaise. ',
    stack: ['React', 'Vite', 'CSS'],
    accent: '#e8a040',
  },
  {
    name: 'AD Logos',
    url: 'https://adlogos.org',
    slug: 'adlogos.org',
    type: 'Site institutionnel',
    description:
      "Site pour l'Assemblée de Dieu Logos à Bordeaux.",
    stack: ['React', 'Vite', 'React Router'],
    accent: '#5b8dee',
  },
  {
    name: 'Susy Modas Evangélicas',
    url: 'https://susymodas.com',
    slug: 'susymodas.com',
    type: 'E-commerce',
    description:
      'Boutique en ligne de mode chrétienne à Kourou, Guyane.',
    stack: ['Next.js', 'Supabase', 'Stripe'],
    accent: '#e87a90',
  },
  {
    name: 'QuickDevis Pro',
    url: 'https://quickdevis.gf-web.fr',
    slug: 'quickdevis.gf-web.fr',
    type: 'SaaS',
    description:
      'Application SaaS de devis et facturation pour freelances et TPE françaises. Éditeur split-panel, PDF, multi-templates, plans abonnement.',
    stack: ['Next.js 15', 'Prisma', 'PostgreSQL'],
    accent: '#c8f135',
  },
]

export default function Portfolio() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
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
    <section className={styles.section} id="realisations" ref={sectionRef}>
      <div className={styles.inner}>
        <div className="reveal">
          <p className="section-label">Réalisations</p>
          <h2 className={styles.title}>
            Projets livrés
          </h2>
        </div>

        <div className={styles.list}>
          {projects.map((p, i) => (
            <a
              key={p.slug}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.item} reveal`}
              style={{ '--project-accent': p.accent }}
            >
              <div className={styles.itemLeft}>
                <div className={styles.itemMeta}>
                  <span className={styles.itemType}>{p.type}</span>
                  <span className={styles.itemSlug}>{p.slug}</span>
                </div>
                <h3 className={styles.itemName}>{p.name}</h3>
                <p className={styles.itemDesc}>{p.description}</p>
                <div className={styles.stack}>
                  {p.stack.map((t) => (
                    <span key={t} className={styles.stackTag}>{t}</span>
                  ))}
                </div>
              </div>

              <div className={styles.itemRight}>
                <div className={styles.preview}>
                  <div className={styles.previewDots}>
                    <span /><span /><span />
                  </div>
                  <div className={styles.previewBody}>
                    <div className={styles.previewBar} style={{ width: '60%', background: p.accent, opacity: 0.8 }} />
                    <div className={styles.previewBar} style={{ width: '85%' }} />
                    <div className={styles.previewBar} style={{ width: '45%' }} />
                    <div className={styles.previewGap} />
                    <div className={styles.previewBlock} style={{ borderColor: p.accent + '40' }} />
                    <div className={styles.previewBar} style={{ width: '70%' }} />
                    <div className={styles.previewBar} style={{ width: '55%' }} />
                  </div>
                  <div className={styles.previewOverlay}>
                    <span>Voir le site</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
