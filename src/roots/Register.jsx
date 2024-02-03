import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import '../css/Register.css';


const Register = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [hebergement, setHebergement] = useState('AUCUN');
  const [adressePostale, setAdressePostale] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [taille_tshirt, setTaille_tshirt] = useState('');
  const [vegetarien, setVegetarien] = useState(false);
  const [role, setRole] = useState('Benevole');
  const [compteValide, setCompteValide] = useState(false);
  const [associations, setAssociation] = useState([]);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Effectuer la requête POST d'inscription
      const response = await axios.post('http://localhost:3000/benevoles', {
        nom,
        prenom,
        email,
        password,
        adressePostale,
        codePostal,
        ville,
        telephone,
        taille_tshirt,
        associations,
        vegetarien,
        hebergement,
        role,
        compteValide    
      });

      // Traiter la réponse de l'API
      console.log('Réponse de l\'API:', response.data);

      // Ajoutez ici la logique pour rediriger l'utilisateur vers la page de connexion après une inscription réussie
      alert("Votre inscription a bien été prise en compte. Vous pourrez vous connecter une fois votre compte validé par un administrateur.");
      navigate('/login')
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
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

  return (
    <div>
      <h2>Inscription</h2>
      <form>
        <label>
          Prénom:
          <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </label>
        <label>
          Nom:
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <label>
          Adresse e-mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Mot de passe:
        </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>
          Numéro de téléphone:
          <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </label>
        <label>
          Ville:
          <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} />
        </label>
        <br />
        <label>
          Adresse:
          <input type="text" value={adressePostale} onChange={(e) => setAdressePostale(e.target.value)} />
        </label>
        <br />
        <label>
          Code Postal:
          <input type="text" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
        </label>
        <br />
        <label>
          Hébergement:
          <select
            value={hebergement}
            onChange={(e) => setHebergement(e.target.value)}
          >
            <option value="AUCUN">Je ne peux pas héberger</option>
            <option value="RECHERCHE">J'ai besoin d'un hébergement</option>
            <option value="PROPOSE">Je peux proposer un hébergement</option>
          </select>
        </label>
        <br />
        <label>Taille du T-shirt:</label>
        <div className='div-tshirt'>
          <label>
            XS
            <input
              type="radio"
              value="XS"
              checked={taille_tshirt === 'XS'}
              onChange={() => setTaille_tshirt('XS')}
            />
          </label>
          <label>
            S
            <input
              type="radio"
              value="S"
              checked={taille_tshirt === 'S'}
              onChange={() => setTaille_tshirt('S')}
            />
          </label>
          <label>
            M
            <input
              type="radio"
              value="M"
              checked={taille_tshirt === 'M'}
              onChange={() => setTaille_tshirt('M')}
            />
          </label>
          <label>
            L
            <input
              type="radio"
              value="L"
              checked={taille_tshirt === 'L'}
              onChange={() => setTaille_tshirt('L')}
            />
          </label>
          <label>
            XL
            <input
              type="radio"
              value="XL"
              checked={taille_tshirt === 'XL'}
              onChange={() => setTaille_tshirt('XL')}
            />
          </label>
          <label>
            XXL
            <input
              type="radio"
              value="XXL"
              checked={taille_tshirt === 'XXL'}
              onChange={() => setTaille_tshirt('XXL')}
            />
          </label>
        </div>
        <select
            value={vegetarien}
            onChange={(e) => setVegetarien(e.target.value)}
          >
            <option value="false">Je ne suis pas végétarien</option>
            <option value="true">Je suis végétarien</option>
          </select>
        <button type="button" onClick={handleRegister}>
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
