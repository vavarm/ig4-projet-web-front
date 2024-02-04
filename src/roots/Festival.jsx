import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import '../css/Festival.css';

const FestivalPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [festivalsInscrits, setFestivalsInscrits] = useState([]);

    const { user } = useAuth();
    const userId = user.id;
    //console.log('userId', userId);


    useEffect(() => {
        const fetchFestivals = async () => {
          try {
            const response = await axios.get('http://localhost:3000/festivals');
            setFestivals(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Erreur lors de la récupération des festivals:', error);
            setLoading(false);
          }
        };
      
        const fetchFestivalsInscrits = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/inscriptions/benevole/${userId}`);
            setFestivalsInscrits(response.data.map(item => item.festivalYear));
            console.log('Festivals inscrits:', response.data.map(item => item.festivalYear));
          } catch (error) {
            console.error('Erreur lors de la récupération des festivals inscrits:', error);
          }
        };
      
        fetchFestivals();
        fetchFestivalsInscrits();
      }, [userId]);

      const handleInscription = async (festivalYearID) => {
        try {
          // Récupérer les festivals auxquels l'utilisateur est déjà inscrit
          const response = await axios.get(`http://localhost:3000/inscriptions/benevole/${userId}`);
          const updatedFestivalsInscrits = response.data.map(item => item.festivalYear);
          
          // Envoyer une requête pour inscrire l'utilisateur au festival
          console.log('Inscription au festival:', festivalYearID, 'userId:', userId);
      
          if (updatedFestivalsInscrits.includes(festivalYearID)) {
            const deleteResponse = await axios.delete(`http://localhost:3000/inscriptions/benevole/${userId}/festival/${festivalYearID}`, {});

            setFestivalsInscrits((prevFestivalsInscrits) => {
                return prevFestivalsInscrits.filter(year => year !== festivalYearID);
              });
          } else {
            const postResponse = await axios.post('http://localhost:3000/inscriptions', { 
              "benevoleId": userId,
              "festivalYear": festivalYearID 
            });

            // Mettre à jour l'état local avec les nouvelles données
          setFestivalsInscrits((prevFestivalsInscrits) => {
            return [...prevFestivalsInscrits, festivalYearID];
          });
          }
      
          // Mettre à jour l'état local avec les nouvelles données
          setFestivalsInscrits((prevFestivalsInscrits) => {
            return [...prevFestivalsInscrits, festivalYearID];
          });
      
          // Traiter la réponse de l'API si nécessaire
          console.log('Réponse de l\'API lors de l\'inscription/désinscription:', response.data);
        } catch (error) {
          console.error('Erreur lors de l\'inscription/désinscription au festival:', error);
          // Détails de l'erreur
          if (error.response) {
            console.error('Réponse détaillée du serveur:', error.response.data);
          } else if (error.request) {
            console.error('Aucune réponse du serveur reçue');
          } else {
            console.error('Erreur lors de la requête:', error.message);
          }
        }
      };
      

  return (
    <div className='div-festival'>
      <h2>Liste des Festivals</h2>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Année</th>
              <th>Postes</th>
              <th>Jours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {festivals.map((festival) => (
              <tr key={festival.year}>
                <td>{festival.year}</td>
                <td>{festival.postes.map((poste) => poste.nom).join(', ')}</td>
                <td>{festival.jours.map((jour) => jour.label).join(', ')}</td>
                <td>
                  <button onClick={() => handleInscription(festival.year)}>
                    {festivalsInscrits.includes(festival.year) ? 'Se désinscrire' : 'S\'inscrire'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FestivalPage;

/*[{  "year":2021,
    "postes":[  {"id":1,"nom":"Accueil","festivalYear":2021},
                {"id":2,"nom":"Animations jeux","festivalYear":2021}],
    "jours":[   {"id":1,"label":"Vendredi","numeroJour":1,"festivalYear":2021},
                {"id":2,"label":"Samedi","numeroJour":2,"festivalYear":2021}]},
{   "year":2022,
    "postes":[  {"id":3,"nom":"Accueil","festivalYear":2022},
                {"id":4,"nom":"Animations jeux","festivalYear":2022}],
    "jours":[   {"id":3,"label":"Vendredi","numeroJour":1,"festivalYear":2022},
                {"id":4,"label":"Samedi","numeroJour":2,"festivalYear":2022}]}]*/