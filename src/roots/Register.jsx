import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accommodationOption, setAccommodationOption] = useState('none');

  const handleRegister = () => {

    console.log('Registration functionality (to be implemented by backend)');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Accommodation Option:', accommodationOption);
  };

  return (
    <div>
      <h2>Inscription</h2>
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
        <label>
          Hébergement:
          <select
            value={accommodationOption}
            onChange={(e) => setAccommodationOption(e.target.value)}
          >
            <option value="none">Je ne peux pas héberger</option>
            <option value="need">J'ai besoin d'un hébergement</option>
            <option value="offer">Je peux proposer un hébergement</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
