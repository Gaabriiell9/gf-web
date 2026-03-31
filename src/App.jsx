import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import Contact from './components/Contact'
import About from './pages/About'
import Legal from './pages/Legal'
import RepairPage from './pages/RepairPage'
import BuildPage from './pages/BuildPage'
import Callback from './pages/Callback'
import SiteVitrine from './pages/SiteVitrine'
import ApplicationWeb from './pages/ApplicationWeb'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <Testimonials />
            <Pricing />
            <Faq />
            <Contact />
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/reparation-pc" element={<RepairPage />} />
        <Route path="/montage-pc" element={<BuildPage />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/site-vitrine" element={<SiteVitrine />} />
        <Route path="/application-web" element={<ApplicationWeb />} />
      </Routes>
      <Footer />
    </>
  )
}
