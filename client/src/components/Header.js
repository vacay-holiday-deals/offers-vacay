import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Event } from './tracking/googleTracking'
import { TrackEvent } from './tracking/facebookTracking'

function Header() {
  const URL_PROXY = process.env.REACT_APP_PROXY_URL
  const PORT_NUM = process.env.REACT_APP_PORT_NUM

  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    setCounter(counter + 1)
    TrackEvent('Clicked on more offers Link', 'More offers link')
    Event('MORE OFFERS LINK', 'Clicked on more offers link', 'MORE_OFFERS_LINK')

    const data = { counter, tag: 'more offers' }

    fetch(`${URL_PROXY}:${PORT_NUM}/api/recordclicks`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'cors'
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })
  }

  return (
    <div className='header'>
      <Link to='/'>
        <div className='header--logo'>
          <img alt='logo' src='images/logo.png' />
        </div>
      </Link>
      <div className='header--button'>
        <a
          href='https://vacay.co.ke/destinations-in-africa/'
          className='btn stylebutton'
          rel='noopener noreferrer'
          onClick={handleClick}
          target='_blank'>
          More offers
        </a>
      </div>
    </div>
  )
}

export default Header
