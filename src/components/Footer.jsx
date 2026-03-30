import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>GF<span className={styles.dot}>.</span></span>
            <p>Développement web & conseil en systèmes informatiques.</p>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Navigation</span>
            <a href="#services">Services</a>
            <a href="#realisations">Réalisations</a>
            <a href="#contact">Contact</a>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Légal</span>
            <span>SIRET 10303012800013</span>
            <span>Auto-entrepreneur</span>
            <span>Micro-entreprise BNC</span>
            <a href="/mentions-legales">Mentions légales</a>
          </div>

          <div className={styles.col}>
            <span className={styles.colLabel}>Contact</span>
            <a href="mailto:joaofarias20@icloud.com">joaofarias20@icloud.com</a>
            <span>Bordeaux, France</span>
            <span>gf-web.fr</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {year} GF Web · Joao Gabriel Farias Gomes Franca
          </span>
          <span className={styles.made}>
            Conçu & développé à Bordeaux
          </span>
        </div>
      </div>
    </footer>
  )
}
