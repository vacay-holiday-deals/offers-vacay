import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { logout } from '../utils/auth/AuthControls'
import history from '../routes/AppHistory'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'

function Sidebar() {
  const { setIsAuthenticated, user } = useContext(AuthContext)
  const handleClick = () => {
    logout()
    setIsAuthenticated(false)
    history.replace('/login')
  }
  const { userName } = user

  return (
    <div className='sidebar'>
      <div className='sidebar--wrapper'>
        <div className='sidebar--wrapper-logo'>
          <Link to='/dashboard' className='logo-link'>
            <img src='/images/logo.png' alt='vacay holiday deals' />
          </Link>
        </div>
        <div className='sidebar--wrapper-user'>
          <FontAwesomeIcon
            icon={faUserAlt}
            className='icon--user'></FontAwesomeIcon>
          <p>{userName}</p>
        </div>
      </div>
      <div className='sidebar--bottom'>
        <div className='sidebar--bottom-logout' onClick={handleClick}>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className='icon--logout'></FontAwesomeIcon>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
