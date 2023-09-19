import './styles/index.scss'

import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>
)
