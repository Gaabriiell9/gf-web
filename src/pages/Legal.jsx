import { Link } from 'react-router-dom'
import styles from './Legal.module.css'

const editorRows = [
  { label: 'Nom', value: 'Joao Gabriel Farias Gomes Franca' },
  { label: 'Nom commercial', value: 'GF Web' },
  { label: 'Forme juridique', value: 'Entrepreneur individuel (micro-entreprise)' },
  { label: 'SIRET', value: '10303012800013' },
  { label: 'Adresse', value: '8 Avenue Robert Schuman, Bât. N75, 33130 Bègles, France' },
  { label: 'Email', value: 'joaofarias20@icloud.com', href: 'mailto:joaofarias20@icloud.com' },
  { label: 'Téléphone', value: '+33 6 80 37 45 69', href: 'tel:+33680374569' },
  { label: 'Activité', value: 'Développement web, création de sites internet, conseil en systèmes informatiques' },
  { label: 'Régime fiscal', value: 'Franchise en base de TVA — TVA non applicable, art. 293 B du CGI' },
]

const hostRows = [
  { label: 'Hébergeur', value: 'Vercel Inc.' },
  { label: 'Adresse', value: '340 S Lemon Ave #4133, Walnut, CA 91789, USA' },
  { label: 'Site', value: 'vercel.com', href: 'https://vercel.com' },
]

export default function Legal() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backBtn}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour
      </Link>

      <div className={styles.inner}>
        <p className="section-label">Légal</p>
        <h1 className={styles.title}>Mentions légales</h1>

        {/* Éditeur */}
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Éditeur du site</h2>
          <div className={styles.infoGrid}>
            {editorRows.map((row) => (
              <div key={row.label} className={styles.infoRow}>
                <span className={styles.infoLabel}>{row.label}</span>
                {row.href ? (
                  <a href={row.href} className={styles.infoValue}>{row.value}</a>
                ) : (
                  <span className={styles.infoValue}>{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hébergement */}
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Hébergement</h2>
          <div className={styles.infoGrid}>
            {hostRows.map((row) => (
              <div key={row.label} className={styles.infoRow}>
                <span className={styles.infoLabel}>{row.label}</span>
                {row.href ? (
                  <a href={row.href} className={styles.infoValue} target="_blank" rel="noopener noreferrer">{row.value}</a>
                ) : (
                  <span className={styles.infoValue}>{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Propriété intellectuelle */}
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Propriété intellectuelle</h2>
          <p className={styles.bodyText}>
            Tout le contenu du site (textes, visuels, code) est la propriété de Joao Gabriel Farias Gomes Franca.
            Reproduction interdite sans autorisation écrite préalable.
          </p>
        </section>

        {/* Données personnelles */}
        <section className={styles.block}>
          <h2 className={styles.blockTitle}>Données personnelles</h2>
          <p className={styles.bodyText}>
            Les données collectées via le formulaire de contact (nom, email, message)
            sont utilisées uniquement pour répondre aux demandes.
            Elles ne sont ni vendues ni transmises à des tiers.
          </p>
          <p className={styles.bodyText}>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification
            et de suppression en contactant :{' '}
            <a href="mailto:joaofarias20@icloud.com" className={styles.link}>
              joaofarias20@icloud.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
