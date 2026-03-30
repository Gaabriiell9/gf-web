import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './BuildPage.module.css'

const codeLines = [
  'lscpu | grep "Model name"',
  'free -h',
  'lspci | grep -i vga',
  '',
  'cpupower frequency-info',
  'sensors | grep -E "Core|temp"',
  '',
  'hdparm -tT /dev/nvme0n1',
  'fio --name=randread --ioengine=libaio',
  '',
  'glxinfo | grep "OpenGL renderer"',
  'vulkaninfo --summary',
  '',
  'stress-ng --cpu 8 --vm 2 --timeout 120s',
  'prime95 -t',
  '',
  'systemctl enable --now docker',
  'docker run -d --name plex plexinc/pms-docker',
  '',
  'zfs create -o compression=lz4 pool/data',
  'mdadm --create /dev/md0 --level=1',
  '',
  'proxmox-ve-install --disk /dev/sda',
  'virt-install --name vm1 --memory 8192',
]

const builds = [
  {
    title: 'Gaming',
    accent: '#c8f135',
    desc: "Configuration pensée pour les jeux AAA, le streaming et les hautes performances. Rapport qualité/prix optimisé, refroidissement adapté, câblage soigné.",
    specs: ['1080p / 1440p / 4K', '60 à 240 fps', 'À partir de 950€ '],
  },
  {
    title: 'Workstation',
    accent: '#5b8dee',
    desc: "Pour les créatifs, développeurs et professionnels. Rendu 3D, montage vidéo, compilation, virtualisation des machines qui ne flanchent pas sous la charge.",
    specs: ['Multitâche intensif', 'RAM ECC disponible', 'À partir de 1 200€'],
  },
  {
    title: 'Home Server',
    accent: '#e87a90',
    desc: "NAS, Plex, auto-hébergement, domotique. Serveurs maison silencieux, économes et fiables. Installation Linux et configuration incluses.",
    specs: ['Faible consommation', 'Disponibilité 24/7', 'À partir de 400€'],
  },
]

const steps = [
  {
    number: '01',
    title: 'Sélection des composants',
    desc: "On définit ensemble votre usage et votre budget. Je sélectionne les composants les mieux adaptés avec le meilleur rapport qualité/prix.",
  },
  {
    number: '02',
    title: 'Assemblage & câblage',
    desc: "Montage soigné, câblage propre et rangé. Pâte thermique de qualité, fixations vérifiées, airflow optimisé.",
  },
  {
    number: '03',
    title: 'Tests de stabilité',
    desc: "Stress test CPU et GPU, test mémoire, vérification des températures. La machine est validée avant livraison.",
  },
  {
    number: '04',
    title: 'Installation & configuration',
    desc: "Installation de Windows ou Linux, drivers, logiciels essentiels. La machine est prête à l'emploi dès réception.",
  },
]

const pricingRows = [
  { label: 'Montage PC gaming', price: 'À partir de 950€ (composants inclus)' },
  { label: 'Montage workstation', price: 'À partir de 1 200€ (composants inclus)' },
  { label: 'Montage home server', price: 'À partir de 400€ (composants inclus)' },
  { label: "Main d'oeuvre seule", price: 'À partir de 80€ (si vous fournissez les pièces)' },
]

export default function BuildPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    const els = pageRef.current?.querySelectorAll('.reveal')
    if (!els) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.page} ref={pageRef}>

      {/* ── HERO ── */}
      <section className={styles.heroSection}>
        <div className={styles.codeBackground} aria-hidden="true">
          {[...codeLines, ...codeLines].map((line, i) => (
            <span key={i} className={styles.codeLine}>{line || '\u00A0'}</span>
          ))}
        </div>

        <Link to="/" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M3 8L7 4M3 8L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour
        </Link>

        <div className={styles.heroContent}>
          <p className="section-label reveal">Montage PC sur-mesure</p>
          <h1 className={`${styles.heroHeadline} reveal`}>
            <span>Votre config,</span>
            <span className={styles.headlineMuted}>pensée pour vous.</span>
          </h1>
          <p className={`${styles.heroSub} reveal`}>
            Du gaming au home server, je sélectionne chaque composant selon votre usage et votre budget puis j'assemble, je teste et je configure pour que la machine soit parfaite dès le premier démarrage.
          </p>
          <div className={`${styles.pills} reveal`}>
            {['Gaming', 'Workstation', 'Home Server', 'Bordeaux'].map((p) => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD PROFILES ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Configurations</p>
            <h2 className={styles.sectionTitle}>Une config pour chaque usage</h2>
            <p className={styles.introText}>
              Chaque machine est pensée selon votre usage réel, votre budget et vos envies.
              Sélection des composants, assemblage, câblage soigné, tests de stabilité et installation du système inclus.
            </p>
          </div>
          <div className={styles.buildsGrid}>
            {builds.map((b, i) => (
              <div
                key={b.title}
                className={`${styles.buildCard} reveal reveal-delay-${i + 1}`}
                style={{ '--build-accent': b.accent }}
              >
                <h3 className={styles.buildTitle}>{b.title}</h3>
                <p className={styles.buildDesc}>{b.desc}</p>
                <div className={styles.specs}>
                  {b.specs.map((s) => (
                    <span key={s} className={styles.specPill}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Processus</p>
            <h2 className={styles.sectionTitle}>Le montage, de A à Z</h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={step.number} className={`${styles.step} reveal reveal-delay-${i + 1}`}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Tarifs</p>
            <h2 className={styles.sectionTitle}>Transparent sur les prix</h2>
          </div>
          <div className={`${styles.pricingTable} reveal`}>
            <div className={styles.pricingHeader}>
              <span>Prestation</span>
              <span>Prix indicatif</span>
            </div>
            {pricingRows.map((row, i) => (
              <div key={row.label} className={`${styles.pricingRow} ${i % 2 === 1 ? styles.pricingRowAlt : ''}`}>
                <span className={styles.pricingLabel}>{row.label}</span>
                <span className={styles.pricingPrice}>{row.price}</span>
              </div>
            ))}
          </div>
          <p className={`${styles.pricingNote} reveal`}>
            TVA non applicable. Livraison possible sur Bordeaux et alentours.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <div className={`${styles.ctaBlock} reveal`}>
            <h2 className={styles.ctaTitle}>Votre prochaine configuration ?</h2>
            <p className={styles.ctaSub}>
              Décrivez votre projet, votre budget et vos usages je vous propose une config optimisée sous 48h.
            </p>
            <div className={styles.ctaActions}>
              <a href="/#contact" className={styles.btnPrimary}>Demander un devis</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
