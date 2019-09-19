import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { login } from '../../utils/auth/AuthControls'
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage
} from '../../localstorage/LocalStorage'
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons'
import decode from 'jwt-decode'

function Login({ history }) {
  const { setIsAuthenticated } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setIsLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    // call the login function
    setIsLoading(true)
    try {
      const res = await login(username, password)

      // decode token, and check if it contains username as an identity
      const decodeToken = decode(res.token)
      const { identity } = decodeToken
      if (identity.username !== username) {
        removeTokenFromLocalStorage()
        history.push('/')
      }
      saveTokenToLocalStorage(res.token)
      const token = getTokenFromLocalStorage()
      setIsLoading(false)
      if (token) {
        setIsAuthenticated(true)
        history.push('/dashboard')
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className='login--container'>
      <div className='login--form'>
        <form action='' method='POST' className='form--content'>
          <h3>Login to your account</h3>
          <div className='form--group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              placeholder='username'
              className='form--control'
              onChange={e => setUsername(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faUserAlt}
              className='icon icon--user'></FontAwesomeIcon>
          </div>
          <div className='form--group'>
            <label htmlFor='username'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              value={password}
              className='form--control'
              onChange={e => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faKey}
              className='icon icon--key'></FontAwesomeIcon>
          </div>
          <span>
            <p>
              <small>
                Problems? <a href='MAILTO:mymbugua@gmail.com'>contact admin</a>
              </small>
            </p>
          </span>
        </form>
        <button className='btn btn--login' onClick={handleSubmit}>
          {isloading ? (
            <span>
              <Loader
                type='ThreeDots'
                color='#fff'
                height={45}
                width={45}></Loader>
            </span>
          ) : (
            <span>LOGIN</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Login
