import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faWhatsapp,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import Navbar from 'react-bootstrap/Navbar'
import { TrackEvent } from '../components/tracking/facebookTracking'
import { Event } from '../components/tracking/googleTracking'

function Share({ title, image, overview }) {
  const url = window.location.href
  const newUrl = encodeURIComponent(url)

  return (
    <div className='share'>
      <h4 className='mt-3 ml-2'>Tell a friend</h4>
      <Navbar className='nav--appbar'>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${newUrl}&quote=${title}&display=page&caption=${title}`}
          className='facebook'
          target='_blank'
          onClick={() => {
            Event('SHARING', 'share to facebook', 'shared_to_facebook')
            TrackEvent('SHARING', 'shared_to_facebook')
          }}
          rel='noopener noreferrer'>
          <span className='fontawesomeicon'>
            <FontAwesomeIcon icon={faFacebook} className='icon' />
          </span>
          Facebook
        </a>
        <a
          href={`http://twitter.com/share?url=${newUrl}\n&text=${title}&hashtags=vacayholidaydeals&via=vacayholidaydeals`}
          className='twitter'
          rel='noopener noreferrer'
          onClick={() => {
            Event('SHARING', 'share to Twitter', 'shared_to_twitter')
            TrackEvent('SHARING', 'shared_to_twitter')
          }}
          target='_blank'>
          <span className='fontawesomeicon'>
            <FontAwesomeIcon icon={faTwitter} className='icon' />
          </span>
          Twitter
        </a>
        <a
          href={`whatsapp://send?text=${newUrl}${title}`}
          className='whatsapp'
          rel='noopener noreferrer'
          onClick={() => {
            Event('SHARING', 'share to whatsapp', 'shared_to_whatsapp')
            TrackEvent('SHARING', 'shared_to_whatsapp')
          }}
          target='_blank'>
          <span className='fontawesomeicon'>
            <FontAwesomeIcon icon={faWhatsapp} className='icon' />
          </span>
          Whatsapp
        </a>
      </Navbar>
    </div>
  )
}

export default Share
