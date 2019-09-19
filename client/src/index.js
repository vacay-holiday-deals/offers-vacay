import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import AppRouter from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
require('dotenv').config()

const options = {
  position: 'top center',
  timeout: 8000,
  offset: '30px',
  transition: 'fade'
}

const app = (
  <AuthProvider>
    <AlertProvider template={AlertTemplate} {...options}>
      <AppRouter></AppRouter>
    </AlertProvider>
  </AuthProvider>
)

ReactDOM.render(app, document.getElementById('root'))
serviceWorker.unregister()
