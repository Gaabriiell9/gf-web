import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, getLenis, prefersReducedMotion } from '../lib/motion'
import { getProject } from '../data/projects'
import s from './PageTransition.module.css'

const labels = {
  '/': 'Accueil',
  '/about': 'À propos',
  '/site-vitrine': 'Site vitrine',
  '/application-web': 'Application web',
  '/reparation-pc': 'Réparation PC',
  '/montage-pc': 'Montage PC',
  '/mentions-legales': 'Mentions légales',
}

function labelFor(pathname) {
  if (labels[pathname]) return labels[pathname]
  const m = pathname.match(/^\/realisations\/([^/]+)/)
  if (m) return getProject(m[1])?.name || 'Réalisation'
  return 'GF Web'
}

// Transition entre pages : la page actuelle recule dans la profondeur,
// un rideau marine monte avec le nom de la page suivante, puis la nouvelle page avance.
export default function PageTransition({ shellRef }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const curtain = useRef(null)
  const label = useRef(null)
  const busy = useRef(false)
  const covered = useRef(false)
  const first = useRef(true)
  const [text, setText] = useState('')

  // Sortie : interception des clics sur les liens internes vers une autre page
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return
      if (url.pathname.startsWith('/api/')) return
      e.preventDefault()
      e.stopPropagation()
      if (busy.current) return
      busy.current = true
      setText(labelFor(url.pathname))

      const shell = shellRef.current
      getLenis()?.stop()
      const originY = window.scrollY + window.innerHeight / 2
      gsap.timeline({
        onComplete: () => {
          covered.current = true
          navigate(url.pathname + url.search + url.hash)
        },
      })
        .set(curtain.current, { y: 0, yPercent: 100, visibility: 'visible' })
        .set(label.current, { yPercent: 120, opacity: 0 })
        .set(shell, { overflow: 'hidden' })
        .to(shell, { scale: 0.9, opacity: 0.25, borderRadius: 32, transformOrigin: `50% ${originY}px`, duration: 0.8, ease: 'power3.inOut' }, 0)
        .to(curtain.current, { yPercent: 0, duration: 0.8, ease: 'expo.inOut' }, 0.08)
        .to(label.current, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.55)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [navigate, shellRef])

  // Entrée : la nouvelle page arrive depuis le premier plan
  useLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    if (prefersReducedMotion()) return
    const shell = shellRef.current
    gsap.set(shell, { clearProps: 'transform,opacity,borderRadius' })
    if (covered.current) {
      covered.current = false
      gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          busy.current = false
          gsap.set(curtain.current, { visibility: 'hidden' })
          gsap.set(shell, { clearProps: 'all' })
        },
      })
        .to(label.current, { yPercent: -120, opacity: 0, duration: 0.5, ease: 'expo.in' }, 0)
        .to(curtain.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.2)
        .fromTo(shell, { scale: 1.08, y: 80, opacity: 0, transformOrigin: '50% 0px' }, { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: 'expo.out' }, 0.45)
        .add(() => getLenis()?.start(), 0.6)
    } else {
      // navigation par les boutons précédent/suivant du navigateur
      gsap.fromTo(shell, { scale: 0.96, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out', transformOrigin: '50% 0px',
        onComplete: () => gsap.set(shell, { clearProps: 'all' }),
      })
    }
  }, [pathname, shellRef])

  return (
    <div className={`${s.curtain} blueprint`} ref={curtain} aria-hidden="true">
      <span className={s.mask}><span className={s.label} ref={label}>{text}</span></span>
    </div>
  )
}
