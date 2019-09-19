import axios from 'axios'
import { getTokenFromLocalStorage } from '../../localstorage/LocalStorage'

const token = getTokenFromLocalStorage()

export const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export const getOffers = () => {
  axios
    .get('/api/getoffer', config)
    .then(res => {
      return res.data
    })
    .catch(error => console.log(error))
}
