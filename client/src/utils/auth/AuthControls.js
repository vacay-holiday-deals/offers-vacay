import axios from 'axios'
import { removeTokenFromLocalStorage } from '../../localstorage/LocalStorage'

// axios config
const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

// function to login
export const login = async (username, password) => {
  const details = {
    username,
    password
  }

  try {
    const res = await axios.post('/api/login', details, config)
    return res.data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const addUser = async (name, email, username, role, password) => {
  const details = {
    name,
    email,
    username,
    role,
    password
  }

  try {
    const res = await axios.post('/api/adduser', details, config)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const logout = () => {
  removeTokenFromLocalStorage()
}

export const isValidToken = token => {
  const cTs = Math.floor(Date.now() / 1000)
  return token >= cTs
}
