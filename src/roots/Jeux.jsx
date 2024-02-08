import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { usePapaParse } from 'react-papaparse'

const Jeux = () => {
  const axiosConfig = useAuth().axiosConfig
  const { readString } = usePapaParse()
  const [selectedFile, setSelectedFile] = useState(null)
  const [festivals, setFestivals] = useState([])
  const [selectedFestival, setSelectedFestival] = useState(null)
  const [espaces, setEspaces] = useState([])
  const [jeux, setJeux] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value)
  }

  const fetchFestivals = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/festivals`,
        axiosConfig
      )
      console.log('Festivals:', response.data)
      setFestivals(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des festivals:', error)
    }
  }

  const fetchAnimationsJeuxPosteByFestival = async (festivalId) => {
    // fetch all postes
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/postes/festival/${festivalId}`,
        axiosConfig
      )
      console.log('Postes:', response.data)
      // in postes, get a poste with nom 'Animations jeux'
      const animJeuxPoste = response.data.find((poste) => {
        return poste.nom === 'Animations jeux'
      })
      console.log('Animations jeux poste:', animJeuxPoste)
      return animJeuxPoste
    } catch (error) {
      console.error('Erreur lors de la récupération des postes:', error)
      return null
    }
  }

  const fetchEspacesByFestival = async (festivalId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/espaces/festival/${festivalId}`,
        axiosConfig
      )
      console.log('Espaces:', response.data)
      setEspaces(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des espaces:', error)
    }
  }

  const deleteAllEspacesJeux = async () => {
    // fetch all espaces from the selected festival
    try {
      const espaces = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/espaces/festival/${selectedFestival}`,
        axiosConfig
      )
      console.log('Espaces:', espaces.data)
      // get all espace-jeux
      const espacesJeux = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/espaces-jeux`,
        axiosConfig
      )
      console.log('Espaces-jeux:', espacesJeux.data)
      // filter espace-jeux by espace from the selected festival
      const espacesJeuxToDelete = espacesJeux.data.filter((espaceJeu) =>
        espaces.data.map((espace) => espace.id).includes(espaceJeu.espaceId)
      )
      console.log('Espaces-jeux to delete:', espacesJeuxToDelete)
      // delete espace-jeux
      for (const espaceJeu of espacesJeuxToDelete) {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/espaces-jeux/${espaceJeu.id}`,
          axiosConfig
        )
        console.log('Espace-jeu supprimé:', response.data)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des espaces-jeux:', error)
    }
  }

  const createEspaceJeu = async (espaceJeu) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/espaces-jeux`,
        espaceJeu,
        axiosConfig
      )
      console.log('Espace-jeu créé:', response.data)
    } catch (error) {
      console.error("Erreur lors de la création de l'espace-jeu:", error)
    }
  }

  const createEspace = async (espace) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/espaces`,
        espace,
        axiosConfig
      )
      console.log('Espace créé:', response.data)
      await fetchEspacesByFestival(selectedFestival)
      return response.data
    } catch (error) {
      console.error("Erreur lors de la création de l'espace:", error)
    }
  }

  const updateEspace = async (espace) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/espaces/${espace.id}`,
        espace,
        axiosConfig
      )
      console.log('Espace mis à jour:', response.data)
      await fetchEspacesByFestival(selectedFestival)
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'espace:", error)
    }
  }

  const deleteEspace = async (espaceId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/espaces/${espaceId}`,
        axiosConfig
      )
      console.log('Espace supprimé:', response.data)
      fetchEspacesByFestival(selectedFestival)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'espace:", error)
    }
  }

  const createJeu = async (jeu) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/jeux`,
        jeu,
        axiosConfig
      )
      console.log('Jeu créé:', response.data)
    } catch (error) {
      console.error('Erreur lors de la création du jeu:', error)
    }
  }

  const fetchJeux = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jeux`,
        axiosConfig
      )
      console.log('Jeux:', response.data)
      setJeux(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux:', error)
    }
  }

  const handleProcessCSV = async () => {
    setLoading(true)
    setError(null)
    fetchEspacesByFestival(selectedFestival)
    fetchAnimationsJeuxPosteByFestival(selectedFestival)
    const animationsJeuxPoste = await fetchAnimationsJeuxPosteByFestival(
      selectedFestival
    )
    if (!animationsJeuxPoste) {
      setError('Le poste "Animations jeux" n\'existe pas pour ce festival.')
      setLoading(false)
      return
    }
    readString(selectedFile, {
      header: true,
      encoding: 'ISO-8859-1',
      complete: async (results) => {
        console.log('Résultats:', results)
        // delete all espaces-jeux
        deleteAllEspacesJeux().then(async () => {
          // if espace from db doesn't exist in csv, delete it
          const espacesFromCSV = results.data.map((item) => item['Zone plan'])
          const espacesFromDB = espaces.map((item) => item.nom)
          espacesFromDB.forEach((espace) => {
            if (!espacesFromCSV.includes(espace)) {
              deleteEspace(espace.id)
            }
          })
          for (const jeu of results.data) {
            try {
              console.log('jeu', jeu)
              // if espace ('Zone plan' in the CSV) from csv doesn't exist, create it
              let espace
              if (!espacesFromDB.includes(jeu['Zone plan'])) {
                espace = await createEspace({
                  festivalId: selectedFestival,
                  nom: jeu['Zone plan'],
                  nbPlacesMax: 0,
                  posteId: animationsJeuxPoste.id,
                })
              }
              // else, update it by adding 1 to nbPlacesMax
              else {
                espace = espaces.find((item) => item.nom === jeu['Zone plan'])
                await updateEspace({
                  id: espace.id,
                  festivalId: selectedFestival,
                  nom: jeu['Zone plan'],
                  nbPlacesMax: espace.nbPlacesMax + 1,
                  posteId: animationsJeuxPoste.id,
                })
              }
              // create jeu
              await createJeu({
                idJeu: parseInt(jeu['idJeu']),
                nom: jeu['Nom du jeu'],
                auteur: jeu['Auteur'] || '',
                editeur: jeu['Editeur'] || '',
                nbJoueurs: jeu['nb joueurs'] || '',
                ageMin: jeu['âge min'] || '',
                duree: jeu['Durée'] || '',
                type: jeu['Type'] || '',
                notice: jeu['Notice'] || '',
                mecanismes: jeu['Mécanismes'] || '',
                themes: jeu['Thèmes'] || '',
                tags: jeu['Tags'] || '',
                description: jeu['Description'] || '',
                image: jeu['Image'] || '',
                logo: jeu['Logo'] || '',
                video: jeu['Vidéo'] || '',
              })
              console.log('Espace pour EspaceJeu:', espace)
              // create espace-jeu
              await createEspaceJeu({
                jeuId: parseInt(jeu['idJeu']),
                espaceId: espace.id,
                aAnimer: jeu['À animer'] || '',
                recu: jeu['Reçu'] || '',
              })
            } catch (error) {
              console.error('Erreur lors de la création du jeu:', error)
              setError("Erreur lors de la création d'un jeu:", error)
            }
          }
        })
      },
    })
    setLoading(false)
    fetchJeux()
  }

  useEffect(() => {
    fetchFestivals()
    fetchJeux()
  }, [])

  return (
    <div>
      <h2>Jeux</h2>
      <h3>Importer des jeux</h3>
      <p>
        Sélectionnez un fichier CSV contenant les jeux à importer dans le
        système. Puis sélectionner le festival pour lequel vous souhaitez créer
        automatiquement les espaces de jeux.
      </p>
      <input type='file' onChange={handleFileChange} accept='.csv' />
      <select onChange={handleFestivalChange} value={selectedFestival}>
        <option value=''>Sélectionnez un festival</option>
        {festivals.map((festival) => (
          <option key={festival.id} value={festival.id}>
            {festival.year}
          </option>
        ))}
      </select>
      <button
        onClick={handleProcessCSV}
        disabled={!selectedFile || !selectedFestival || loading}
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
      {error && <p>{error}</p>}
      <div>
        <h3>Liste des jeux</h3>
        {jeux.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Auteur</th>
                <th>Editeur</th>
                <th>nb joueurs</th>
                <th>âge min</th>
                <th>Durée</th>
                <th>Type</th>
                <th>Notice</th>
                <th>Mécanismes</th>
                <th>Thèmes</th>
                <th>Tags</th>
                <th>Description</th>
                <th>Image</th>
                <th>Logo</th>
                <th>Vidéo</th>
              </tr>
            </thead>
            <tbody>
              {jeux.map((jeu) => (
                <tr key={jeu.id}>
                  <td>{jeu.idJeu}</td>
                  <td>{jeu.nom}</td>
                  <td>{jeu.auteur}</td>
                  <td>{jeu.editeur}</td>
                  <td>{jeu.nbJoueurs}</td>
                  <td>{jeu.ageMin}</td>
                  <td>{jeu.duree}</td>
                  <td>{jeu.type}</td>
                  <td>{jeu.notice}</td>
                  <td>{jeu.mecanismes}</td>
                  <td>{jeu.themes}</td>
                  <td>{jeu.tags}</td>
                  <td>{jeu.description}</td>
                  <td>{jeu.image}</td>
                  <td>{jeu.logo}</td>
                  <td>{jeu.video}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun jeu à afficher</p>
        )}
      </div>
    </div>
  )
}

export default Jeux
