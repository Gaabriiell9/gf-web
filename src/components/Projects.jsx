import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, getLenis, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import { projects } from '../data/projects'
import ProjectMock from './ProjectMock'
import { ArrowLeft, ArrowRight, ArrowUpRight } from './ui'
import s from './Projects.module.css'

const N = projects.length
const STEP = 360 / N // les projets sont répartis sur un cercle
const wrap = (v) => ((v % N) + N) % N

// Position d'une carte selon son écart au projet actif (o = 0 : au premier plan)
function place(o, w, mobile) {
  // angle volontairement resserré : seuls le projet actif et ses deux voisins sont visibles
  const deg = o * (mobile ? 40 : 42)
  const a = (deg * Math.PI) / 180
  const R = w * (mobile ? 1.05 : 1.15)
  const abs = Math.min(Math.abs(o), 2)
  return {
    x: Math.sin(a) * R,
    z: -(1 - Math.cos(a)) * R * 1.6,
    rotationY: -deg * 0.85,
    // le projet qui part vers la gauche s'efface plus vite que celui qui arrive par la droite
    opacity: Math.max(0, 1 - abs * (mobile ? 0.6 : o < 0 ? 0.72 : 0.45) - (abs > 1 ? (abs - 1) * 0.6 : 0)),
    filter: `blur(${(abs * (mobile ? 2.5 : 3.5)).toFixed(2)}px) brightness(${(1 - abs * 0.3).toFixed(2)})`,
    zIndex: Math.round(100 - abs * 40),
  }
}

export default function Projects() {
  const root = useRef(null)
  const stage = useRef(null)
  const api = useRef({ go: () => {} })
  const [active, setActive] = useState(0)

  useGsap(() => {
    const reduced = prefersReducedMotion()
    const cards = gsap.utils.toArray(stage.current.querySelectorAll('[data-card]'))
    const state = { p: 0 }
    let current = 0

    const render = () => {
      const w = cards[0].offsetWidth
      const mobile = window.innerWidth < 1024
      cards.forEach((c, i) => {
        let o = i - state.p
        o = o - N * Math.round(o / N) // écart le plus court sur le cercle
        gsap.set(c, place(o, w, mobile))
        c.toggleAttribute('inert', Math.abs(o) > 0.5)
      })
      const idx = wrap(Math.round(state.p))
      if (idx !== current) { current = idx; setActive(idx) }
    }
    gsap.set(cards, { xPercent: -50, yPercent: -50 })
    render()

    if (reduced) {
      api.current.go = (t) => { state.p = t; render() }
      return
    }

    const mm = gsap.matchMedia()

    // Ordinateur : la section reste fixe et le scroll fait tourner le manège
    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * (N - 1) * 0.9}`,
        pin: true,
        scrub: 0.9,
        snap: { snapTo: 1 / (N - 1), duration: { min: 0.3, max: 0.8 }, delay: 0.08, ease: 'power2.inOut' },
        onUpdate: (self) => { state.p = self.progress * (N - 1); render() },
      })
      api.current.go = (target) => {
        const t = wrap(Math.round(target))
        const y = st.start + (st.end - st.start) * (t / (N - 1))
        const lenis = getLenis()
        lenis ? lenis.scrollTo(y, { duration: 1.2, force: true }) : window.scrollTo({ top: y, behavior: 'smooth' })
      }
      return () => st.kill()
    })

    // Mobile : le manège tourne seul, au doigt ou avec les flèches
    mm.add('(max-width: 1023px)', () => {
      let tween
      const go = (target) => {
        tween?.kill()
        tween = gsap.to(state, { p: target, duration: 1.1, ease: 'expo.inOut', onUpdate: render })
      }
      api.current.go = (t) => {
        restart()
        const cur = Math.round(state.p)
        let d = wrap(Math.round(t) - cur)
        if (d > N / 2) d -= N
        go(cur + d)
      }
      let timer
      const restart = () => { clearInterval(timer); timer = setInterval(() => go(Math.round(state.p) + 1), 5000) }
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? restart() : clearInterval(timer)), { threshold: 0.4 })
      io.observe(stage.current)
      let sx = null
      const down = (e) => { sx = e.clientX }
      const up = (e) => {
        if (sx === null) return
        const dx = e.clientX - sx
        sx = null
        if (Math.abs(dx) > 40) { restart(); go(Math.round(state.p) + (dx < 0 ? 1 : -1)) }
      }
      stage.current.addEventListener('pointerdown', down)
      window.addEventListener('pointerup', up)
      window.addEventListener('resize', render)
      return () => {
        clearInterval(timer); io.disconnect(); tween?.kill()
        stage.current?.removeEventListener('pointerdown', down)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('resize', render)
      }
    })
    return () => mm.revert()
  }, root)

  const p = projects[active]

  return (
    <section className={`${s.section} blueprint on-blue`} id="realisations" ref={root} aria-labelledby="realisations-titre">
      <div className={`wrap ${s.layout}`}>
        <div className={s.info}>
          <h2 id="realisations-titre" className={`h2 ${s.title}`}>Réalisations</h2>

          <div className={s.details} key={p.slug} aria-live="polite">
            <p className={s.type}>{p.type}</p>
            <h3 className={s.name}>{p.name}</h3>
            <p className={s.client}>{p.client}</p>
            <p className={s.summary}>{p.summary}</p>
            <ul className={s.stack} aria-label="Technologies">
              {p.stack.slice(0, 4).map((t) => <li key={t}>{t}</li>)}
            </ul>
            <div className={s.links}>
              <Link to={`/realisations/${p.slug}`} className="btn btn-white">Voir le projet <ArrowRight /></Link>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className={`tlink ${s.visit}`}>
                {p.domain}<span className="sr-only"> (nouvel onglet)</span><ArrowUpRight />
              </a>
            </div>
          </div>

          <div className={s.nav}>
            <button type="button" className={s.arrow} onClick={() => api.current.go(active - 1)} aria-label="Projet précédent"><ArrowLeft /></button>
            <ol className={s.dots}>
              {projects.map((x, i) => (
                <li key={x.slug}>
                  <button type="button" className={i === active ? s.dotOn : ''} onClick={() => api.current.go(i)} aria-label={`Afficher ${x.name}`} aria-current={i === active} />
                </li>
              ))}
            </ol>
            <button type="button" className={s.arrow} onClick={() => api.current.go(active + 1)} aria-label="Projet suivant"><ArrowRight /></button>
          </div>
        </div>

        <div className={s.stage} ref={stage}>
          {projects.map((x) => (
            <Link key={x.slug} to={`/realisations/${x.slug}`} className={s.card} data-card aria-label={`Voir le projet ${x.name}`}>
              <ProjectMock project={x} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
