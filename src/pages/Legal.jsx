import { Helmet } from 'react-helmet-async'
import { Back } from '../components/PageParts'
import s from './Page.module.css'

const editorRows = [
  { label: 'Nom', value: 'Joao Gabriel Farias Gomes Franca' },
  { label: 'Nom commercial', value: 'GF Web' },
  { label: 'Forme juridique', value: 'Entrepreneur individuel (micro-entreprise)' },
  { label: 'SIRET', value: '10303012800013' },
  { label: 'Adresse', value: '8 Avenue Robert Schuman, Bât. N75, 33130 Bègles, France' },
  { label: 'Email', value: 'joaofarias20@icloud.com', href: 'mailto:joaofarias20@icloud.com' },
  { label: 'Téléphone', value: '+33 6 80 37 45 69', href: 'tel:+33680374569' },
  { label: 'Activité', value: 'Développement web, création de sites internet, conseil en systèmes informatiques' },
  { label: 'Régime fiscal', value: 'Franchise en base de TVA, TVA non applicable, art. 293 B du CGI' },
]

const hostRows = [
  { label: 'Hébergeur', value: 'Vercel Inc.' },
  { label: 'Adresse', value: '340 S Lemon Ave #4133, Walnut, CA 91789, USA' },
  { label: 'Site', value: 'vercel.com', href: 'https://vercel.com' },
]

const Rows = ({ rows }) => (
  <dl className={s.meta}>
    {rows.map((r) => (
      <div key={r.label}>
        <dt>{r.label}</dt>
        <dd>{r.href ? <a href={r.href} className="tlink" {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{r.value}</a> : r.value}</dd>
      </div>
    ))}
  </dl>
)

export default function Legal() {
  return (
    <div className="wrap" style={{ paddingBottom: 'var(--section)' }}>
      <Helmet>
        <title>Mentions légales | GF Web</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <section className={s.pageHero}>
        <Back />
        <h1 className="h1">Mentions légales</h1>
      </section>
      <section className={s.legalBlock}><h2>Éditeur du site</h2><Rows rows={editorRows} /></section>
      <section className={s.legalBlock}><h2>Hébergement</h2><Rows rows={hostRows} /></section>
      <section className={s.legalBlock}>
        <h2>Propriété intellectuelle</h2>
        <div className={s.prose}>
          <p>Tout le contenu du site (textes, visuels, code) est la propriété de Joao Gabriel Farias Gomes Franca. Reproduction interdite sans autorisation écrite préalable.</p>
        </div>
      </section>
      <section className={s.legalBlock}>
        <h2>Données personnelles</h2>
        <div className={s.prose}>
          <p>Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre aux demandes. Elles ne sont ni vendues ni transmises à des tiers.</p>
          <p>Les avis clients sont publiés après connexion avec un compte Google : seuls le nom, la photo de profil, l’activité indiquée, la note et le message sont enregistrés.</p>
          <p>Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression en contactant : <a href="mailto:joaofarias20@icloud.com" className="tlink">joaofarias20@icloud.com</a></p>
        </div>
      </section>
    </div>
  )
}
