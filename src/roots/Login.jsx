import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import '../css/Login.css';
import.meta.env.VITE_BACKEND_URL

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleLogin = async () => {
    try {
      // Effectuer la requête POST d'authentification
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      // Traiter la réponse de l'API
      console.log('Réponse de l\'API:', response.data);
      if (response.data.compteValide) {
        // Connecter l'utilisateur
        login(response.data);
        
        // Naviguer vers la page d'accueil après une connexion réussie
        navigate('/home');
      } else {
        // Afficher une alerte si le compte n'est pas validé
        alert("Votre inscription n'a pas encore été validée par un administrateur.");
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      if (error.response) {
        // La requête a été effectuée et le serveur a répondu avec un statut qui n'est pas 2xx.
        console.error('Réponse détaillée du serveur:', error.response.data);
      } else if (error.request) {
        // La requête a été effectuée mais aucune réponse n'a été reçue.
        console.error('Aucune réponse du serveur reçue');
      } else {
        // Une erreur s'est produite lors de la configuration de la requête.
        console.error('Erreur de configuration de la requête:', error.message);
      }
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
          email:
          <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
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
