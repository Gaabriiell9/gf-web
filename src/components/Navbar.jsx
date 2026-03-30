import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '/#services' },
    { label: 'Réalisations', href: '/#realisations' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Réparation PC', href: '/reparation-pc' },
    { label: 'Montage PC', href: '/montage-pc' },
  ]

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="/" className={styles.logo}>
        GF <span className={styles.web}>Web</span><span className={styles.dot}>.</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="/about" className={styles.cta}>
            Qui suis-je
          </a>
        </li>
      </ul>

      <button
        className={`${styles.burger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
      </button>
    </nav>
  )
}
