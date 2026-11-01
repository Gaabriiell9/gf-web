import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Manifesto from '../components/Manifesto'
import Projects from '../components/Projects'
import Services from '../components/Services'
import Process from '../components/Process'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Faq from '../components/Faq'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>GF Web · Développeur web et informatique à Bordeaux</title>
        <meta name="description" content="Développeur web freelance à Bordeaux. Création de sites vitrines, boutiques et applications web, réparation et montage PC. Devis gratuit sous 24h." />
      </Helmet>
      <Hero />
      <Manifesto />
      <Projects />
      <Services />
      <Process />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  )
}
