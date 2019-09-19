import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { TrackEvent } from './tracking/facebookTracking'
import { Event } from './tracking/googleTracking'
require('dotenv').config()

function AllOffers() {
  const [offers, setOffers] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const [value, setValue] = useState('')
  useEffect(() => {
    axios
      .get(`/api/getoffer`)
      .then(res => {
        setTimeout(() => {
          setLoaded(true)
        }, 200)
        setOffers(res.data)
      })
      .catch(error => {
        console.log(error)
        setLoaded(true)
      })
    // eslint-disable-next-line
  }, [])
  const height = '100%'
  const width = '100%'


  let filteredOffers = offers.filter(offer => {
    return offer.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
  })

  return (
    <Fragment>
      <div className='container-fluid landing--container'>
        <div className='landing--img'>
          <LazyLoadImage
            src='images/images/beach.jpg'
            alt='vacay'
            effect='blur'
            className='image'
            height={height}
            width={width}
          />
        </div>

        <div className='search mt-2 mb-2'>
          <input
            type='text'
            placeholder='start typing ...'
            className='search--input'
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
        </div>

        <div className='page--content mt-2'>
          <h4>
            All offers :{' '}
            {!isLoaded ? <span>0</span> : <span>{filteredOffers.length}</span>}
          </h4>
          <div className='content--container'>
            {!isLoaded ? (
              <div className='loader'>
                <Loader type='Bars' color='#0068b3' height={70} width={80} />
              </div>
            ) : filteredOffers.length !== 0 ? (
              filteredOffers.map(offer => {
                const { id, title, created, images } = offer
                return (
                  <div className='card' key={id}>
                    <div
                      style={{
                        height: '20vh',
                        width: '100%',
                        objectFit: 'contain'
                      }}>
                      <img
                        src={images[0]}
                        alt=''
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '3px'
                        }}
                      />
                    </div>
                    <h6 className='mt-3'>
                      <Link
                        to={`/${title}`}
                        onClick={() => {
                          Event(
                            'CLICKED ON OFFER',
                            'Clicked on offer link',
                            title
                          )
                          TrackEvent('Clicked on offer Link', title)
                        }}>
                        <span
                          style={{
                            color: '#000411',
                            fontWeight: '600',
                            marginTop: '5px'
                          }}>
                          {title}
                        </span>
                      </Link>
                    </h6>
                    <p className='ml-10'>{format(created, 'MMMM DD, YYYY')}</p>
                  </div>
                )
              })
            ) : (
              <div className='loader'>
                <span>
                  <span className='ml-15' style={{ textAlign: 'center' }}>
                    &#9785;
                  </span>
                  <br />
                  <strong>No offers available</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

AllOffers.propTypes = {
  offers: PropTypes.array
}

AllOffers.defaultProps = {
  offers: []
}

export default AllOffers
