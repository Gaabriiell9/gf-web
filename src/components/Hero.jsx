import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const codeLines = [
  'const deploy = async (project) => {',
  '  await build(project.stack)',
  '  return vercel.push({ domain: "gf-web.fr" })',
  '}',
  '',
  'SELECT * FROM projets WHERE statut = "livré"',
  '',
  'git commit -m "feat: nouvelle interface"',
  'git push origin main',
  '',
  'npm run build && npm run deploy',
  '',
  'const client = supabase.createClient(url, key)',
  'await stripe.checkout.sessions.create({...})',
  '',
  'docker compose up -d --build',
  'systemctl restart nginx',
  '',
  'const router = useRouter()',
  'export default function Page({ params }) {',
  '  return <Layout>{children}</Layout>',
  '}',
  '',
  'ALTER TABLE users ADD COLUMN siret VARCHAR(14)',
  '',
  'wg-quick up wg0',
  'ufw allow 443/tcp',
  '',
  'SELECT revenue, COUNT(*) FROM invoices',
  'GROUP BY month ORDER BY date DESC',
]

export default function Hero() {
  const gridRef = useRef(null)

  useEffect(() => {
    // Subtle parallax on the grid
    const onMove = (e) => {
      if (!gridRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      gridRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className={styles.hero} id="home">
      <div className={styles.codeBackground} aria-hidden="true">
        {[...codeLines, ...codeLines].map((line, i) => (
          <span key={i} className={styles.codeLine} style={{ '--delay': `${i * 0.3}s` }}>
            {line || '\u00A0'}
          </span>
        ))}
      </div>

      <div className={styles.grid} ref={gridRef} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Disponible dès avril 2026
          <span className={styles.badgeSep}>|</span>
          Réponse sous 24h
        </div>

        <h1 className={styles.headline}>
          <span className={styles.line1}>Développement</span>
          <span className={styles.line2}>
            web<em className={styles.accent}>&</em>
          </span>
          <span className={styles.line3}>interfaces.</span>
        </h1>

        <div className={styles.sub}>
          <p>
            Micro-entreprise basée à Bordeaux. Je conçois et déploie des
            applications web sur-mesure, du site vitrine au SaaS complet.
          </p>
          <div className={styles.meta}>
            <span>
              <span className={styles.label}>Domaine</span>
              gf-web.fr
            </span>
            <span>
              <span className={styles.label}>Siret</span>
              10303012800013
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <a href="#realisations" className={styles.btnPrimary}>
            Voir les réalisations
          </a>
          <a href="#contact" className={styles.btnGhost}>
            Prendre contact
          </a>
        </div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <span>scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
