import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import axios from 'axios';


const Profil = () => {
  // Accéder aux données de l'utilisateur depuis le contexte d'authentification
  const { user } = useAuth();

  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prenom);
  const [telephone, setTelephone] = useState(user.telephone);
  const [hebergement, setHebergement] = useState(user.hebergement);
  const [adressePostale, setAdressePostale] = useState(user.adressePostale);
  const [codePostal, setCodePostal] = useState(user.codePostal);
  const [ville, setVille] = useState(user.ville);
  const [taille_tshirt, setTaille_tshirt] = useState( user.taille_tshirt);
  const [vegetarien, setVegetarien] = useState(user.vegetarien);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const showForm = () => {
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setIsFormVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Soumission du formulaire');
    try {
      // Effectuer la requête PATCH pour mettre à jour les informations de l'utilisateur
      const response = await axios.patch(`http://localhost:3000/benevoles/${user.id}`, {
        nom,
        prenom,
        adressePostale,
        codePostal,
        ville,
        telephone,
        taille_tshirt,
        vegetarien,
        hebergement,
      });
      // Traiter la réponse de l'API
      console.log('Réponse de l\'API:', response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
    hideForm();
  };


  return (
    <div className='content'>
      <h2>Profil</h2>
      <button onClick={showForm} style={{ marginLeft: 'auto', display: 'block' }}>Modifier</button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label>
            Prenom:
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          </label>
          <label>
            Nom:
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
          </label>
          <label>
            Ville:
            <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} />
          </label>
          <label>
            Code postal:
            <input type="text" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} />
          </label>
          <label>
            Adresse postale:
            <input type="text" value={adressePostale} onChange={(e) => setAdressePostale(e.target.value)} />
          </label>
          <label>
            Telephone:
            <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </label>
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
          <label>
            Végétarien:
            <input
              type="checkbox"
              checked={vegetarien}
              onChange={() => setVegetarien(!vegetarien)}
            />  
          </label>
          <label>
            Hébergement:
            <select
              value={hebergement}
              onChange={(e) => setHebergement(e.target.value)}
            >
              <option value="AUCUN">Je n'ai pas besoin d'hebergement</option>
              <option value="RECHERCHE">J'ai besoin d'un hebergement</option>
              <option value="PROPOSE">Je peux herberger</option>
            </select>
          </label>
          {/* Bouton de soumission du formulaire */}
          <button type="submit">Soumettre</button>

          {/* Bouton pour cacher le formulaire sans le soumettre */}
          <button type="button" onClick={hideForm}>
            Annuler
          </button>
        </form>
      )}
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
      <p>
        <strong>Associations:</strong> {user.associations}
      </p>
    </div>
  );
};

export default Profil;