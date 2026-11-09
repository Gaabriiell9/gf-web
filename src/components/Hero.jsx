import { projects, shots } from '../data/projects'
import { SmartLink } from './ui'
import { Laptop, Tablet, Phone } from './Devices'
import s from './Hero.module.css'

export default function Hero() {
  const [a, b, c] = [projects[0], projects[1], projects[3]]
  return (
    <section className={s.hero}>
      <span className={`${s.shape} ${s.shape1}`} aria-hidden="true" />
      <span className={`${s.shape} ${s.shape2}`} aria-hidden="true" />
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <h1 className={s.name}>Gabriel Farias<span>.</span></h1>
          <p className={s.role}>Développeur web freelance</p>
          <p className={s.skills}>Site vitrine <i>|</i> Boutique en ligne <i>|</i> Application web <i>|</i> Montage PC</p>
          <div className={s.actions}>
            <SmartLink to="/#contact" className="btn">Me contacter</SmartLink>
            <SmartLink to="/#realisations" className="btn btn-outline">Réalisations</SmartLink>
          </div>
        </div>
        <div className={s.devices} aria-label="Aperçu de quelques sites réalisés" role="img">
          <Tablet src={shots(b).tablet} className={s.tablet} eager />
          <Laptop src={shots(c).desktop} className={s.laptop} eager />
          <Phone src={shots(a).mobile} className={s.phone} eager />
        </div>
      </div>
    </section>
  )
}
