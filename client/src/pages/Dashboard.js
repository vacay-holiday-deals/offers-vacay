import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { config } from '../utils/offers/Offers'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrashAlt,
  faPencilAlt,
  faEye,
  faPlusCircle,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

function Dashboard({ history }) {
  const alert = useAlert()

  const { user } = useContext(AuthContext)
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/api/getoffer', config)
      .then(res => {
        setLoading(false)
        setOffers(res.data)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }, [])

  const { userClaims } = user

  const handleEdit = () => {
    // edit functionality
    alert.info('You have clicked edit')
  }

  const handleDelete = () => {
    // delete functionality
    alert.info('You have clicked delete')
  }
  return (
    <div className='dashboard--container'>
      <Sidebar></Sidebar>
      <div className='dashboard--wrapper'>
        <div className='dashboard--actions'>
          <Link to='/addoffers' className='btn btn--offer'>
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
            <span style={{ marginLeft: '1rem' }}>Create offer</span>
          </Link>
          <div>Offers : {offers.length}</div>

          {userClaims === 'admin' ? (
            <Link to='/addUser' className='btn btn--offer'>
              <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
              <span style={{ marginLeft: '1rem' }}>Create user</span>
            </Link>
          ) : (
            ''
          )}
        </div>

        {loading ? (
          <div className='loader'>
            <Loader
              type='ThreeDots'
              color='blue'
              height={70}
              width={70}></Loader>
          </div>
        ) : offers.length === 0 ? (
          <div> No offers available</div>
        ) : (
          offers.map(offer => {
            const { id, title, images, created } = offer
            return (
              <div className='card' key={id}>
                <div className='img--wrapper'>
                  <div className='card--img'>
                    <img
                      src={images ? images[0] : '/images/svg/travel.svg'}
                      alt='offer img'
                    />
                  </div>
                </div>

                <div className='card--content'>
                  <div className='card--content-body'>
                    <h5>{title}</h5>
                    <small>
                      <p>{format(created, 'MMMM DD, YYYY')}</p>
                    </small>
                    <a
                      href={`http://0.0.0.0:3000/${title}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn btn--view'>
                      <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                      <span style={{ marginLeft: '1rem' }}>view offer</span>
                    </a>
                  </div>
                  <div className='card--actions'>
                    <span className='edit' onClick={handleEdit}>
                      <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                      <span style={{ marginLeft: '20px' }}>edit</span>
                    </span>
                    <span className='delete' onClick={handleDelete}>
                      <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                      <span style={{ marginLeft: '20px' }}>delete</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Dashboard
