import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Back, PageCta } from '../components/PageParts'
import { SmartLink, ArrowRight } from '../components/ui'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsap } from '../hooks/useGsap'
import { site } from '../data/site'
import s from './Page.module.css'

const timeline = [
  { year: '2019', title: 'Premiers pas', description: 'Découverte du développement web en autodidacte. HTML, CSS, JavaScript : premiers sites construits depuis zéro, par curiosité pure.' },
  { year: '2022', title: 'Baccalauréat', description: 'Obtention du bac. En parallèle, exploration intensive de Linux, des réseaux et de la cybersécurité sur mon temps libre.' },
  { year: '2023 à 2024', title: 'L1 Informatique', description: 'Première année de licence informatique. Fondamentaux en algorithmique, programmation orientée objet et architecture des systèmes.' },
  { year: '2024 à 2026', title: 'Bachelor Cybersécurité et Ethical Hacking', description: 'Formation spécialisée en sécurité offensive et défensive. Pentesting, analyse de vulnérabilités, réseaux, cryptographie et tests d’intrusion sur environnements contrôlés.' },
  { year: '2025', title: 'Infrastructure personnelle', description: 'Mise en place d’un serveur auto-hébergé à Bordeaux : VPN WireGuard, monitoring, sauvegardes automatisées, sécurité réseau.' },
  { year: '2026', title: 'GF Web', description: 'Création officielle de la micro-entreprise. Développement web, infrastructure et conseil en informatique pour particuliers et entreprises.' },
]

const passions = [
  { title: 'Développement web', desc: 'Créer des interfaces et des applications de zéro. J’aime autant le détail au pixel près côté interface qu’une architecture backend bien pensée.' },
  { title: 'Cybersécurité', desc: 'Pentesting, reconnaissance réseau, CTF. Comprendre les failles pour mieux construire. Lab Kali Linux, tests sur environnements isolés.' },
  { title: 'Hardware et systèmes', desc: 'Assemblage PC sur mesure, diagnostics matériels, serveurs maison. L’informatique physique autant que logicielle.' },
]

const companyInfo = [
  { label: 'Nom commercial', value: 'GF WEB' },
  { label: 'Forme juridique', value: 'Entrepreneur individuel' },
  { label: 'Création', value: '27 mars 2026' },
  { label: 'Localisation', value: 'Bègles, 33130, France' },
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
]

export default function About() {
  const root = useRef(null)

  useGsap(() => {
    if (prefersReducedMotion()) return
    const q = gsap.utils.selector(root)
    gsap.from(q('[data-line]'), { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.1, delay: 0.1 })
    gsap.fromTo(q('[data-tline]'), { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: q('[data-timeline]')[0], start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
    })
  }, root)

  return (
    <div ref={root}>
      <Helmet>
        <title>À propos · Gabriel Farias, développeur web freelance à Bordeaux | GF Web</title>
        <meta name="description" content="Développeur web freelance à Bordeaux. Passionné d’informatique, de cybersécurité et de hardware. Parcours, compétences et informations sur GF Web." />
        <link rel="canonical" href="https://gf-web.fr/about" />
      </Helmet>

      <section className={`wrap ${s.pageHero}`}>
        <Back />
        <h1 className="h1">
          <span className="line-mask"><span className="line-inner" data-line>Joao Gabriel</span></span>
          <span className="line-mask"><span className={`line-inner ${s.titleMuted}`} data-line>Farias Gomes Franca</span></span>
        </h1>
        <p className={`lead ${s.heroLead}`}>Développeur web et passionné d’informatique, basé à Bordeaux.</p>
        <ul className={s.pills}>
          {['21 ans', 'Micro-entrepreneur', 'Développeur web', 'Expert en informatique'].map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={s.split}>
          <h2 className="h2">Qui je suis</h2>
          <div className={s.prose}>
            <p className={s.bigText} style={{ color: 'var(--ink)', marginBottom: '1.2em' }}>
              Né au Brésil et grandi en France, je suis développeur web freelance basé à Bordeaux.
              L’informatique est une passion avant d’être un métier.
            </p>
            <p>
              Depuis mes débuts, j’aime comprendre comment les systèmes fonctionnent, les décortiquer et les améliorer.
              J’ai poursuivi des études en informatique, en explorant aussi bien le développement web que les réseaux
              et la cybersécurité.
            </p>
            <p>
              Convaincu que le meilleur moyen d’apprendre est de construire, j’ai multiplié les projets concrets :
              sites clients, applications SaaS, infrastructure auto-hébergée, assemblage de machines.
            </p>
            <p>
              Cette expérience m’a naturellement conduit à créer GF Web, ma micro-entreprise, pour mettre ces
              compétences au service de clients qui veulent un interlocuteur technique sérieux, disponible et passionné.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className={s.sectionHead}><h2 className="h2">Mon parcours</h2></div>
          <ol className={s.timeline} data-timeline>
            <span className={s.timelineLine} aria-hidden="true"><span data-tline /></span>
            {timeline.map((t) => (
              <li key={t.year} className={s.tItem}>
                <p className={s.tYear}>{t.year}</p>
                <div>
                  <h3 className={s.tTitle}>{t.title}</h3>
                  <p className={s.tDesc}>{t.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap">
        <div className={s.sectionHead}><h2 className="h2">Ce qui me passionne</h2></div>
        <div className={s.cards}>
          {passions.map((p, i) => (
            <article key={p.title} className={`${s.card} ${i === 1 ? s.cardBlue : ''}`}>
              <h3 className={s.cardTitle}>{p.title}</h3>
              <p className={s.cardDesc}>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={s.split}>
          <div>
            <h2 className="h2">Mon entreprise</h2>
            <p className={`lead ${s.heroLead}`}>
              GF Web est une micro-entreprise de développement web et de conseil en systèmes informatiques,
              créée à Bègles, Bordeaux. Activité libérale non réglementée, régime BNC, franchise en base de TVA.
            </p>
            <div className={s.heroActions}>
              <SmartLink to="/#realisations" className="btn">Voir mes réalisations <ArrowRight /></SmartLink>
            </div>
          </div>
          <dl className={s.meta}>
            {companyInfo.map((it) => (
              <div key={it.label}>
                <dt>{it.label}</dt>
                <dd>{it.href ? <a href={it.href} className="tlink">{it.value}</a> : it.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PageCta title="Travaillons ensemble." sub="Un projet, une question, un devis ? Je vous réponds sous 24 h." label="Me contacter" />
    </div>
  )
}
