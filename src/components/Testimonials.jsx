import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import styles from './Testimonials.module.css'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
    <path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
)

const StarRating = ({ value, onChange, readOnly = false }) => {
  const [hovered, setHovered] = useState(0)
  return (
    <div className={styles.starInput}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readOnly && onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`${styles.starBtn} ${star <= (hovered || value) ? styles.starActive : ''}`}
          disabled={readOnly}
          style={readOnly ? { cursor: 'default' } : {}}
        >★</button>
      ))}
    </div>
  )
}

const SkeletonCard = () => (
  <div className={styles.skeleton}>
    <div className={styles.skeletonHeader} />
    <div className={styles.skeletonLine} style={{ width: '100%' }} />
    <div className={styles.skeletonLine} style={{ width: '75%' }} />
    <div className={styles.skeletonLine} style={{ width: '55%' }} />
  </div>
)

const ReviewForm = ({ user, formOpen, setFormOpen, onSignOut, setReviews, alreadyReviewed }) => {
  const [form, setForm] = useState({ role: '', message: '', rating: 0 })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.rating || form.message.length < 20) return
    setStatus('loading')
    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: user.id,
        name: user.user_metadata.full_name || user.email,
        avatar_url: user.user_metadata.avatar_url || null,
        role: form.role,
        message: form.message,
        rating: form.rating,
        approved: true,
      })
      if (error) throw error

      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
      setReviews(data || [])

      setStatus('success')
      setFormOpen(false)
      setForm({ role: '', message: '', rating: 0 })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.successMsg}>
        Merci pour votre avis. Il est maintenant publié.
      </div>
    )
  }

  return (
    <>
      <div className={styles.userBar}>
        <img
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name}
          className={styles.userAvatar}
          referrerPolicy="no-referrer"
        />
        <span className={styles.userName}>
          Connecté en tant que {user.user_metadata.full_name}
        </span>
        <button className={styles.signOutBtn} onClick={onSignOut}>Déconnexion</button>
      </div>

      {alreadyReviewed ? (
        <p className={styles.alreadyReviewed}>Vous avez déjà laissé un avis. Merci !</p>
      ) : (
        <>
          <button className={styles.toggleBtn} onClick={() => setFormOpen((v) => !v)}>
            {formOpen ? '× Fermer' : '+ Laisser un avis'}
          </button>
          <div className={`${styles.formWrapper} ${formOpen ? styles.open : ''}`}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Votre activité / entreprise</label>
                <input
                  type="text"
                  placeholder="Électricien, Bordeaux"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Note</label>
                <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
              </div>
              <div className={styles.field}>
                <label>Votre avis (minimum 20 caractères)</label>
                <textarea
                  rows={4}
                  placeholder="Décrivez votre expérience..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  minLength={20}
                  required
                />
              </div>
              {status === 'error' && (
                <p className={styles.errorMsg}>Une erreur est survenue. Réessayez.</p>
              )}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'loading' || !form.rating || form.message.length < 20}
              >
                {status === 'loading' ? 'Envoi...' : 'Envoyer mon avis'}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
        if (error) throw error
        setReviews(data || [])
      } catch (err) {
        console.error('Supabase fetch error:', err)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  useEffect(() => {
    console.log('[OAuth] mount — sessionStorage intent:', sessionStorage.getItem('oauth_redirect_intent'))

    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        const { data: existing } = await supabase
          .from('reviews').select('id').eq('user_id', session.user.id).single()
        if (existing) setAlreadyReviewed(true)
      }
      setAuthReady(true)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[OAuth] onAuthStateChange —', event, '| user:', session?.user?.email ?? 'null')
      setUser(session?.user ?? null)

      // INITIAL_SESSION (échange PKCE rapide) ou SIGNED_IN (échange lent) :
      // même logique — sessionStorage est le seul gate pour le scroll
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && session?.user) {
        const { data: existing } = await supabase
          .from('reviews').select('id').eq('user_id', session.user.id).single()
        setAlreadyReviewed(!!existing)

        const oauthIntent = sessionStorage.getItem('oauth_redirect_intent')
        console.log('[OAuth]', event, '— oauthIntent:', oauthIntent, '| existing:', !!existing)

        if (oauthIntent && !existing) {
          sessionStorage.removeItem('oauth_redirect_intent')
          setFormOpen(true)
          window.location.hash = '#avis'
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.getElementById('avis')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
          })
        }

        setAuthReady(true)
      }

      if (event === 'INITIAL_SESSION' && !session?.user) {
        setAuthReady(true)
      }

      if (event === 'SIGNED_OUT') {
        setAlreadyReviewed(false)
        setFormOpen(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    console.log('[OAuth] intent posé, redirection Google...')
    sessionStorage.setItem('oauth_redirect_intent', 'avis')
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://gf-web.fr' },
    })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setFormOpen(false)
    setAlreadyReviewed(false)
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

  return (
    <section className={styles.section} id="avis">
      <div className={styles.inner}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <p className="section-label">Avis client</p>
          <h2 className={styles.title}>Ils m'ont fait confiance</h2>
        </div>

        {/* ── Grid / skeleton / empty ── */}
        {loading ? (
          <div className={styles.reviewsGrid}>
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        ) : reviews.length > 0 ? (
          <div className={styles.reviewsGrid}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.cardHeader}>
                  {review.avatar_url ? (
                    <img
                      src={review.avatar_url}
                      alt={review.name}
                      className={styles.avatarImg}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className={styles.avatar}>{review.name.charAt(0).toUpperCase()}</div>
                  )}
                  <div className={styles.cardMeta}>
                    <span className={styles.cardName}>{review.name}</span>
                    <span className={styles.cardRole}>{review.role}</span>
                  </div>
                </div>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={s <= review.rating ? styles.starFilled : styles.starEmpty}>★</span>
                  ))}
                </div>
                <p className={styles.cardMessage}>{review.message}</p>
                <span className={styles.cardDate}>{formatDate(review.created_at)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>★</div>
            <p className={styles.emptyTitle}>Aucun avis pour le moment</p>
            <p className={styles.emptyText}>
              Vous avez travaillé avec moi ? Partagez votre expérience en quelques secondes.
            </p>
            {authReady && !user && (
              <button className={styles.googleBtn} onClick={signInWithGoogle}>
                <GoogleIcon />
                Laisser un avis avec Google
              </button>
            )}
            {authReady && user && (
              <div className={styles.emptyFormArea}>
                <ReviewForm
                  user={user}
                  formOpen={formOpen}
                  setFormOpen={setFormOpen}
                  onSignOut={signOut}
                  setReviews={setReviews}
                  alreadyReviewed={alreadyReviewed}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Form area (when reviews exist) ── */}
        {!loading && reviews.length > 0 && authReady && (
          <div className={styles.formArea}>
            {!user ? (
              <button className={styles.googleBtn} onClick={signInWithGoogle}>
                <GoogleIcon />
                Laisser un avis avec Google
              </button>
            ) : (
              <ReviewForm
                user={user}
                formOpen={formOpen}
                setFormOpen={setFormOpen}
                onSignOut={signOut}
                setReviews={setReviews}
                alreadyReviewed={alreadyReviewed}
              />
            )}
          </div>
        )}

      </div>
    </section>
  )
}
