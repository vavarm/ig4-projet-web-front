import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // Importe le fichier CSS
import logo from '../css/images/logo.png';
import deco from '../css/images/deconnexion.png';

const Navbar = () => {
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
      <button className="sidebar-button">
        <img src={deco} alt="deco" className="deco-logo" />
      </button>
    </nav>
  );
};

export default Navbar;
