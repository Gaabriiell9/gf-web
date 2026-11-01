import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis && lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTarget(target, { immediate = false, offset = -24 } = {}) {
  const el = target === 0 ? null : typeof target === 'string' ? document.querySelector(target) : target
  if (target !== 0 && !el) return false
  const y = target === 0 ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset)
  if (lenis) {
    if (immediate) lenis.scrollTo(y, { immediate: true, force: true })
    else lenis.scrollTo(y, { duration: 1.4, force: true })
  } else {
    window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  return true
}

export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.body.classList.toggle('menu-open', locked)
}

export { gsap, ScrollTrigger }
