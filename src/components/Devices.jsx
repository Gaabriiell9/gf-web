import s from './Devices.module.css'

export function Laptop({ src, alt = '', className = '', eager = false }) {
  return (
    <div className={`${s.laptop} ${className}`}>
      <div className={s.lid}>
        <span className={s.cam} />
        <div className={s.screen}><img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} /></div>
      </div>
      <div className={s.base}><span /></div>
    </div>
  )
}

export function Tablet({ src, alt = '', className = '', eager = false }) {
  return (
    <div className={`${s.box} ${className}`}>
      <div className={s.tablet}>
        <div className={s.screen}><img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} /></div>
      </div>
    </div>
  )
}

export function Phone({ src, alt = '', className = '', eager = false }) {
  return (
    <div className={`${s.box} ${className}`}>
      <div className={s.phone}>
        <span className={s.notch} />
        <div className={s.screen}><img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} /></div>
      </div>
    </div>
  )
}
