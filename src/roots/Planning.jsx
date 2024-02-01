import React, { useState, useEffect, useCallback} from 'react';
import { Container, Button, Progress, Text, RingProgress, Tabs, rem } from '@mantine/core';
import '../css/Planning.css'; 

const Planning = () => {
  const [selectedDay, setSelectedDay] = useState('samedi');
  const [selectedCells, setSelectedCells] = useState([]);

  const handleDaySwitch = (day) => {
    setSelectedDay(day);
  };

  const tablePostes = ['Accueil', 'Animation jeux', 'Vente restauration', 'Cuisine', 'Tombola', 'Forum']
  const creneaux = ['9h-11h', '11h-14h', '14h-17h', '17h-20h', '20h-22h']
  const benevolesData = [
    { poste: 'Accueil', horaires: '9h-11h', jour: 'samedi', nombre: 3 },
    { poste: 'Accueil', horaires: '11h-14h', jour: 'samedi', nombre: 2 },
    { poste: 'Accueil', horaires: '14h-17h', jour: 'samedi', nombre: 1 },
    { poste: 'Accueil', horaires: '17h-20h', jour: 'samedi', nombre: 2 },
    { poste: 'Accueil', horaires: '20h-22h', jour: 'samedi', nombre: 3 },
    { poste: 'Animation jeux', horaires: '9h-11h', jour: 'samedi', nombre: 1 },
    { poste: 'Animation jeux', horaires: '11h-14h', jour: 'samedi', nombre: 2 },
    { poste: 'Animation jeux', horaires: '14h-17h', jour: 'samedi', nombre: 3 },
    { poste: 'Animation jeux', horaires: '17h-20h', jour: 'samedi', nombre: 2 },
    { poste: 'Animation jeux', horaires: '20h-22h', jour: 'samedi', nombre: 1 },
    { poste: 'Vente restauration', horaires: '9h-11h', jour: 'samedi', nombre: 2 },
    { poste: 'Vente restauration', horaires: '11h-14h', jour: 'samedi', nombre: 3 },
    { poste: 'Vente restauration', horaires: '14h-17h', jour: 'samedi', nombre: 2 },
    { poste: 'Vente restauration', horaires: '17h-20h', jour: 'samedi', nombre: 1 },
    { poste: 'Vente restauration', horaires: '20h-22h', jour: 'samedi', nombre: 2 },
    { poste: 'Cuisine', horaires: '9h-11h', jour: 'samedi', nombre: 2 },
    { poste: 'Cuisine', horaires: '11h-14h', jour: 'samedi', nombre: 1 },
    { poste: 'Cuisine', horaires: '14h-17h', jour: 'samedi', nombre: 2 },
    { poste: 'Cuisine', horaires: '17h-20h', jour: 'samedi', nombre: 3 },
    { poste: 'Cuisine', horaires: '20h-22h', jour: 'samedi', nombre: 2 },
    { poste: 'Tombola', horaires: '9h-11h', jour: 'samedi', nombre: 3 },
    { poste: 'Tombola', horaires: '11h-14h', jour: 'samedi', nombre: 2 },
    { poste: 'Tombola', horaires: '14h-17h', jour: 'samedi', nombre: 1 },
    { poste: 'Tombola', horaires: '17h-20h', jour: 'samedi', nombre: 2 },
    { poste: 'Tombola', horaires: '20h-22h', jour: 'samedi', nombre: 3 },
    { poste: 'Forum', horaires: '9h-11h', jour: 'samedi', nombre: 2 },
    { poste: 'Forum', horaires: '11h-14h', jour: 'samedi', nombre: 3 },
    { poste: 'Forum', horaires: '14h-17h', jour: 'samedi', nombre: 2 },
    { poste: 'Forum', horaires: '17h-20h', jour: 'samedi', nombre: 1 },
    { poste: 'Forum', horaires: '20h-22h', jour: 'samedi', nombre: 2 }
  ];  

  const getNombreBenevoles = (poste, horaires, jour) => {
    const benevolesInfo = benevolesData.find(
      (info) => info.poste === poste && info.horaires === horaires && info.jour === jour
    );
    return benevolesInfo ? benevolesInfo.nombre : 0;
  };

  const handleCellClick = useCallback((poste, horaire) => {
    setSelectedCells((prevSelectedCells) => {
      const cellKey = `${poste}-${horaire}`;
      if (prevSelectedCells.includes(cellKey)) {
        return prevSelectedCells.filter((key) => key !== cellKey);
      } else {
        return [...prevSelectedCells, cellKey];
      }
    });
  }, []);

  return (
    <Tabs className="table-container" variant="outline" defaultValue="consulter" >
      <Tabs.List>
        <Tabs.Tab value="consulter">Consulter</Tabs.Tab>
        <Tabs.Tab value="s'inscrire">s'inscrire</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="consulter">
        <Container className="planning-container">
          <Button color = "green"
            onClick={() => handleDaySwitch('samedi')}
            variant={selectedDay === 'samedi' ? 'primary' : 'outline'}
          >
            Samedi
          </Button>
          <Button color = "green"
            onClick={() => handleDaySwitch('dimanche')}
            variant={selectedDay === 'dimanche' ? 'primary' : 'outline'}
          >
            Dimanche
          </Button>

          <table className="Table">
            <thead>
              <tr>
                <th>Horaires</th>
                {tablePostes.map((poste, j) => (
                  <th key={j}>{poste}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(selectedDay === 'samedi' || selectedDay === 'dimanche') &&
                creneaux.map((horaire, i) => (
                  <tr key={i}>
                    {/* Colonne des horaires */}
                    <td>{horaire}</td>
                    {/* Colonnes des postes */}
                    {tablePostes.map((poste, j) => (
                      <td key={j}>
                        {/* Affichage du nombre de bénévoles dans la cellule */}
                          {getNombreBenevoles(poste, horaire, selectedDay)} / max
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </Container>
      </Tabs.Panel>

      <Tabs.Panel value="s'inscrire">
          <Container className="planning-container">
            <table className="Table">
              <thead>
                <tr>
                  <th>Horaires</th>
                  {tablePostes.map((poste, j) => (
                    <th key={j}>{poste}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(selectedDay === 'samedi' || selectedDay === 'dimanche') &&
                  creneaux.map((horaire, i) => (
                    <tr key={i}>
                      {/* Colonne des horaires */}
                      <td>{horaire}</td>
                      {/* Colonnes des postes */}
                      {tablePostes.map((poste, j) => (
                        <td
                          key={j}
                          onClick={() => handleCellClick(poste, horaire)}
                          className={selectedCells.includes(`${poste}-${horaire}`) ? 'selected' : ''}
                        >
                          {getNombreBenevoles(poste, horaire, selectedDay)} / max
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </Container>
        </Tabs.Panel>
    </Tabs>
  );
};

export default Planning;
