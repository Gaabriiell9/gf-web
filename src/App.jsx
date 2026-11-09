import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { lazy, Suspense } from 'react'
const About = lazy(() => import('./pages/About'))
const Legal = lazy(() => import('./pages/Legal'))
const Callback = lazy(() => import('./pages/Callback'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const OfferPage = lazy(() => import('./pages/OfferPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { initLenis, scrollToTarget, ScrollTrigger } from './lib/motion'
import { repair, build } from './data/offers'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => { initLenis() }, [])

  useLayoutEffect(() => {
    if (hash) return
    scrollToTarget(0, { immediate: true })
  }, [pathname, hash])

  useEffect(() => {
    if (!hash) {
      const t = setTimeout(() => ScrollTrigger.refresh(), 60)
      return () => clearTimeout(t)
    }
    // Arrivée depuis une autre page sur une ancre : on se place en haut,
    // on laisse les sections épinglées se calculer, puis on va à l'ancre.
    scrollToTarget(0, { immediate: true })
    const t = setTimeout(() => {
      ScrollTrigger.refresh()
      requestAnimationFrame(() => scrollToTarget(hash, { offset: 0, immediate: true }))
    }, 250)
    return () => clearTimeout(t)
  }, [pathname, hash])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <>
      <a href="#contenu" className="skip-link">Aller au contenu</a>
      <ScrollManager />
      <Navbar />
      <div className="shell">
      <main id="contenu" key={pathname}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/realisations/:slug" element={<ProjectPage />} />
          <Route path="/site-vitrine" element={<OfferPage id="site-vitrine" />} />
          <Route path="/application-web" element={<OfferPage id="application-web" />} />
          <Route path="/reparation-pc" element={<ServicePage data={repair} kind="repair" />} />
          <Route path="/montage-pc" element={<ServicePage data={build} kind="build" />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      {pathname !== '/callback' && <Footer />}
      </div>
    </>
  )
}
