import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormulaireCreationFestival = ({ onClose }) => {
  const [nouveauFestival, setNouveauFestival] = useState({
    year: '',
    jours: [],
    postes: [],
  });

  // Liste des jours et postes disponibles dans le formulaire
  const joursDisponibles = [
    { label: 'Vendredi', numeroJour: 1 },
    { label: 'Samedi', numeroJour: 2 },
    { label: 'Dimanche', numeroJour: 3 },
    // Ajoutez d'autres jours au besoin
  ];

  const postesDisponibles = [
    { nom: 'Accueil' },
    { nom: 'Animations jeux' },
    { nom: 'Vente restauration'},
    { nom: 'Cuisine'},
    { nom: 'Tombola'},
    { nom: 'Forum associations'},
    // Ajoutez d'autres postes au besoin
  ];

  const handleChange = (e) => {
    setNouveauFestival({
      ...nouveauFestival,
      [e.target.name]: e.target.value,
    });
  };

  const handleJourChange = (e) => {
    const selectedJours = joursDisponibles
      .filter(jour => e.target.checked && e.target.value === jour.numeroJour.toString())
      .map(jour => ({ label: jour.label, numeroJour: jour.numeroJour }));
    
    setNouveauFestival({
      ...nouveauFestival,
      jours: selectedJours,
    });
  };

  const handlePosteChange = (e) => {
    const selectedPostes = postesDisponibles
      .filter(poste => e.target.checked && e.target.value === poste.nom)
      .map(poste => ({ nom: poste.nom }));
    
    setNouveauFestival({
      ...nouveauFestival,
      postes: selectedPostes,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, value } = e.target;

  // Convertir la valeur en nombre si ce n'est pas déjà un nombre
  const numericValue = isNaN(value) ? value : parseInt(value, 10);

  setNouveauFestival({
    ...nouveauFestival,
    [name]: numericValue,
  });

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/festivals`, nouveauFestival);
      console.log('Réponse de création du festival :', response.data);
      onClose();
    } catch (error) {
      //detail de l'erreur
      console.error('Erreur lors de la création du festival :', error.response.data);        
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Année:
          <input
            type="number"
            name="year"
            value={nouveauFestival.year}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Jours:
          <table>
            <tbody>
              {joursDisponibles.map((jour, index) => (
                <tr key={index}>
                  <td>{jour.label}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={jour.numeroJour}
                      onChange={handleJourChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </label>

        <label>
          Postes:
          <table>
            <tbody>
              {postesDisponibles.map((poste, index) => (
                <tr key={index}>
                  <td>{poste.nom}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={poste.nom}
                      onChange={handlePosteChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </label>

        <button type="submit">Créer le Festival</button>
      </form>
    </div>
  );
};

export default FormulaireCreationFestival;
