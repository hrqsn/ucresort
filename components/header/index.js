import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import cn from 'classnames'

import s from './style.module.scss'

export default function Header () {
  const router = useRouter()
  const [open, setOpen] = useState(null)

  useEffect(() => {
    let active = -1
    let hover = 0
    const links = []
    const left = document.querySelector(`.${s.nav__links}`).getBoundingClientRect().left
    
    document.querySelectorAll(`.${s.nav__link}`).forEach((link, i) => {
      const config = {
        x: link.getBoundingClientRect().left - left,
        width: link.getBoundingClientRect().width,
        margin: (link.getBoundingClientRect().width - 12) / 2
      }
      links.push(config)

      if (link.classList.contains(s.active)) {
        active = i
        hover = i
        document.querySelector(`.${s.nav__bar}`).style.transform = `translateX(${config.x + config.margin}px)`
      }

      link.addEventListener('mouseenter', () => handleHover(i))
      link.addEventListener('click', () => handleClick(i))
    })
    document.querySelector(`.${s.nav__links}`).addEventListener('mouseleave', handleLeave)

    function handleHover (i) {
      hover = i
      gsap.to(`.${s.nav__bar}`, {
        x: links[i].x + links[i].margin
      })
    }

    function handleClick (i) {
      active = i
      hover = i
    }

    function handleLeave () {
      if (hover === active) return
      gsap.to(`.${s.nav__bar}`, {
        x: links[active < 0 ? 0 : active].x + links[active < 0 ? 0 : active].margin
      })
    }

    if (active < 0) {
      gsap.set(`.${s.nav__bar}`, {
        opacity: 0
      })
    } else {
      gsap.to(`.${s.nav__bar}`, {
        x: links[active].x + links[active].margin,
        opacity: 1
      })
    }
  }, [router.pathname])

  const toggleMenu = () => setOpen(!open)
  const tapRoot = () => {
    if (open) setOpen(false)
  }

  useEffect(() => {
    if (open === null) return

    if (open) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'

      gsap.timeline()
      .to(`.${s.menu__btn}>span:nth-child(1)`, {
        y: 3.5,
        duration: .2,
        ease: 'expo.out'
      }).to(`.${s.menu__btn}>span:nth-child(2)`, {
        y: -3.5,
        duration: .2,
        ease: 'expo.out'
      }, '<').set(`.${s.menu__btn}>span:nth-child(2)`, {
        width: 20
      }).to(`.${s.menu__btn}>span:nth-child(1)`, {
        rotation: 45,
        duration: .4,
        ease: 'expo.out'
      }).to(`.${s.menu__btn}>span:nth-child(2)`, {
        rotation: -45,
        duration: .4,
        ease: 'expo.out'
      }, '<')
    } else {
      gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = null
          document.body.style.overflow = null
        }
      })
      .to(`.${s.menu__btn}>span:nth-child(1)`, {
        rotation: 0,
        duration: .2,
        ease: 'expo.out'
      }).to(`.${s.menu__btn}>span:nth-child(2)`, {
        rotation: 0,
        duration: .2,
        ease: 'expo.out'
      }, '<').set(`.${s.menu__btn}>span:nth-child(2)`, {
        width: 16
      }).to(`.${s.menu__btn}>span:nth-child(1)`, {
        y: 0,
        duration: .4,
        ease: 'expo.out'
      }).to(`.${s.menu__btn}>span:nth-child(2)`, {
        y: 0,
        duration: .4,
        ease: 'expo.out'
      }, '<')
    }
  }, [open])

  function active (pathname) {
    if (router.pathname === pathname) return true
    return false
  }

  return (
    <>
      <header className={s.container}>
        <div className={s.wrapper}>
          <div className={s.inner}>
            <div className={s.root}>
              <Link href='/'>
                <a className={s.root__logo} onClick={tapRoot}>
                  <img src='/img/logo.svg' alt='Universal Cube Resort' width={49.12} height={32} />
                </a>
              </Link>
            </div>
            <div className={s.nav}>
              <nav className={s.nav__links}>
                <Link href='/'>
                  <a className={cn(s.nav__link, active('/') && s.active)}>ホーム</a>
                </Link>
                <Link href='/terms'>
                  <a className={cn(s.nav__link, active('/terms') && s.active)}>利用規約</a>
                </Link>
              </nav>
              <span className={s.nav__bar} />
            </div>
            <div className={cn(s.menu, open && s['is-open'])}>
              <button className={s.menu__btn} onClick={toggleMenu} arealabel='Hamburger Menu'>
                <span />
                <span />
              </button>
              <div className={s.menu__overlay} />
              <div className={s.menu__nav}>
                <div className={s.menu__inner}>
                  <nav className={s.menu__links}>
                    <Link href='/'>
                      <a className={cn(s.menu__link, active('/') && s.active)} onClick={toggleMenu}>
                        <span>ホーム</span>
                      </a>
                    </Link>
                    <Link href='/terms'>
                      <a className={cn(s.menu__link, active('/terms') && s.active)} onClick={toggleMenu}>
                        <span>利用規約</span>
                      </a>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
