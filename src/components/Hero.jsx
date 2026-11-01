import { useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import { MagneticLink, ArrowRight } from './ui'
import s from './Hero.module.css'

const Block = ({ className = '', label, children }) => (
  <div className={`${s.block} ${className}`} data-block>
    <span className={s.wire} data-wire>{label && <em className={s.dim}>{label}</em>}</span>
    <div className={s.fill} data-fill>{children}</div>
  </div>
)

export default function Hero() {
  const root = useRef(null)
  const tl = useRef(null)
  const [done, setDone] = useState(false)

  useGsap(() => {
    const reduced = prefersReducedMotion()
    const q = gsap.utils.selector(root)

    const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
    intro
      .from(q('[data-line]'), { yPercent: 110, duration: 1.3, stagger: 0.09 }, 0.1)
      .from(q('[data-fade]'), { y: 18, opacity: 0, duration: 1, stagger: 0.08 }, 0.55)
    if (reduced) intro.progress(1)

    const build = gsap.timeline({ paused: true, onComplete: () => setDone(true) })
    build
      .set(q('[data-fill]'), { clipPath: 'inset(0 100% 0 0)' })
      .set(q('[data-wire]'), { opacity: 0 })
      .set(q('[data-toast]'), { y: 30, opacity: 0, scale: 0.96 })
      .set(q('[data-cursor]'), { xPercent: 600, yPercent: 500, opacity: 0 })
      .set(q('[data-rule]'), { scaleX: 0 })
      .to(q('[data-rule]'), { scaleX: 1, duration: 0.9, ease: 'expo.inOut', stagger: 0.1 }, 0.2)
      .to(q('[data-wire]'), { opacity: 1, duration: 0.35, stagger: 0.07, ease: 'power1.out' }, 0.35)
      .to(q('[data-fill]'), { clipPath: 'inset(0 0% 0 0)', duration: 0.75, stagger: 0.11, ease: 'expo.inOut' }, 1.25)
      .to(q('[data-wire]'), { opacity: 0, duration: 0.6, stagger: 0.05 }, 2.1)
      .set(q('[data-fill]'), { clipPath: 'none' }, 2.3)
      .to(q('[data-cursor]'), { opacity: 1, duration: 0.2 }, 2.6)
      .to(q('[data-cursor]'), { xPercent: 0, yPercent: 0, duration: 1, ease: 'power3.inOut' }, 2.6)
      .to(q('[data-cta]'), { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 3.6)
      .to(q('[data-cursor]'), { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 }, 3.6)
      .to(q('[data-toast]'), { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' }, 3.85)
      .to(q('[data-cursor]'), { opacity: 0, duration: 0.4 }, 4.6)

    tl.current = build
    if (reduced) build.progress(1)
    else gsap.delayedCall(0.7, () => build.play())
  }, root)

  const replay = () => {
    setDone(false)
    tl.current?.restart()
  }

  return (
    <section className={s.hero} ref={root} id="top">
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={s.status} data-fade>
            <span className={s.pulse} aria-hidden="true" />
            Disponible pour un nouveau projet, réponse sous 24 h
          </p>
          <h1 className={`display ${s.title}`}>
            <span className="line-mask"><span className="line-inner" data-line>Du plan</span></span>
            <span className="line-mask"><span className="line-inner" data-line>au site</span></span>
            <span className="line-mask"><span className="line-inner" data-line>en ligne.</span></span>
          </h1>
          <p className={`lead ${s.lead}`} data-fade>
            Je suis Gabriel, développeur web indépendant à Bordeaux. Je conçois et je construis
            des sites vitrines, des boutiques et des applications pour les artisans, commerces
            et associations.
          </p>
          <div className={s.actions} data-fade>
            <MagneticLink to="/#realisations" className="btn">Voir mes réalisations</MagneticLink>
            <MagneticLink to="/#contact" className="btn btn-ghost">Demander un devis</MagneticLink>
          </div>
        </div>

        <div className={s.stageWrap} data-fade>
          <div className={`${s.stage} blueprint`}>
            <span className={`${s.rule} ${s.ruleTop}`} data-rule aria-hidden="true"><em>1 200 px</em></span>
            <span className={`${s.rule} ${s.ruleSide}`} data-rule aria-hidden="true"><em>mobile, tablette, ordinateur</em></span>

            <div className={s.site} aria-hidden="true">
              <Block className={s.nav} label="navigation">
                <span className={s.logo}><i />Votre entreprise</span>
                <span className={s.links}><i /><i /><i /></span>
              </Block>
              <div className={s.heroRow}>
                <Block className={s.headline} label="titre">
                  <p className={s.hTitle}>Votre savoir-faire, enfin visible en ligne.</p>
                  <p className={s.hSub}>Prestations, réalisations, avis clients et prise de contact en un clic.</p>
                  <span className={s.ctaWrap}>
                    <span className={s.cta} data-cta>Demander un devis</span>
                    <svg className={s.cursor} data-cursor viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 2.5l15 8.2-6.6 1.6 3.8 7.2-2.9 1.5-3.8-7.2-4.9 4.6z" fill="#0D1233" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Block>
                <Block className={s.photo} label="photo">
                  <span className={s.sun} /><span className={s.hill} /><span className={s.hill2} />
                </Block>
              </div>
              <div className={s.cards}>
                <Block label="services"><b>Services</b><i /><i /></Block>
                <Block label="avis"><b>★★★★★</b><i /><i /></Block>
                <Block label="contact"><b>Contact</b><i /><i /></Block>
              </div>
            </div>

            <div className={s.toast} data-toast role="status">
              <span className={s.toastIco} aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none"><path d="M3 6.5l7 4.5 7-4.5M3.5 5h13a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
              </span>
              <span>
                <b>Nouvelle demande de devis</b>
                <span>Boulangerie du quartier, il y a quelques secondes</span>
              </span>
            </div>

            <button type="button" className={`${s.replay} ${done ? s.replayOn : ''}`} onClick={replay} tabIndex={done ? 0 : -1}>
              Revoir la construction <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
