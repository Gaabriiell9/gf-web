import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import { ArrowRight } from '../components/ui'
import { useReveal } from '../hooks/useReveal'
import s from './Page.module.css'

export default function Home() {
  useReveal()
  return (
    <>
      <Helmet>
        <title>GF Web · Gabriel Farias, développeur web freelance à Bordeaux</title>
        <meta name="description" content="Développeur web freelance à Bordeaux : sites vitrines, boutiques en ligne, applications web et montage PC sur mesure." />
      </Helmet>
      <Hero />
      <Services />
      <Projects />
      <section className="section soft">
        <div className={`wrap ${s.split} reveal`}>
          <div>
            <p className="kicker">À PROPOS</p>
            <h2 className="h2">Gabriel, développeur web à Bordeaux</h2>
          </div>
          <div>
            <p className="lead">
              Passionné d’informatique depuis toujours, je code des sites depuis 2019 et j’ai créé GF Web en 2026.
              En parallèle de mes études en cybersécurité, j’accompagne des artisans, commerçants et associations
              qui veulent un site sérieux et un interlocuteur disponible.
            </p>
            <p className={s.more}><Link to="/about" className="link">Mon parcours <ArrowRight /></Link></p>
          </div>
        </div>
      </section>
      <Testimonials />
      <Contact />
    </>
  )
}
