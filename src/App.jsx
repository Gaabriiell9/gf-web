import { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { scrollToTarget } from './lib/motion'

const About = lazy(() => import('./pages/About'))
const Legal = lazy(() => import('./pages/Legal'))
const Callback = lazy(() => import('./pages/Callback'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const BuildPage = lazy(() => import('./pages/BuildPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => scrollToTarget(hash, { immediate: true }), 150)
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
      <main id="contenu" key={pathname}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/realisations/:slug" element={<ProjectPage />} />
            <Route path="/montage-pc" element={<BuildPage />} />
            <Route path="/site-vitrine" element={<Navigate to="/#services" replace />} />
            <Route path="/application-web" element={<Navigate to="/#services" replace />} />
            <Route path="/reparation-pc" element={<Navigate to="/#services" replace />} />
            <Route path="/mentions-legales" element={<Legal />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {pathname !== '/callback' && <Footer />}
    </>
  )
}
