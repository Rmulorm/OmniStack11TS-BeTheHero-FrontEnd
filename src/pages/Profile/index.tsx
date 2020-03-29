import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';
import incident from '../../types/incident';

export default function Profile () {
  const ngoName = localStorage.getItem('ngoName');
  const ngoId = localStorage.getItem('ngoId');

  const history = useHistory();

  const [incidents, setIncidents] = useState<incident[]>([]);

  useEffect(() =>{
    api.get('profile', {
      headers: {
        Authorization: ngoId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ngoId]);

  async function handleDeleteIncident(id: number) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ngoId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout () {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container" >
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ngoName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}  type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={String(incident.id)} >
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  ); 
}