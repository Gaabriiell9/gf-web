import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToTarget, prefersReducedMotion } from '../lib/motion'

export const ArrowUpRight = (props) => (
  <svg className="ico" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M5.5 14.5L14.5 5.5M14.5 5.5H7M14.5 5.5V13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowRight = (props) => (
  <svg className="ico" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M3.5 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ArrowLeft = (props) => (
  <svg className="ico" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
    <path d="M16.5 10H4M4 10L9 5M4 10L9 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Lien qui gère les ancres de la page d'accueil (/#contact) avec défilement fluide
export function SmartLink({ to, onClick, children, ...rest }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHomeAnchor = typeof to === 'string' && to.startsWith('/') && to.includes('#') && to.split('#')[0].split('?')[0] === '/'

  const handle = (e) => {
    onClick?.(e)
    if (!isHomeAnchor || e.defaultPrevented) return
    const [path, hash] = to.split('#')
    const search = path.includes('?') ? path.slice(path.indexOf('?')) : ''
    if (pathname === '/') {
      e.preventDefault()
      if (search) navigate(`/${search}#${hash}`, { replace: true })
      else window.history.replaceState(null, '', `/#${hash}`)
      // laisse le temps au menu mobile de se fermer et de déverrouiller le scroll
      setTimeout(() => scrollToTarget(`#${hash}`, { offset: 0 }), 80)
    }
  }

  if (/^(https?:|mailto:|tel:)/.test(to)) {
    const ext = to.startsWith('http')
    return (
      <a href={to} onClick={onClick} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return <Link to={to} onClick={handle} {...rest}>{children}</Link>
}

// Effet magnétique léger, uniquement avec une souris
export function useMagnetic(strength = 0.28) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * strength
      const y = (e.clientY - r.top - r.height / 2) * strength
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const leave = () => { el.style.transform = '' }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [strength])
  return ref
}

export function MagneticLink({ className = '', children, ...rest }) {
  const ref = useMagnetic()
  return (
    <span ref={ref} className="magnet" style={{ display: 'inline-flex', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}>
      <SmartLink className={className} {...rest}>{children}</SmartLink>
    </span>
  )
}
