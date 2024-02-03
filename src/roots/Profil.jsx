import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profil = () => {
  // Accéder aux données de l'utilisateur depuis le contexte d'authentification
  const { user } = useAuth();

  return (
    <div className='content'>
      <h2>Profil</h2>
      <p>
        <strong>Nom:</strong> {user.nom}
      </p>
      <p>
        <strong>Prénom:</strong> {user.prenom}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Adresse:</strong> {user.adressePostale}, {user.codePostal} {user.ville}
      </p>
      <p>
        <strong>Téléphone:</strong> {user.telephone}
      </p>
      <p>
        <strong>Taille de T-shirt:</strong> {user.taille_tshirt}
      </p>
      <p>
        <strong>Végétarien:</strong> {user.vegetarien ? 'Oui' : 'Non'}
      </p>
      <p>
        <strong>Hébergement:</strong> {user.hebergement}
      </p>
    </div>
  );
};

export default Profil;