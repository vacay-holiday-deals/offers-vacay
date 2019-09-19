// store, get and remove token from localstorage
export function saveTokenToLocalStorage(token) {
  try {
    //const serializedToken = JSON.stringify(token)
    return localStorage.setItem('auth-token', token)
  } catch (error) {
    return false
  }
}

export function getTokenFromLocalStorage() {
  try {
    const token = localStorage.getItem('auth-token')
    return token === null ? undefined : token
  } catch (error) {
    return undefined
  }
}

export function removeTokenFromLocalStorage() {
  try {
    return localStorage.removeItem('auth-token')
  } catch (error) {
    return false
  }
}
