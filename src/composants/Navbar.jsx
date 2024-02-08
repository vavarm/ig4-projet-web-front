import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../css/Navbar.css' // Importe le fichier CSS
import logo from '../css/images/logo.png'
import deco from '../css/images/deconnexion.png'
import axios from 'axios'

import.meta.env.VITE_BACKEND_URL

const Navbar = () => {
  const axiosConfig = useAuth().axiosConfig

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Effectuer la requête POST de déconnexion
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        axiosConfig
      )
      // Naviguer vers la page de connexion après une déconnexion réussie
      console.log('Déconnexion')
      logout()
      // Ajouter ici la logique pour rediriger l'utilisateur vers la page de connexion
      navigate('/login')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  return (
    <nav className='sidebar'>
      <div className='logo-container'>
        <img src={logo} alt='logo' className='logo' />
      </div>
      <ul>
        <li>
          <Link to='/home' className='nav-link'>
            Accueil
          </Link>
        </li>
        <li>
          <Link to='/festival' className='nav-link'>
            Festival
          </Link>
        </li>
        {user && user.role === 'Admin' && (
          <li>
            <Link to='/jeux' className='nav-link'>
              Jeux
            </Link>
          </li>
        )}
        <li>
          <Link to='/planning' className='nav-link'>
            Planning
          </Link>
        </li>
        {user && user.role === 'Admin' && (
          <li>
            <Link to='/inscription' className='nav-link'>
              inscription
            </Link>
          </li>
        )}
        <li>
          <Link to='/profil' className='nav-link'>
            Profil
          </Link>
        </li>
      </ul>
      <button className='sidebar-button' onClick={handleLogout}>
        <img src={deco} alt='deco' className='deco-logo' />
      </button>
    </nav>
  )
}

export default Navbar
