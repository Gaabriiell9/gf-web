import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Callback() {
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && session) {
        window.location.href = '/#avis'
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      letterSpacing: '0.08em',
      color: 'var(--muted)',
    }}>
      Connexion en cours…
    </div>
  )
}
