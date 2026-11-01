import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Lit les paramètres d'erreur renvoyés par Supabase / Google (query string ou hash)
function readAuthError() {
  const search = new URLSearchParams(window.location.search)
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const error = search.get('error') || hash.get('error')
  if (!error) return null
  return (
    search.get('error_description') ||
    hash.get('error_description') ||
    error
  )
}

function goHome(withError = false) {
  sessionStorage.setItem('scrollToAvis', '1')
  if (withError) sessionStorage.setItem('authError', '1')
  window.location.replace('/')
}

export default function Callback() {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // 1. Erreur renvoyée dans l'URL (ex : ?error=invalid_request, state expiré)
    const urlError = readAuthError()
    if (urlError) {
      console.error('[OAuth] erreur de retour :', urlError)
      setFailed(true)
      const t = setTimeout(() => goHome(true), 2500)
      return () => clearTimeout(t)
    }

    let done = false
    const finish = (ok) => {
      if (done) return
      done = true
      goHome(!ok)
    }

    // 2. Succès : la session arrive via onAuthStateChange (callback synchrone, pas d'await ici)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && session) {
        finish(true)
      }
    })

    // 3. Filet de sécurité : si rien ne se passe après 10 s, on revient sur le site
    const timeout = setTimeout(async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) finish(true)
      else {
        setFailed(true)
        setTimeout(() => finish(false), 2000)
      }
    }, 10000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '24px',
      background: 'var(--bg)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      letterSpacing: '0.08em',
      color: 'var(--muted)',
    }}>
      {failed
        ? 'La connexion a échoué. Retour au site, vous pourrez réessayer…'
        : 'Connexion en cours…'}
    </div>
  )
}
