import { Link } from 'react-router-dom'
import { site, nav } from '../data/site'
import { SmartLink } from './ui'
import { Logo } from './Navbar'
import s from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={`on-night ${s.footer}`}>
      <div className={`wrap ${s.top}`}>
        <div className={s.pitch}>
          <Link to="/" className={s.brand} aria-label="GF Web, accueil"><Logo /></Link>
          <p className={s.pitchText}>Sites, boutiques et applications web pour les artisans, commerces et associations. Basé à Bordeaux.</p>
        </div>
        <div className={s.cols}>
          <div>
            <p className={s.colTitle}>Navigation</p>
            <ul>
              {nav.map((l) => <li key={l.to}><SmartLink to={l.to}>{l.label}</SmartLink></li>)}
              <li><SmartLink to="/#contact">Contact</SmartLink></li>
            </ul>
          </div>
          <div>
            <p className={s.colTitle}>Offres</p>
            <ul>
              <li><Link to="/site-vitrine">Site vitrine</Link></li>
              <li><Link to="/application-web">Application web</Link></li>
              <li><Link to="/reparation-pc">Réparation PC</Link></li>
              <li><Link to="/montage-pc">Montage PC</Link></li>
            </ul>
          </div>
          <div>
            <p className={s.colTitle}>Contact</p>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>Bordeaux, France</li>
              <li><Link to="/mentions-legales">Mentions légales</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={s.word} aria-hidden="true">GF Web</div>
      <div className={`wrap ${s.bottom}`}>
        <span>© {year} GF Web, {site.owner}. Micro-entreprise.</span>
        <span>Conçu et développé à Bordeaux.</span>
      </div>
    </footer>
  )
}
