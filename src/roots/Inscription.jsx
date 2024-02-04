import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../css/Inscription.css';
import.meta.env.VITE_BACKEND_URL;

const Inscription = () => {
  const [benevoles, setBenevoles] = useState([]);
  const [selectedBenevole, setSelectedBenevole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBenevoles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/benevoles`);
        const benevolesData = response.data;

        const nonValidatedBenevoles = benevolesData.filter(
          (benevole) => !benevole.compteValide
        );

        setBenevoles(nonValidatedBenevoles);
      } catch (error) {
        console.error('Erreur lors de la récupération des bénévoles:', error);
      }
    };

    fetchBenevoles();
  }, []);

  const handleBenevoleClick = (benevole) => {
    console.log('handleBenevoleClick', benevole);
    setSelectedBenevole(benevole);
    setModalOpen(true);
  };

  const handleApprove = async (benevole) => {
    console.log('Approuver le bénévole:', benevole, 'ID :', benevole.id); 
    // Envoyer une requête pour approuver le bénévole (mettre à jour compteValide à true)
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/benevoles/admin/${benevole.id}`, {
            compteValide: true
            
        });
    
        console.log('Réponse de l\'API:', response.data);
    
        // Mettre à jour l'état local avec les nouvelles données
        setBenevoles((prevBenevoles) => prevBenevoles.filter((item) => item.id !== benevole.id));
      } catch (error) {
        console.error('Erreur lors de la validation du bénévole:', error);
      }
    
    };
  

    const handleReject = async (benevole) => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/benevoles/${benevole.id}`, {});
      
          console.log('Réponse de l\'API:', response.data, "");
      
          // Mettre à jour l'état local en filtrant le bénévole rejeté
          setBenevoles((prevBenevoles) => prevBenevoles.filter((item) => item.id !== benevole.id));
        } catch (error) {
          console.error('Erreur lors de la suppression du bénévole:', error);
        }
      
        
      };

  const handleCloseModal = () => {
    //setModalOpen(false);
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Si le clic n'est pas à l'intérieur de la modal-content, fermez la modal
      if (modalOpen && document.querySelector('.modal-content').contains(event.target)) {
        console.log('Clic en dehors de la modal');
        handleCloseModal();
        setModalOpen(false);
      }
    };

    console.log('selectedBenevole:', selectedBenevole);
    console.log('fermeture - ModalOpen :', modalOpen);

    // Ajoutez un écouteur d'événements au niveau du document pour détecter les clics
    document.addEventListener('click', handleOutsideClick);

    // Nettoyez l'écouteur d'événements lorsque le composant est démonté
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedBenevole, modalOpen]);

  return (
    <div className='content'>
      <h2>Liste des Bénévoles en attente de validation</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {benevoles.map((benevole) => (
            <tr key={benevole.id}>
              <td onClick={() => handleBenevoleClick(benevole)}>{benevole.nom}</td>
              <td>
                <button onClick={() => handleApprove(benevole)}>Approuver</button>
                <button onClick={() => handleReject(benevole)}>Rejeter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal pour afficher les informations détaillées du bénévole */}
      {modalOpen && (
        <div className="modal-container" >
          <div className="modal-content">
            {selectedBenevole && (
              <div>
                <h2>{selectedBenevole.nom} {selectedBenevole.prenom}</h2>
                
                <p>Email: {selectedBenevole.email}</p>
                <p>Adresse: {selectedBenevole.ville}, {selectedBenevole.codePostal} <br /> {selectedBenevole.adressePostale}</p>
                <p>Téléphone: {selectedBenevole.telephone}</p>
                <p>Hébergement: {selectedBenevole.hebergement}</p>
                <p>végétarien: {selectedBenevole.vegetarien ? 'Oui' : 'Non'}</p> 
                <p>taille T-shirt: {selectedBenevole.taille_tshirt} </p>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscription;
