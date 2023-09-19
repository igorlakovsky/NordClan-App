import '../styles/layout.scss'

import { Button, Form, Input, Popover, notification } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { authUser, logoutUser } from '../store/userSlice'
import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

import { useAppSelector } from '../store/hooks'
import { useDispatch } from 'react-redux'

type User = {
  login: string
  password: string
}

export default function Layout() {
  const dispatch = useDispatch()

  const { pathname } = useLocation()
  const [openPopover, setOpenPopover] = useState(false)

  const userLogin = useAppSelector((state) => state.user.login)

  const submitUser = async (data: User) => {
    try {
      const responce = await axios.post('http://localhost:8080/auth', data)
      dispatch(authUser(responce.data))
      setOpenPopover(false)
    } catch (error) {
      const err = error as AxiosError
      notification.error({ message: err.message })
    }
  }

  const logout = (
    <Button
      danger
      type="primary"
      onClick={() => {
        dispatch(logoutUser())
        setOpenPopover(false)
      }}
    >
      Выйти
    </Button>
  )

  const login = (
    <Form
      layout="vertical"
      className="header__form__wrapper"
      requiredMark={false}
      onFinish={submitUser}
    >
      <Form.Item
        label="Логин"
        name="login"
        className="header__form"
        rules={[{ required: true, message: 'Введите свой логин' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        className="header__form"
        rules={[{ required: true, message: 'Введите свой пароль' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{ textAlign: 'end', marginTop: '20px' }}>
        <Button type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )

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
          <Popover
            content={userLogin ? logout : login}
            trigger="click"
            open={openPopover}
            onOpenChange={(open) => {
              setOpenPopover(open)
            }}
          >
            {userLogin ? (
              <div className="header__user">
                <span>{userLogin}</span>
                <img src="/images/user.png"></img>
              </div>
            ) : (
              <div className="header__user">
                <span>Войти</span>
                <img src="/images/user.png"></img>
              </div>
            )}
          </Popover>
        </div>
      </div>
      <div className="layout" id="content">
        <Outlet></Outlet>
      </div>
    </main>
  )
}
