import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserAlt,
  faKey,
  faEnvelope,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { config } from '../../utils/offers/Offers'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = () => {
    const details = {
      name,
      email,
      username,
      role,
      password
    }
    axios
      .post('/api/adduser', details, config)
      .then(res => console.log(res))
      .then(error => console.log(error))
  }
  return (
    <div className='user'>
      <div className='user-wrapper'>
        <form action='' method='POST'>
          <h3>Login to your account</h3>
          <div className='form--group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              placeholder='name'
              className='form--control'
              onChange={e => setName(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faUserAlt}
              className='icon icon--user'></FontAwesomeIcon>
          </div>
          <div className='form--group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email'
              value={email}
              className='form--control'
              onChange={e => setEmail(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEnvelope}
              className='icon icon--key'></FontAwesomeIcon>
          </div>
          <div className='form--group'>
            <label htmlFor='username'>Username</label>
            <input
              type='username'
              name='username'
              id='username'
              placeholder='username'
              value={username}
              className='form--control'
              onChange={e => setUsername(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faUserAlt}
              className='icon icon--key'></FontAwesomeIcon>
          </div>
          <div className='form--group'>
            <label htmlFor='role'>Permisions</label>
            <select
              type='role'
              name='role'
              id='role'
              placeholder='role'
              value={role}
              className='form--control'
              onChange={e => setRole(e.target.value)}>
              <option>Admin</option>
              <option>User</option>
            </select>
            <FontAwesomeIcon
              icon={faUsersCog}
              className='icon icon--key'></FontAwesomeIcon>
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
        <button onClick={handleClick} className='btn'>
          Create User
        </button>
      </div>
    </div>
  )
}

export default Register
