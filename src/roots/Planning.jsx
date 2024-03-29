import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Button,
  Progress,
  Text,
  RingProgress,
  Tabs,
  rem,
} from '@mantine/core'
import { Fragment } from 'react'
import '../css/Planning.css'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

import.meta.env.VITE_BACKEND_URL

const Planning = () => {
  const axiosConfig = useAuth().axiosConfig

  const { login, user } = useAuth()

  const [selectedDay, setSelectedDay] = useState('')
  const [selectedCells, setSelectedCells] = useState([])
  const [jours, setJours] = useState([])
  const [postes, setPostes] = useState([])
  const [horaires, setHoraires] = useState([])
  const [inscriptions, setInscriptions] = useState([])

  const handleDaySwitch = (day) => {
    setSelectedDay(day)
    console.log('jour selectionné:', selectedDay)
  }

  const setUp = async () => {
    await getDay(2021)
    await getPoste(2021)
    await getHoraire(2021)
    await getInscriptions(2021)
  }

  useEffect(() => {
    setUp()
  }, [])

  const getInscriptions = async (yearFestival) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/plannings-espaces`,
        axiosConfig
      )
      const inscriptionsData = response.data

      // Structure de données pour stocker les informations sur les inscriptions
      const inscriptionsMap = {}

      inscriptionsData.forEach((inscription) => {
        const { espace, creneauHoraire, jourId, creneauHoraireId } = inscription
        const key = `${espace.nom}-${
          creneauHoraire.horaireDebutHeures +
          ':' +
          creneauHoraire.horaireDebutMinutes +
          '0-' +
          creneauHoraire.horaireFinHeures +
          ':' +
          creneauHoraire.horaireFinMinutes +
          '0'
        }-${creneauHoraire.jourId}`
        if (!inscriptionsMap[key]) {
          inscriptionsMap[key] = {
            inscrits: 0,
            maximum: espace.nbPlacesMax,
          }
        }
        inscriptionsMap[key].inscrits += 1
      })
      setInscriptions(inscriptionsMap)
      console.log(inscriptions)
    } catch (error) {
      console.error(error)
    }
  }

  const getDay = async (yearFestival) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jours/festival/${yearFestival}`,
        axiosConfig
      )
      const liste = response.data
      setJours(liste.map((jour) => jour.label))
      console.log(jours)
    } catch (error) {
      console.error(error)
    }
  }

  const getPoste = async (yearFestival) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/postes/festival/${yearFestival}`,
        axiosConfig
      )
      const liste = response.data
      // Transformez la liste des postes en une nouvelle liste avec les espaces associés
      const postesAvecEspaces = liste.map((poste) => {
        return {
          nom: poste.nom,
          espaces: poste.espaces.map((espace) => ({
            nom: espace.nom,
            id: espace.id,
          })),
        }
      })
      setPostes(postesAvecEspaces)
      console.log(postesAvecEspaces)
    } catch (error) {
      console.error(error)
    }
  }

  const getHoraire = async (yearFestival) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/creneaux-horaire/festival/${yearFestival}`,
        axiosConfig
      );
      const liste = response.data;
      console.log("resultat : ",response.data)
      // Modifier la liste pour inclure l'ID
      const horairesListe = liste.map((horaire) => {
        return {
          id: horaire.id,
          heureDebut: `${horaire.horaireDebutHeures}:${horaire.horaireDebutMinutes}0`,
          heureFin: `${horaire.horaireFinHeures}:${horaire.horaireFinMinutes}0`,
        };
      });
      setHoraires(horairesListe);
      console.log(horairesListe);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInscription = async (espace, horaire, jourId) => {
    console.log('Inscription de :', user.prenom, user.id, "à l'espace :", espace.id ,"au creneau :", horaire.id);
    
    try {
      // Effectuer une requête GET pour vérifier l'inscription existante du bénévole à cet espace
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/plannings-espaces/benevole/${user.id}/espace/${espace.id}`,
        axiosConfig
      );
      console.log(response.data);
  
      // Si le bénévole est déjà inscrit à cet espace, supprimer l'inscription
      if (response.data.length > 0 && response.data[0].id) {
        const existingInscriptionId = response.data[0].id;
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/plannings-espaces/${existingInscriptionId}`,
          axiosConfig
        );
        
        // Mise à jour de l'état des inscriptions pour refléter la suppression
        const key = `${espace.nom}-${horaire.heureDebut}-${horaire.heureFin}-${jourId}`;
        const updatedInscriptions = { ...inscriptions };
        if (updatedInscriptions[key]) {
          updatedInscriptions[key].inscrits -= 1;
          setInscriptions(updatedInscriptions);
        }
        
        console.log('Inscription supprimée');
      } else {
        // Si le bénévole n'est pas déjà inscrit à cet espace, ajouter une nouvelle inscription
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/plannings-espaces`,
          {
            espaceId: espace.id,
            benevoleId: user.id,
            creneauHoraireId: horaire.id,
          },
          axiosConfig
        );
  
        // Mise à jour de l'état des inscriptions pour refléter l'ajout
        const key = `${espace.nom}-${horaire.heureDebut}-${horaire.heureFin}-${jourId}`;
        const updatedInscriptions = { ...inscriptions };
        if (!updatedInscriptions[key]) {
          updatedInscriptions[key] = { inscrits: 0, maximum: espace.nbPlacesMax };
        }
        updatedInscriptions[key].inscrits += 1;
        setInscriptions(updatedInscriptions);
  
        console.log('Nouvelle inscription ajoutée');
      }
    } catch (error) {
      // Gérer les erreurs de manière appropriée
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
    <>
      <Tabs
        className='table-container'
        variant='outline'
        defaultValue='consulter'
      >
        <Tabs.List>
          <Tabs.Tab value='consulter'>Consulter</Tabs.Tab>
          <Tabs.Tab value="s'inscrire">s'inscrire</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='consulter'>
          <Container className='planning-container'>
            <Button color='green' onClick={() => handleDaySwitch(jours[0])}>
              {jours[0]}
            </Button>
            <Button color='green' onClick={() => handleDaySwitch(jours[1])}>
              {jours[1]}
            </Button>

            <table className='Table'>
              <thead>
                <tr>
                  <th></th>
                  {postes.map((poste) => (
                    <React.Fragment key={poste.nom}>
                      <th colSpan={poste.espaces.length}>{poste.nom}</th>
                    </React.Fragment>
                  ))}
                </tr>
                <tr>
                  <th>Horaires</th>
                  {postes.map((poste) =>
                    poste.espaces.map((espace, i) => <th key={i}>{espace.nom}</th>)
                  )}
                </tr>
              </thead>
                <tbody>
                  {jours.includes(selectedDay) &&
                    horaires.map((horaire, i) => (
                      <tr key={i}>
                        {/* Colonne des horaires */}
                        <td>{horaire.heureDebut}-{horaire.heureFin}</td>
                        {/* Colonnes des postes */}
                        {postes.map((poste) =>
                          poste.espaces.map((espace, j) => {
                            const key = `${espace.nom}-${horaire.heureDebut}-${horaire.heureFin}-${
                              jours.indexOf(selectedDay) + 1
                            }`
                            const inscription = inscriptions[key]
                            console.log(key)

                            return (
                              <td key={j}>
                                {inscription
                                  ? `${inscription.inscrits} / ${inscription.maximum}`
                                  : '-'}
                              </td>
                            )
                          })
                        )}
                      </tr>
                    ))}
                </tbody>
            </table>
          </Container>
        </Tabs.Panel>
        <Tabs.Panel value="s'inscrire">
          <Container className='planning-container'>
            <Button color='green' onClick={() => handleDaySwitch(jours[0])}>
              {jours[0]}
            </Button>
            <Button color='green' onClick={() => handleDaySwitch(jours[1])}>
              {jours[1]}
            </Button>

            <table className='Table'>
              <thead>
                <tr>
                  <th></th>
                  {postes.map((poste) => (
                    <React.Fragment key={poste.nom}>
                      <th colSpan={poste.espaces.length}>{poste.nom}</th>
                    </React.Fragment>
                  ))}
                </tr>
                <tr>
                  <th>Horaires</th>
                  {postes.map((poste) =>
                    poste.espaces.map((espace, i) => <th key={i}>{espace.nom}</th>)
                  )}
                </tr>
              </thead>
              <tbody>
                  {jours.includes(selectedDay) &&
                    horaires.map((horaire, i) => (
                      <tr key={i}>
                        {/* Colonne des horaires */}
                        <td>{horaire.heureDebut}-{horaire.heureFin}</td>
                        {/* Colonnes des postes */}
                        {postes.map((poste) =>
                          poste.espaces.map((espace, j) => {
                            const key = `${espace.nom}-${horaire.heureDebut}-${horaire.heureFin}-${
                              jours.indexOf(selectedDay) + 1
                            }`
                            const inscription = inscriptions[key]
                            console.log(key)

                            return (
                              <td key={j} onClick={() => handleInscription(espace, horaire, jours.indexOf(selectedDay) + 1)}>
                                {inscription
                                  ? `${inscription.inscrits} / ${inscription.maximum}`
                                  : '-'}
                              </td>
                            )
                          })
                        )}
                      </tr>
                    ))}
                </tbody>
            </table>
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default Planning
