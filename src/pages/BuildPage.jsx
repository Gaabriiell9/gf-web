import { Helmet } from 'react-helmet-async'
import { build } from '../data/site'
import { Back, Cta } from '../components/PageParts'
import { useReveal } from '../hooks/useReveal'
import s from './Page.module.css'

export default function BuildPage() {
  useReveal()
  return (
    <>
      <Helmet>
        <title>Montage PC sur mesure à Bordeaux | GF Web</title>
        <meta name="description" content="Montage PC sur mesure à Bordeaux : gaming, poste de travail et serveur maison. Choix des composants, assemblage, tests et configuration." />
        <link rel="canonical" href="https://gf-web.fr/montage-pc" />
      </Helmet>
      <section className={`wrap ${s.pageHero}`}>
        <Back />
        <p className="kicker">MONTAGE PC</p>
        <h1 className="h1">Votre PC, monté sur mesure</h1>
        <p className={`lead ${s.heroLead}`}>{build.intro}</p>
      </section>
      <section className="section soft">
        <div className="wrap reveal">
          <h2 className="h2">Une configuration pour chaque usage</h2>
          <div className={`${s.cards} ${s.cards3}`}>
            {build.builds.map((b) => (
              <div key={b.title} className={s.card}><h3 className="h3">{b.title}</h3><p>{b.desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap reveal">
          <h2 className="h2">Comment ça se passe</h2>
          <ol className={s.steps}>
            {build.steps.map((st) => <li key={st.title}><h3 className="h3">{st.title}</h3><p>{st.desc}</p></li>)}
          </ol>
        </div>
      </section>
      <Cta title={'Un PC à monter ?'} text="Dites-moi ce que vous voulez en faire et votre budget, je vous propose une configuration." subject="Montage PC" />
    </>
  )
}
