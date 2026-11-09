import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { projects, shots } from '../data/projects'
import { Laptop, Phone } from './Devices'
import { ArrowLeft, ArrowRight, ArrowUpRight } from './ui'
import s from './Projects.module.css'

const N = projects.length
const wrap = (v) => ((v % N) + N) % N

// Position d'un projet selon son écart au projet affiché (o = 0 : au centre, au premier plan)
function place(o, w) {
  const deg = o * 38
  const a = (deg * Math.PI) / 180
  const R = w * 0.95
  const abs = Math.min(Math.abs(o), 2)
  return {
    x: Math.sin(a) * R,
    z: -(1 - Math.cos(a)) * R * 1.4,
    rotationY: -deg * 0.8,
    opacity: Math.max(0, 1 - abs * 0.55 - (abs > 1 ? (abs - 1) * 0.6 : 0)),
    filter: `blur(${(abs * 2).toFixed(2)}px)`,
    zIndex: Math.round(100 - abs * 40),
  }
}

export default function Projects() {
  const stage = useRef(null)
  const api = useRef({ go: () => {} })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const cards = [...stage.current.querySelectorAll('[data-card]')]
    const state = { p: 0 }
    let current = 0
    let tween
    let timer

    const render = () => {
      const w = cards[0].offsetWidth
      cards.forEach((c, i) => {
        let o = i - state.p
        o -= N * Math.round(o / N) // chemin le plus court sur le cercle
        gsap.set(c, place(o, w))
        c.toggleAttribute('inert', Math.abs(o) > 0.5)
      })
      const idx = wrap(Math.round(state.p))
      if (idx !== current) { current = idx; setActive(idx) }
    }
    gsap.set(cards, { xPercent: -50, yPercent: -50 })
    render()

    const reduced = prefersReducedMotion()
    const go = (target) => {
      tween?.kill()
      if (reduced) { state.p = target; render(); return }
      tween = gsap.to(state, { p: target, duration: 1.1, ease: 'power3.inOut', onUpdate: render })
    }
    const goTo = (t) => {
      const cur = Math.round(state.p)
      let d = wrap(Math.round(t) - cur)
      if (d > N / 2) d -= N
      go(cur + d)
    }
    const start = () => { if (reduced) return; clearInterval(timer); timer = setInterval(() => go(Math.round(state.p) + 1), 5000) }
    const stop = () => clearInterval(timer)
    api.current.go = (t) => { goTo(t); start() }

    // tourne seul quand la section est visible, s'arrête au survol
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.35 })
    io.observe(stage.current)
    const el = stage.current
    el.addEventListener('mouseenter', stop)
    el.addEventListener('mouseleave', start)

    // glisser au doigt ou à la souris
    let sx = null
    const down = (e) => { sx = e.clientX }
    const up = (e) => {
      if (sx === null) return
      const dx = e.clientX - sx
      sx = null
      if (Math.abs(dx) > 40) { goTo(Math.round(state.p) + (dx < 0 ? 1 : -1)); start() }
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('resize', render)
    return () => {
      stop(); tween?.kill(); io.disconnect()
      el.removeEventListener('mouseenter', stop)
      el.removeEventListener('mouseleave', start)
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('resize', render)
    }
  }, [])

  const p = projects[active]

  return (
    <section className="section" id="realisations" aria-labelledby="realisations-titre">
      <div className="wrap center reveal">
        <p className="kicker">MES RÉALISATIONS</p>
        <h2 id="realisations-titre" className="h2">Quelques projets en ligne</h2>
      </div>

      <div className={s.stage} ref={stage}>
        {projects.map((x) => {
          const sh = shots(x)
          return (
            <Link key={x.slug} to={`/realisations/${x.slug}`} className={s.card} data-card aria-label={`Voir le projet ${x.name}`} draggable="false">
              <Laptop src={sh.desktop} alt="" />
              <Phone src={sh.mobile} alt="" className={s.phone} />
            </Link>
          )
        })}
      </div>

      <div className={`wrap ${s.info}`}>
        <button type="button" className={s.arrow} onClick={() => api.current.go(active - 1)} aria-label="Projet précédent"><ArrowLeft /></button>
        <div className={s.details} key={p.slug} aria-live="polite">
          <p className={s.type}>{p.type}</p>
          <h3 className={s.name}>{p.name}</h3>
          <p className={s.summary}>{p.summary}</p>
          <div className={s.links}>
            <Link to={`/realisations/${p.slug}`} className="btn">Voir le projet</Link>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="link">{p.domain}<ArrowUpRight /><span className="sr-only"> (nouvel onglet)</span></a>
          </div>
        </div>
        <button type="button" className={s.arrow} onClick={() => api.current.go(active + 1)} aria-label="Projet suivant"><ArrowRight /></button>
      </div>

      <ol className={s.dots}>
        {projects.map((x, i) => (
          <li key={x.slug}>
            <button type="button" className={i === active ? s.dotOn : ''} onClick={() => api.current.go(i)} aria-label={`Afficher ${x.name}`} aria-current={i === active} />
          </li>
        ))}
      </ol>
    </section>
  )
}
