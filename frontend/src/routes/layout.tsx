import '../styles/layout.scss'

import { Outlet, useLocation } from 'react-router-dom'

import { useEffect } from 'react'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname != '/') {
      document.getElementById('content')!.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [pathname])

  return (
    <main className="app">
      <div className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src="/images/logo.svg"></img>
          </div>
          <div className="header__user">
            <img src="/images/user.png"></img>
          </div>
        </div>
      </div>
      <div className="layout" id="content">
        <Outlet></Outlet>
      </div>
    </main>
  )
}
