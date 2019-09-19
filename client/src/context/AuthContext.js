import React, { createContext, useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../localstorage/LocalStorage'
import jwtDecode from 'jwt-decode'
// create authentication context
export const AuthContext = createContext()

export const AuthProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({
    userName: '',
    userClaims: '',
    userEmail: ''
  })

  useEffect(() => {
    const token = getTokenFromLocalStorage('auth-token')
    if (token) {
      const { exp } = jwtDecode(token)
      const dateNow = Math.floor(Date.now() / 1000)
      const validToken = dateNow < exp

      if (token && validToken) {
        setIsAuthenticated(true)
      }

      const { identity, user_claims } = jwtDecode(token)

      setUser({
        userName: identity.username,
        userClaims: user_claims,
        userEmail: identity.email
      })
    }
  }, [])

  const contextValues = {
    isAuthenticated,
    setIsAuthenticated,
    user
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {props.children}
    </AuthContext.Provider>
  )
}
