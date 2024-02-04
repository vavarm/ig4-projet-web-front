import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; // Importe le fichier CSS
import logo from '../css/images/logo.png';
import deco from '../css/images/deconnexion.png';
import axios from 'axios';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Effectuer la requête POST de déconnexion
      const response = await axios.post('http://localhost:3000/auth/logout');
      // Naviguer vers la page de connexion après une déconnexion réussie
      console.log('Déconnexion');
      logout();
      // Ajouter ici la logique pour rediriger l'utilisateur vers la page de connexion
      navigate('/login')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="logo" className='logo' />
      </div>
      <ul>
        <li>
          <Link to="/home/home" className="nav-link">
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/home/festival" className="nav-link">
            Festival
          </Link>
        </li>
        <li>
          <Link to="/home/planning" className="nav-link">
            Planning
          </Link>
        </li>
        {user && user.role === 'Admin' && (
        <li>
          <Link to="/home/inscription" className="nav-link">
            inscription
          </Link>
        </li>
        )}
        <li>
          <Link to="/home/profil" className="nav-link">
            Profil
          </Link>
        </li>
      </ul>
      <button className="sidebar-button" onClick={handleLogout}>
        <img src={deco} alt="deco" className="deco-logo" />
      </button>
    </nav>
  );
};

export default Navbar;
