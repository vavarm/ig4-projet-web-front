import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Navbar.css'; // Importe le fichier CSS
import logo from '../css/images/logo.png';
import deco from '../css/images/deconnexion.png';

const Navbar = () => {

  const handleLogout = () => {
    // Effectuer la requête POST de déconnexion
    // Naviguer vers la page de connexion après une déconnexion réussie
    console.log('Déconnexion');
    logout();
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
          <Link to="/home/planning" className="nav-link">
            Planning
          </Link>
        </li>
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
