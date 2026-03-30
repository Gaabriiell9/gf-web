import { useEffect, useRef } from 'react'
import styles from './Services.module.css'

const services = [
  {
    number: '01',
    title: 'Sites & Applications web',
    description:
      'Du site vitrine au SaaS complet : architecture solide, performance optimisée, expérience soignée. React, Next.js, TypeScript.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    number: '02',
    title: 'Infrastructure & Serveurs',
    description:
      'Mise en place de serveurs auto-hébergés, VPN WireGuard, reverse proxy, sauvegardes automatisées, monitoring et sécurité. Votre infra, sous contrôle.',
    tags: ['Linux', 'Cloudflare', 'Docker'],
  },
  {
    number: '03',
    title: 'Réparation d\'ordinateur',
    description:
      'Diagnostic matériel et logiciel, remplacement de composants, réinstallation système, récupération de données. Intervention rapide sur Bordeaux.',
    tags: ['Hardware', 'Windows', 'Linux'],
  },
  {
    number: '04',
    title: 'Assemblage PC sur-mesure',
    description:
      'Conception et montage de configurations personnalisées : gaming, workstation, home server. Sélection des composants optimisée pour votre budget et vos usages.',
    tags: ['Gaming', 'Workstation', 'Optimisation'],
  },
  {
    number: '05',
    title: 'Automatisation & Scripts',
    description:
      'Automatisez ce qui vous fait perdre du temps. Scraping, pipelines de données, bots, intégrations API, tâches planifiées. Si c\'est répétitif, c\'est automatisable.',
    tags: ['Python', 'Node.js', 'API'],
  },
]

export default function Services() {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} id="services" ref={sectionRef}>
      <div className={styles.inner}>
        <div className="reveal">
          <p className="section-label">Services</p>
          <h2 className={styles.title}>
            Ce que je<br />construis
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div
              key={s.number}
              className={`${styles.card} reveal reveal-delay-${i + 1}`}
            >
              <span className={styles.number}>{s.number}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.desc}>{s.description}</p>
              <div className={styles.tags}>
                {s.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
