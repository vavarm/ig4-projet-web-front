import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      // Effectuer la requête POST d'authentification
      const response = await axios.post('URL_DE_VOTRE_API/login', {
        username,
        password,
      });

      // Traiter la réponse de l'API
      console.log('Réponse de l\'API:', response.data);
      login(response.data); 

      // Naviguer vers la page d'accueil après une connexion réussie
      navigate('/home');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); 
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form>
        <label>
          Nom d'utilisateur:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <Button onClick={handleLogin} variant="primary">
          Se connecter
        </Button>
      </form>
      <p>Vous n'avez pas de compte ?</p>
      <Button onClick={handleNavigateToRegister} variant="link">
        S'inscrire
      </Button>
    </div>
  );
};

export default Login;
