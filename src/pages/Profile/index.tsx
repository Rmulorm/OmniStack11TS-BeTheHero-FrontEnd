import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css'

import logoImg from '../../assets/logo.svg';
import IncidentsList from '../../components/IncidentsList';

export default function Profile () {

  const ngoName = localStorage.getItem('ngoName');
  const ngoId = localStorage.getItem('ngoId');

  const history = useHistory();

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

      <IncidentsList ngoId={ngoId} />
    </div>
  ); 
}