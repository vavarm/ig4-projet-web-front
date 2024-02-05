import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  }

  const login = (userData) => {
    console.log('login', userData.benevole)
    setUser(userData.benevole)
    setToken(userData.accessToken)
    // register token in local storage
    localStorage.setItem('token', userData.accessToken)
    localStorage.setItem('user', JSON.stringify(userData.benevole))
  }

  const logout = () => {
    setUser(null)
    // Ajoutez ici la logique de déconnexion, par exemple, supprimer les cookies
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('checkAuth', user)
    if (token && user) {
      console.log('setting user and token')
      setUser(user)
      setToken(token)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{ user, token, axiosConfig, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
