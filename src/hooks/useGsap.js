import { useLayoutEffect } from 'react'
import { gsap } from '../lib/motion'

// Exécute des animations GSAP dans un contexte nettoyé au démontage
export function useGsap(setup, scopeRef, deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(setup, scopeRef?.current || undefined)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
