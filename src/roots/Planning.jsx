import React, { useState, useEffect, useCallback} from 'react';
import { Container, Button, Progress, Text, RingProgress, Tabs, rem } from '@mantine/core';
import { Fragment } from 'react';
import '../css/Planning.css'; 
import axios from 'axios';

import.meta.env.VITE_BACKEND_URL;

const Planning = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedCells, setSelectedCells] = useState([]);
  const [jours, setJours] = useState([]);
  const [postes, setPostes] = useState([]);
  const [horaires, setHoraires] = useState([]);
  const [inscriptions, setInscriptions] = useState([]);

  const handleDaySwitch = (day) => {
    setSelectedDay(day);
    console.log('jour selectionné:', selectedDay);
  };

  const setUp = async () => {
    await getDay(2021);
    await getPoste(2021);
    await getHoraire(2021);
    await getInscriptions(2021);
  };

  const getInscriptions = async (yearFestival) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plannings-espaces`);
      const inscriptionsData = response.data;

      // Structure de données pour stocker les informations sur les inscriptions
      const inscriptionsMap = {};

      inscriptionsData.forEach((inscription) => {
        const { espace, creneauHoraire, jourId } = inscription;
        const key = `${espace.nom}-${creneauHoraire.horaireDebutHeures + ':' + creneauHoraire.horaireDebutMinutes + '0 - ' + creneauHoraire.horaireFinHeures + ':' + creneauHoraire.horaireFinMinutes + '0'}-${creneauHoraire.jourId}`;
        if (!inscriptionsMap[key]) {
          inscriptionsMap[key] = {
            inscrits: 0,
            maximum: espace.nbPlacesMax,
          };
        }
        inscriptionsMap[key].inscrits += 1;
      });
      setInscriptions(inscriptionsMap);
      console.log(inscriptions);
    } catch (error) {
      console.error(error);
    }
  };

  const getDay = async (yearFestival) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jours/festival/${yearFestival}`);
      const liste = response.data;
      setJours(liste.map((jour) => jour.label));
      console.log(jours);
    } catch (error) {
      console.error(error);
    }
  };
  
  const getPoste = async (yearFestival) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/postes/festival/${yearFestival}`);
      const liste = response.data;
      // Transformez la liste des postes en une nouvelle liste avec les espaces associés
      const postesAvecEspaces = liste.map((poste) => {
        return {
          nom: poste.nom,
          espaces: poste.espaces.map((espace) => espace.nom),
        };
      });
      setPostes(postesAvecEspaces);
      console.log(postesAvecEspaces);
    } catch (error) {
      console.error(error);
    }
  };

 const getHoraire = async (yearFestival) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/creneaux-horaire/festival/${yearFestival}`);
    const liste = response.data;
    setHoraires([...new Set(liste.map((horaire) => horaire.horaireDebutHeures + ':' + horaire.horaireDebutMinutes + '0 - ' + horaire.horaireFinHeures + ':' + horaire.horaireFinMinutes + '0'))]);
    console.log(horaires);
  }catch(error){
    console.error(error);
  }
 }


  return (
    <><Button color="blue" onClick={() => setUp()}>Get</Button>
    <Tabs className="table-container" variant="outline" defaultValue="consulter">
      <Tabs.List>
        <Tabs.Tab value="consulter">Consulter</Tabs.Tab>
        <Tabs.Tab value="s'inscrire">s'inscrire</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="consulter">
        <Container className="planning-container">
          <Button color="green"
            onClick={() => handleDaySwitch(jours[0])}
          >
            {jours[0]}
          </Button>
          <Button color="green"
            onClick={() => handleDaySwitch(jours[1])}
          >
            {jours[1]}
          </Button>

          <table className="Table">
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
                poste.espaces.map((espace, i) => (
                  <th key={i}>{espace}</th>
                ))
              )}
            </tr>
            </thead>
            <tbody>
              {(jours.includes(selectedDay)) &&
                horaires.map((horaire, i) => (
                  <tr key={i}>
                    {/* Colonne des horaires */}
                    <td>{horaire}</td>
                    {/* Colonnes des postes */}
                    {postes.map((poste) =>
                      poste.espaces.map((espace, j) => {
                        const key = `${espace}-${horaire}-${jours.indexOf(selectedDay)+1}`;
                        const inscription = inscriptions[key];
                        console.log(key);

                        return (
                          <td key={j}>
                            {inscription ? `${inscription.inscrits} / ${inscription.maximum}` : '-'}
                          </td>
                        );
                      })
                    )}
                    
                  </tr>
                ))}
            </tbody>
          </table>
        </Container>
      </Tabs.Panel>

      
    </Tabs></>
  );
};

export default Planning;
