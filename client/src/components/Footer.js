import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer--container'>
        <div className='footer--contact cards'>
          <h3 className='footer--header'>Contact</h3>
          <div className='items'>
            <a
              href='https://goo.gl/maps/nTDfSdaBrpSho1nn7'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Tsavo Road, South B
            </a>
            <a
              href='tel:254716875656'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              +254 716 875656
            </a>
            <a
              href='MAILTO:info@vacay.co.ke'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              info@vacay.co.ke
            </a>
          </div>
        </div>
        <div className='footer--resources cards'>
          <h3 className='footer--header'>Resources</h3>
          <div className='items'>
            <a
              href='https://vacay.co.ke/trip-now-pay-later/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Trip Now Pay Later
            </a>
            <a
              href='https://vacay.co.ke/reviews/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Reviews
            </a>
            <a
              href='https://vacay.co.ke/blog/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Blog
            </a>
            <Link
              to='/vacay-holiday-deals-privacy-policy'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Privacy and Policy
            </Link>
          </div>
        </div>
        <div className='footer--links cards'>
          <h3 className='footer--header'>Links</h3>
          <div className='items'>
            <a
              href='https://vacay.co.ke'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Home
            </a>
            <a
              href='https://vacay.co.ke/destinations-in-africa/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Destinations
            </a>
            <a
              href='https://vacay.co.ke/kenya-tours/resident-packages/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Packages
            </a>
            <a
              href='https://vacay.co.ke/flights/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              Flights
            </a>
          </div>
        </div>
        <div className='footer--social cards'>
          <h3 className='footer--header'>Social</h3>
          <div className='items'>
            <a
              href='https://www.instagram.com/vacayholidaydeals/?hl=en'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              <FontAwesomeIcon icon={faInstagram} className='icon' />
              <span>instagram</span>
            </a>
            <a
              href='https://www.facebook.com/vacaydeals/'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              <FontAwesomeIcon icon={faFacebook} className='icon' />
              <span>facebook</span>
            </a>
            <a
              href='https://twitter.com/Vacay_Deals'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              <FontAwesomeIcon icon={faTwitter} className='icon' />
              <span>twitter</span>
            </a>
            <a
              href='https://wa.me/254716875656'
              className='link--items'
              rel='noopener noreferrer'
              target='_blank'>
              <FontAwesomeIcon icon={faWhatsapp} className='icon' />
              <span>whatsapp</span>
            </a>
          </div>
        </div>
      </div>

      <div className='footer--copyright'>
        <hr className='hr' />
        <p className='link'>&copy; vacay.co.ke 2019 All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
