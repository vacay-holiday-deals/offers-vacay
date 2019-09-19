import React, { useState, useEffect } from 'react'
import Carousel from './Carousel'
import Sharebar from './Share'
import Form from './forms/Forms'
import Tabs from './tabs/Tabs'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import parser from 'html-react-parser'
import Call from './Call'
import Footer from './Footer'
import Header from './Header'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import { initGA, PageView } from './tracking/googleTracking'
import { initPixel, TrackPageView } from './tracking/facebookTracking'

function Landing(props) {
  const googleTrackingId = ''
  const pixelTrackingId = ''

  const [offer, setOffer] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getOffer = async () => {
    const { title } = props.match.params
    const res = await axios.get(`/api/getoffer/${title}`)
    return res.data
  }
  // function to change value to string and parse it as html value
  const changeToString = value => {
    const val = String(value)
      .split('"')
      .join('')
    return parser(val)
  }

  useEffect(() => {
    initGA(googleTrackingId)
    initPixel(pixelTrackingId)
    PageView()
    TrackPageView()

    const result = getOffer()
    setTimeout(() => {
      setLoaded(true)
    }, 500)
    result
      .then(res => setOffer(res))
      .catch(error => {
        setLoaded(false)
        console.log(error)
      })
    // eslint-disable-next-line
  }, [])

  const {
    title,
    overview,
    itinerary,
    inclusion,
    price,
    addinfo,
    images
  } = offer

  return (
    <div className='App'>
      {!loaded ? (
        <div className='loader'>
          <Loader type='Bars' color='#0068b3' height={150} width={150} />
        </div>
      ) : (
        <div className='App'>
          <Call />
          <Header />
          <div className='landing'>
            <div className='landing--container'>
              <section className='landing--carousel'>
                <img
                  src={images ? images[0] : '/images/beach.jpg'}
                  alt='slider background'
                  className='background--image'
                />
                <div className='carousel--container'>
                  <Carousel images={images} />
                </div>
              </section>
              <section className='landing--info'>
                <Container fluid={true} className='landing--info-container'>
                  <div className='landing--info-tabs'>
                    <h4 className='info--title'>{title}</h4>
                    <Tabs>
                      <div label='Overview'>{changeToString(overview)}</div>
                      <div label='Itinerary'>{changeToString(itinerary)}</div>
                      <div label='Inclusions & Exclusions'>
                        {changeToString(inclusion)}
                      </div>
                      <div label='Price'>{changeToString(price)}</div>
                    </Tabs>
                    <div className='more--info'>
                      {addinfo === '' ? (
                        <p />
                      ) : (
                        <div>
                          <h5>Additional Information</h5>
                          {changeToString(addinfo)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='landing--info-form'>
                    <Sharebar title={title} image={images} />
                    <Form title={title} />
                  </div>
                </Container>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

Landing.propTypes = {
  offers: PropTypes.array.isRequired
}

Landing.defaultProps = {
  offers: []
}
export default Landing
