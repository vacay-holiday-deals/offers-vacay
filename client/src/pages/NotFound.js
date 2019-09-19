import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='notfound'>
      <div className='container--404'>
        <div className='image--404'>
          <img src='/images/svg/not_found.svg' alt='404 not_found' />
        </div>
        <h1>Page Not Found</h1>
        <p>What you were looking for is just not there</p>
        <Link to='/' className='link--404'>
          Go somewhere nice
        </Link>
      </div>
    </div>
  )
}

export default NotFound
