import s from './ProjectMock.module.css'

const Bar = ({ w = 100, c, h, className = '' }) => (
  <i className={`${s.bar} ${className}`} style={{ width: `${w}%`, ...(c ? { background: c } : {}), ...(h ? { height: `${h}em` } : {}) }} />
)

function Sena() {
  return (
    <div className={`${s.screen} ${s.sena}`}>
      <div className={s.senaNav}>
        <span className={s.senaLogo}><b>⚡</b>SENA</span>
        <span className={s.senaLinks}><Bar w={100} /><Bar w={100} /><Bar w={100} /></span>
        <span className={s.senaBtn}>Devis gratuit</span>
      </div>
      <div className={s.senaHero}>
        <div>
          <p className={s.senaKick}>Électricité générale</p>
          <p className={s.senaTitle}>Installation, dépannage, mise aux normes.</p>
          <div className={s.senaCtas}><span className={s.senaBtn}>Demander un devis</span><span className={s.senaGhost}>Nos chantiers</span></div>
        </div>
        <div className={s.senaPhoto}><span /></div>
      </div>
      <div className={s.senaStrip}>
        <div className={s.senaTrack}>
          {Array.from({ length: 12 }).map((_, i) => <span key={i} style={{ '--h': (i * 37) % 360 }} />)}
        </div>
      </div>
    </div>
  )
}

function Susy() {
  const items = [
    ['Robe longue', '49,90 €'], ['Jupe plissée', '34,90 €'], ['Ensemble', '69,00 €'], ['Robe midi', '54,90 €'],
  ]
  return (
    <div className={`${s.screen} ${s.susy}`}>
      <div className={s.susyTop}>Livraison en Guyane ou retrait en boutique à Kourou</div>
      <div className={s.susyNav}>
        <span className={s.susyLinks}><Bar w={100} /><Bar w={100} /><Bar w={100} /></span>
        <span className={s.susyLogo}>Susy Modas</span>
        <span className={s.susyCart}>Panier<b>2</b></span>
      </div>
      <div className={s.susyBanner}>
        <p>Nouvelle collection</p>
        <span>Découvrir</span>
      </div>
      <div className={s.susyGrid}>
        {items.map(([n, p], i) => (
          <div key={n} className={s.susyCard}>
            <div className={s.susyImg} style={{ '--i': i }}><span /></div>
            <p className={s.susyName}>{n}</p>
            <p className={s.susyPrice}>{p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickDevis() {
  const rows = [['Création maquette', '1', '320,00'], ['Développement site', '1', '680,00'], ['Mise en ligne', '1', '120,00'], ['Nom de domaine (1 an)', '1', '15,00']]
  return (
    <div className={`${s.screen} ${s.qd}`}>
      <div className={s.qdSide}>
        <span className={s.qdLogo}>Q</span>
        {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`${s.qdIco} ${i === 1 ? s.qdIcoOn : ''}`} />)}
      </div>
      <div className={s.qdForm}>
        <p className={s.qdH}>Nouveau devis</p>
        {['Client', 'Objet', 'Validité'].map((l, i) => (
          <div key={l} className={s.qdField}>
            <span>{l}</span>
            <div className={s.qdInput}>{i === 1 ? <>Refonte site vitrine<i className={s.caret} /></> : i === 0 ? 'Atelier Martin' : '30 jours'}</div>
          </div>
        ))}
        <div className={s.qdField}><span>Lignes</span>
          {rows.slice(0, 3).map((r) => <div key={r[0]} className={s.qdLine}><Bar w={62} /><Bar w={22} /></div>)}
        </div>
        <span className={s.qdSend}>Envoyer le devis</span>
      </div>
      <div className={s.qdPaper}>
        <div className={s.qdSheet}>
          <div className={s.qdSheetHead}>
            <div><p className={s.qdBrand}>Votre entreprise</p><Bar w={70} /><Bar w={50} /></div>
            <div className={s.qdRef}><p>DEVIS</p><span>N° 2026-014</span></div>
          </div>
          <div className={s.qdTable}>
            <div className={s.qdTh}><span>Désignation</span><span>Qté</span><span>Total HT</span></div>
            {rows.map((r) => <div key={r[0]} className={s.qdTr}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]} €</span></div>)}
          </div>
          <div className={s.qdTotal}><span>Total</span><b>1 135,00 €</b></div>
          <p className={s.qdTva}>TVA non applicable, art. 293 B du CGI</p>
        </div>
      </div>
    </div>
  )
}

function CvPro() {
  const steps = ['Profil', 'Expériences', 'Formation', 'Compétences', 'Langues']
  return (
    <div className={`${s.screen} ${s.cv}`}>
      <div className={s.cvSteps}>
        <span className={s.cvLogo}>CV<b>Pro</b></span>
        {steps.map((t, i) => <span key={t} className={`${s.cvStep} ${i === 1 ? s.cvStepOn : ''} ${i < 1 ? s.cvStepDone : ''}`}><i />{t}</span>)}
      </div>
      <div className={s.cvForm}>
        <p className={s.cvH}>Expériences</p>
        <div className={s.cvField}><span>Poste</span><div className={s.cvInput}>Chargée de clientèle<i className={s.caret} /></div></div>
        <div className={s.cvField}><span>Entreprise</span><div className={s.cvInput}>Maison Laurent</div></div>
        <div className={s.cvRow}>
          <div className={s.cvField}><span>Début</span><div className={s.cvInput}>2023</div></div>
          <div className={s.cvField}><span>Fin</span><div className={s.cvInput}>Aujourd’hui</div></div>
        </div>
        <span className={s.cvAdd}>+ Ajouter une expérience</span>
      </div>
      <div className={s.cvPaper}>
        <div className={s.cvSheet}>
          <div className={s.cvAside}>
            <span className={s.cvAvatar} />
            <Bar w={80} c="rgba(255,255,255,.7)" /><Bar w={60} c="rgba(255,255,255,.45)" />
            <p className={s.cvAsideH}>Compétences</p>
            <Bar w={90} c="rgba(255,255,255,.45)" /><Bar w={70} c="rgba(255,255,255,.45)" /><Bar w={80} c="rgba(255,255,255,.45)" />
          </div>
          <div className={s.cvMain}>
            <p className={s.cvName}>Camille Durand</p>
            <p className={s.cvRole}>Chargée de clientèle</p>
            <p className={s.cvSec}>Expériences</p>
            <Bar w={70} c="#1d2340" /><Bar w={95} /><Bar w={85} />
            <Bar w={60} c="#1d2340" /><Bar w={90} /><Bar w={75} />
            <p className={s.cvSec}>Formation</p>
            <Bar w={65} c="#1d2340" /><Bar w={80} />
          </div>
        </div>
      </div>
    </div>
  )
}

const variants = { sena: Sena, susy: Susy, quickdevis: QuickDevis, cvpro: CvPro }

export default function ProjectMock({ project, className = '', chrome = true }) {
  const V = variants[project.mock]
  return (
    <figure
      className={`${s.frame} ${chrome ? '' : s.bare} ${className}`}
      style={{ '--accent': project.accent, '--tint': project.tint }}
      role="img"
      aria-label={`Aperçu illustré du site ${project.name}`}
    >
      {chrome && (
        <div className={s.chrome} aria-hidden="true">
          <span className={s.dots}><i /><i /><i /></span>
          <span className={s.url}>{project.domain}</span>
        </div>
      )}
      <div className={s.viewport} aria-hidden="true">
        {project.image ? <img src={project.image} alt="" loading="lazy" className={s.shot} /> : V ? <V /> : null}
      </div>
    </figure>
  )
}
