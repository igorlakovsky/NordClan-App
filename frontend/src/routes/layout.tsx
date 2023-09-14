import '../styles/layout.scss'

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <main className="app">
      <div className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src="images/logo.svg"></img>
          </div>
          <div className="header__user">
            <img src="images/user.png"></img>
          </div>
        </div>
      </div>
      <div className="layout">
        <Outlet></Outlet>
      </div>
    </main>
  )
}
