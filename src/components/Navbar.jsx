import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav } from '../data/site'
import { SmartLink } from './ui'
import { lockScroll } from '../lib/motion'
import s from './Navbar.module.css'

export function Logo() {
  return <span className={s.logo}>GF Web<i aria-hidden="true">.</i></span>
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => { lockScroll(open); return () => lockScroll(false) }, [open])

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <div className={`wrap ${s.bar}`}>
        <Link to="/" className={s.home} aria-label="GF Web, accueil"><Logo /></Link>
        <nav aria-label="Navigation principale" className={s.desktop}>
          <ul>{nav.map((l) => <li key={l.to}><SmartLink to={l.to} className={s.link}>{l.label}</SmartLink></li>)}</ul>
        </nav>
        <button type="button" className={`${s.burger} ${open ? s.open : ''}`} aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((v) => !v)}>
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span><i /><i /><i />
        </button>
      </div>
      <nav id="menu-mobile" aria-label="Navigation mobile" className={`${s.mobile} ${open ? s.mobileOpen : ''}`} hidden={!open}>
        <ul className="wrap">
          {nav.map((l) => <li key={l.to}><SmartLink to={l.to} onClick={() => setOpen(false)}>{l.label}</SmartLink></li>)}
        </ul>
      </nav>
    </header>
  )
}
