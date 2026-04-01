import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './RepairPage.module.css'

const codeLines = [
  'sudo dmesg | grep -i error',
  'smartctl -a /dev/sda',
  'fsck -y /dev/sdb1',
  '',
  'chkdsk C: /f /r',
  'sfc /scannow',
  '',
  'dd if=/dev/sda of=/backup/disk.img',
  'testdisk /dev/sdb',
  '',
  'lshw -short',
  'memtest86+ --full',
  '',
  'apt install --fix-broken',
  'systemctl status NetworkManager',
  '',
  'top -bn1 | grep "Cpu(s)"',
  'df -h && free -h',
  '',
  'prime95 -torture',
  'stress-ng --cpu 4 --timeout 60s',
  '',
  'Get-WmiObject Win32_ComputerSystem',
  'Get-PSDrive | Where-Object Used -gt 0',
]

const repairCards = [
  {
    number: '01',
    title: 'Diagnostic complet',
    desc: 'Analyse matérielle et logicielle de votre machine. Rapport détaillé des problèmes identifiés. Gratuit avant devis.',
    tags: ['Matériel', 'Logiciel'],
  },
  {
    number: '02',
    title: 'Suppression de virus',
    desc: "Nettoyage complet des malwares, adwares et ransomwares. Sécurisation du système et installation d'une protection adaptée.",
    tags: ['Sécurité', 'Windows'],
  },
  {
    number: '03',
    title: 'Réinstallation système',
    desc: 'Réinstallation propre de Windows ou Linux. Récupération de vos données avant formatage. Configuration complète post-installation.',
    tags: ['Windows', 'Linux'],
  },
  {
    number: '04',
    title: 'Remplacement de composants',
    desc: 'Changement de disque dur, RAM, ventilateur, écran, clavier ou alimentation. Pièces de qualité, montage soigné.',
    tags: ['Hardware', 'Upgrade'],
  },
  {
    number: '05',
    title: 'Récupération de données',
    desc: "Tentative de récupération sur disques défaillants, partitions corrompues ou systèmes qui ne démarrent plus.",
    tags: ['Données', 'Urgence'],
  },
  {
    number: '06',
    title: 'Optimisation & nettoyage',
    desc: "PC qui rame ? Nettoyage physique (poussière, pâte thermique), optimisation logicielle, désactivation des processus inutiles.",
    tags: ['Performance', 'Maintenance'],
  },
]

const pricingRows = [
  { label: 'Diagnostic complet', price: 'Gratuit' },
  { label: 'Suppression de virus', price: 'À partir de 40€' },
  { label: 'Réinstallation système', price: 'À partir de 50€' },
  { label: 'Remplacement composant', price: 'À partir de 30€ (+ pièces)' },
  { label: 'Récupération de données', price: 'À partir de 60€' },
  { label: 'Optimisation / nettoyage', price: 'À partir de 35€' },
]

export default function RepairPage() {
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
          <p className="section-label reveal">Réparation informatique</p>
          <h1 className={`${styles.heroHeadline} reveal`}>
            <span>Réparation</span>
            <span className={styles.headlineMuted}>&amp; Dépannage PC</span>
          </h1>
          <p className={`${styles.heroSub} reveal`}>
            Des pannes matérielles aux virus les plus tenaces, j'ai vu et résolu peu près tous les problèmes qu'un ordinateur peut avoir. Quel que soit le vôtre, on trouve une solution.
          </p>
          <div className={`${styles.pills} reveal`}>
            {['Bordeaux & alentours', 'Devis gratuit', 'Intervention rapide'].map((p) => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉPARATION ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Réparation</p>
            <h2 className={styles.sectionTitle}>Votre machine en panne ?</h2>
            <p className={styles.introText}>
              PC lent, écran noir, virus, disque dur défaillant, système corrompu - je diagnostique
              et répare aussi bien les problèmes logiciels que matériels. Intervention à domicile
              sur Bordeaux ou dépôt de la machine.
            </p>
          </div>
          <div className={styles.cardsGrid}>
            {repairCards.map((card, i) => (
              <div key={card.number} className={`${styles.card} reveal reveal-delay-${(i % 4) + 1}`}>
                <span className={styles.cardNumber}>{card.number}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.tags}>
                  {card.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARIFS ── */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className="reveal">
            <p className="section-label">Tarifs</p>
            <h2 className={styles.sectionTitle}>Transparent sur les prix</h2>
            <p className={styles.introText}>
              Chaque intervention est unique. Ces tarifs sont indicatifs -
              un diagnostic gratuit permet d'établir un devis précis avant toute intervention.
            </p>
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
            TVA non applicable - franchise en base art. 293 B du CGI.
            Déplacement à domicile sur Bordeaux et alentours : 10€.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.inner}>
          <div className={`${styles.ctaBlock} reveal`}>
            <h2 className={styles.ctaTitle}>Un problème avec votre machine ?</h2>
            <p className={styles.ctaSub}>
              Décrivez votre panne je reviens vers vous sous 24h avec un diagnostic ou un devis gratuit.
            </p>
            <div className={styles.ctaActions}>
              <a href="/#contact" className={styles.btnPrimary}>Prendre contact</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
