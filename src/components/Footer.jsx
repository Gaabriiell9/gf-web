import { Link } from 'react-router-dom'
import { site, nav } from '../data/site'
import { SmartLink } from './ui'
import { Logo } from './Navbar'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.top}`}>
        <div>
          <Link to="/" aria-label="GF Web, accueil"><Logo /></Link>
          <p className={s.text}>Développeur web freelance à Bordeaux. Sites vitrines, boutiques en ligne, applications web et montage PC.</p>
        </div>
        <nav aria-label="Pied de page">
          <ul className={s.links}>
            {nav.map((l) => <li key={l.to}><SmartLink to={l.to}>{l.label}</SmartLink></li>)}
            <li><Link to="/montage-pc">Montage PC</Link></li>
          </ul>
        </nav>
        <div className={s.contact}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>Bordeaux, France</span>
        </div>
      </div>
      <div className={`wrap ${s.bottom}`}>
        <span>© {new Date().getFullYear()} GF Web, {site.owner}</span>
        <Link to="/mentions-legales">Mentions légales</Link>
      </div>
    </footer>
  )
}
