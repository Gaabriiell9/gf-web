import { Helmet } from 'react-helmet-async'
import { Back, Cta } from '../components/PageParts'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
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
  useReveal()
  return (
    <>
      <Helmet>
        <title>À propos · Gabriel Farias, développeur web freelance à Bordeaux | GF Web</title>
        <meta name="description" content="Développeur web freelance à Bordeaux. Parcours, compétences et informations sur GF Web." />
        <link rel="canonical" href="https://gf-web.fr/about" />
      </Helmet>

      <section className={`wrap ${s.pageHero}`}>
        <Back />
        <p className="kicker">À PROPOS</p>
        <h1 className="h1">Joao Gabriel Farias Gomes Franca</h1>
        <p className={`lead ${s.heroLead}`}>Développeur web et passionné d’informatique, basé à Bordeaux.</p>
      </section>

      <section className="section soft">
        <div className={`wrap ${s.split} reveal`}>
          <h2 className="h2">Qui je suis</h2>
          <div className="lead">
            <p>Né au Brésil et grandi en France, je suis développeur web freelance basé à Bordeaux. L’informatique est une passion avant d’être un métier.</p>
            <p style={{ marginTop: '1em' }}>Depuis mes débuts, j’aime comprendre comment les systèmes fonctionnent, les décortiquer et les améliorer. J’ai poursuivi des études en informatique, en explorant aussi bien le développement web que les réseaux et la cybersécurité.</p>
            <p style={{ marginTop: '1em' }}>Convaincu que le meilleur moyen d’apprendre est de construire, j’ai multiplié les projets concrets, ce qui m’a naturellement conduit à créer GF Web pour mettre ces compétences au service de mes clients.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap reveal">
          <h2 className="h2">Mon parcours</h2>
          <ol className={s.timeline}>
            {timeline.map((t) => (
              <li key={t.year}><span className={s.year}>{t.year}</span><h3 className="h3">{t.title}</h3><p>{t.description}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section soft">
        <div className="wrap reveal">
          <h2 className="h2">Ce qui me passionne</h2>
          <div className={`${s.cards} ${s.cards3}`}>
            {passions.map((p) => <div key={p.title} className={s.card}><h3 className="h3">{p.title}</h3><p>{p.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`wrap ${s.split} reveal`}>
          <div>
            <h2 className="h2">Mon entreprise</h2>
            <p className={`lead ${s.heroLead}`}>GF Web est une micro-entreprise de développement web et de conseil en informatique, créée à Bègles, près de Bordeaux.</p>
          </div>
          <dl className={s.meta}>
            {companyInfo.map((it) => (
              <div key={it.label}><dt>{it.label}</dt><dd>{it.href ? <a href={it.href}>{it.value}</a> : it.value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <Cta title="Travaillons ensemble" />
    </>
  )
}
