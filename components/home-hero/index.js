import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import cn from 'classnames'

gsap.registerPlugin(ScrollTrigger)

import s from './style.module.scss'

export default function Hero () {
  useEffect(() => {
    gsap.timeline()
    .to(`.${s.header__title}>div>span`, {
      y: 0,
      opacity: 1,
      ease: 'expo.out',
      duration: 2,
      stagger: {
        amount: 0.2
      }
    }).to(`.${s.header__subtitle}>div>span`, {
      y: 0,
      opacity: 1,
      ease: 'expo.out',
      duration: 2,
      delay: 0.6
    }, '<').to(`.${s.video}`, {
      opacity: 1,
      duration: 2,
      delay: 0.4
    }, '<')
  }, [])

  return (
    <div>
      <div className={s.header}>
        <div className={s.header__content}>
          <div className={s.header__title}>
            <div>
              <span>世界最高の再現を、</span>
              <span>お届けしたい。</span>
            </div>
          </div>
          <div className={s.header__subtitle}>
            <div>
              <span>Universal Studios Japan in Minecraft.</span>
            </div>
          </div>
        </div>
      </div>
      <div className={s.cs}>
        <img src='/img/cs.png' alt='Coming Soon' />
      </div>
    </div>
  )
}
