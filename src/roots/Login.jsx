import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(`Logging in with username: ${username} and password: ${password}`);
    navigate('/home');
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
