import { useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import s from './HeroDepth.module.css'

// Éléments flottants du hero, répartis sur plusieurs plans.
// depth : 0.2 = très loin (petit, flou, lent), 1 = tout près (net, rapide).
const items = [
  { id: 'perf', x: 47, y: 14, d: 0.55, el: <div className={`${s.card} ${s.perf}`}><span className={s.gauge}><b>100</b></span><span><b>Performance</b><i>Lighthouse</i></span></div> },
  { id: 'seo', x: 6, y: 80, d: 0.35, el: <div className={`${s.chip} ${s.ok}`}><i />Référencé sur Google</div> },
  { id: 'code', x: 54, y: 82, d: 0.75, el: <div className={s.code}><span>$</span> git push <em>origin main</em></div> },
  { id: 'swatch', x: 88, y: 12, d: 0.4, el: <div className={s.swatches}><i /><i /><i /><i /></div> },
  { id: 'phone', x: 94, y: 70, d: 0.9, el: <div className={s.phone}><span /><span /><span /><span /></div> },
  { id: 'tag', x: 38, y: 4, d: 0.25, el: <div className={s.tag}>&lt;header&gt;</div> },
  { id: 'cross1', x: 3, y: 18, d: 0.2, el: <div className={s.cross} /> },
  { id: 'cross2', x: 70, y: 96, d: 0.3, el: <div className={s.cross} /> },
  { id: 'circle', x: 78, y: 40, d: 0.15, el: <div className={s.circle} /> },
  { id: 'resp', x: 44, y: 58, d: 0.45, el: <div className={`${s.chip}`}><svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="4" width="11" height="9" rx="1.5" /><rect x="14" y="7" width="4.5" height="8" rx="1" /></svg>Mobile et ordinateur</div> },
  { id: 'msg', x: 30, y: 92, d: 0.6, el: <div className={`${s.chip} ${s.msg}`}><i>1</i>Nouveau message</div> },
  { id: 'dot', x: 64, y: 30, d: 0.2, el: <div className={s.dotGrid} /> },
]

export default function HeroDepth() {
  const root = useRef(null)

  useGsap(() => {
    const els = gsap.utils.toArray(root.current.querySelectorAll('[data-item]'))
    if (prefersReducedMotion()) return

    // Apparition : chaque élément sort du fond, du plus lointain au plus proche
    const sorted = [...els].sort((a, b) => a.dataset.d - b.dataset.d)
    sorted.forEach((el, i) => {
      const d = +el.dataset.d
      gsap.fromTo(el.querySelector('[data-inner]'),
        { opacity: 0, scale: 0.35, filter: 'blur(14px)', z: -400 },
        { opacity: 1, scale: 1, filter: `blur(${(1 - d) * 3.2}px)`, z: 0, duration: 1.6, ease: 'expo.out', delay: 0.35 + i * 0.07 })
      // flottement permanent, plus ample au premier plan
      gsap.to(el.querySelector('[data-float]'), {
        y: gsap.utils.random(-14, 14) * (0.4 + d), x: gsap.utils.random(-8, 8) * d,
        rotate: gsap.utils.random(-3, 3), duration: gsap.utils.random(3.5, 6), ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      // scroll : les plans proches défilent plus vite
      gsap.to(el, {
        yPercent: -120 * d, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })

    // souris : décalage proportionnel à la profondeur
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const movers = els.map((el) => ({
      d: +el.dataset.d,
      x: gsap.quickTo(el.querySelector('[data-mouse]'), 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(el.querySelector('[data-mouse]'), 'y', { duration: 1.2, ease: 'power3.out' }),
    }))
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      movers.forEach((m) => { m.x(-nx * 70 * m.d); m.y(-ny * 50 * m.d) })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, root)

  return (
    <div className={s.layer} ref={root} aria-hidden="true">
      <div className={s.grid} />
      <div className={s.glow} />
      {items.map((it) => (
        <div
          key={it.id}
          data-item
          data-d={it.d}
          className={`${s.item} ${s[`i_${it.id}`] || ''}`}
          style={{ left: `${it.x}%`, top: `${it.y}%`, '--d': it.d, zIndex: Math.round(it.d * 10) }}
        >
          <div data-mouse>
            <div data-float>
              <div data-inner className={s.inner}>{it.el}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
