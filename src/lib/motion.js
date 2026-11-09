import gsap from 'gsap'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToTarget(target, { offset = -80, immediate = false } = {}) {
  if (target === 0) { window.scrollTo({ top: 0, behavior: 'auto' }); return true }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return false
  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset)
  window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  return true
}

export function lockScroll(locked) {
  document.body.classList.toggle('menu-open', locked)
}

export { gsap }
