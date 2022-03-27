import s from './style.module.scss'

export default function SectionWrapper ({ children }) {
  return (
    <div className={s.container}>
      {children}
    </div>
  )
}
