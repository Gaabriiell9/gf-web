import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav } from '../data/site'
import { SmartLink } from './ui'
import { lockScroll } from '../lib/motion'
import s from './Navbar.module.css'

export function Logo({ className = '' }) {
  return (
    <span className={`${s.logo} ${className}`}>
      <span className={s.mark} aria-hidden="true"><i /><i /><i /></span>
      GF Web
    </span>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 240 && y > last + 2)
      if (y < last - 2) setHidden(false)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { lockScroll(open); return () => lockScroll(false) }, [open])
  useEffect(() => {
    if (!open) return
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''} ${hidden && !open ? s.hidden : ''} ${open ? s.isOpen : ''}`}>
      <div className={s.bar}>
        <Link to="/" className={s.home} aria-label="GF Web, accueil" onClick={close}><Logo /></Link>
        <nav className={s.desktop} aria-label="Navigation principale">
          <ul>
            {nav.map((l) => (
              <li key={l.to}><SmartLink to={l.to} className={s.link}>{l.label}</SmartLink></li>
            ))}
          </ul>
        </nav>
        <SmartLink to="/#contact" className={`btn btn-cobalt ${s.cta}`}>Demander un devis</SmartLink>
        <button
          type="button"
          className={s.burger}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          <i /><i />
        </button>
      </div>

      <div id="menu-mobile" className={`${s.panel} blueprint`} aria-hidden={!open} inert={open ? undefined : ''}>
        <nav aria-label="Navigation mobile">
          <ul>
            {[...nav, { label: 'Contact', to: '/#contact' }].map((l, i) => (
              <li key={l.to} style={{ '--i': i }}>
                <SmartLink to={l.to} onClick={close} className={s.panelLink}>{l.label}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.panelFoot} style={{ '--i': 6 }}>
          <a href="mailto:contact@gf-web.fr">contact@gf-web.fr</a>
          <span>Bordeaux, France</span>
        </div>
      </div>
    </header>
  )
}
