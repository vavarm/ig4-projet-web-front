import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import.meta.env.VITE_BACKEND_URL

const Profil = () => {
  const axiosConfig = useAuth().axiosConfig

  // Accéder aux données de l'utilisateur depuis le contexte d'authentification
  const { login, user } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [hebergement, setHebergement] = useState('')
  const [adressePostale, setAdressePostale] = useState('')
  const [codePostal, setCodePostal] = useState('')
  const [ville, setVille] = useState('')
  const [taille_tshirt, setTaille_tshirt] = useState('')
  const [vegetarien, setVegetarien] = useState('')
  const [associations, setAssociations] = useState('')

  useEffect(() => {
    console.log('user:', user)
    if (!user) return
    setEmail(user.email)
    setNom(user.nom)
    setPrenom(user.prenom)
    setTelephone(user.telephone)
    setHebergement(user.hebergement)
    setAdressePostale(user.adressePostale)
    setCodePostal(user.codePostal)
    setVille(user.ville)
    setTaille_tshirt(user.taille_tshirt)
    setVegetarien(user.vegetarien)
    setAssociations(user.associations)
  }, [user])

  const [isFormVisible, setIsFormVisible] = useState(false)

  const showForm = () => {
    setIsFormVisible(true)
  }

  const hideForm = () => {
    setIsFormVisible(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Soumission du formulaire')

    try {
      // Effectuer la requête PATCH pour mettre à jour les informations de l'utilisateur
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/benevoles/${user.id}`,
        {
          nom,
          prenom,
          adressePostale,
          codePostal,
          ville,
          telephone,
          taille_tshirt,
          vegetarien,
          hebergement,
        },
        axiosConfig
      )
      // Traiter la réponse de l'API
      console.log("Réponse de l'API:", response.data)
      login(response.data)
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error)
    }
    hideForm()
  }

  return (
    <div className='content'>
      <h2>Profil</h2>
      <button
        onClick={showForm}
        style={{ marginLeft: 'auto', display: 'block' }}
      >
        Modifier
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <label>
            Prenom:
            <input
              type='text'
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </label>
          <label>
            Nom:
            <input
              type='text'
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>
          <label>
            Ville:
            <input
              type='text'
              value={ville}
              onChange={(e) => setVille(e.target.value)}
            />
          </label>
          <label>
            Code postal:
            <input
              type='text'
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
            />
          </label>
          <label>
            Adresse postale:
            <input
              type='text'
              value={adressePostale}
              onChange={(e) => setAdressePostale(e.target.value)}
            />
          </label>
          <label>
            Telephone:
            <input
              type='tel'
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </label>
          <div className='div-tshirt'>
            <label>
              XS
              <input
                type='radio'
                value='XS'
                checked={taille_tshirt === 'XS'}
                onChange={() => setTaille_tshirt('XS')}
              />
            </label>
            <label>
              S
              <input
                type='radio'
                value='S'
                checked={taille_tshirt === 'S'}
                onChange={() => setTaille_tshirt('S')}
              />
            </label>
            <label>
              M
              <input
                type='radio'
                value='M'
                checked={taille_tshirt === 'M'}
                onChange={() => setTaille_tshirt('M')}
              />
            </label>
            <label>
              L
              <input
                type='radio'
                value='L'
                checked={taille_tshirt === 'L'}
                onChange={() => setTaille_tshirt('L')}
              />
            </label>
            <label>
              XL
              <input
                type='radio'
                value='XL'
                checked={taille_tshirt === 'XL'}
                onChange={() => setTaille_tshirt('XL')}
              />
            </label>
            <label>
              XXL
              <input
                type='radio'
                value='XXL'
                checked={taille_tshirt === 'XXL'}
                onChange={() => setTaille_tshirt('XXL')}
              />
            </label>
          </div>
          <label>
            Végétarien:
            <input
              type='checkbox'
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
              <option value='AUCUN'>Je n'ai pas besoin d'hebergement</option>
              <option value='RECHERCHE'>J'ai besoin d'un hebergement</option>
              <option value='PROPOSE'>Je peux herberger</option>
            </select>
          </label>
          {/* Bouton de soumission du formulaire */}
          <button type='submit'>Soumettre</button>

          {/* Bouton pour cacher le formulaire sans le soumettre */}
          <button type='button' onClick={hideForm}>
            Annuler
          </button>
        </form>
      )}
      <p>
        <strong>Nom:</strong> {nom}
      </p>
      <p>
        <strong>Prénom:</strong> {prenom}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Adresse:</strong> {adressePostale}, {codePostal} {ville}
      </p>
      <p>
        <strong>Téléphone:</strong> {telephone}
      </p>
      <p>
        <strong>Taille de T-shirt:</strong> {taille_tshirt}
      </p>
      <p>
        <strong>Végétarien:</strong> {vegetarien ? 'Oui' : 'Non'}
      </p>
      <p>
        <strong>Hébergement:</strong> {hebergement}
      </p>
      <p>
        <strong>Associations:</strong> {associations}
      </p>
    </div>
  )
}

export default Profil
