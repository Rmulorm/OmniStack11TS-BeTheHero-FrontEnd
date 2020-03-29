import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NewIncident () {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ngoId = localStorage.getItem('ngoId');

  const history = useHistory();

  function handleRegister(event: FormEvent) {
    event.preventDefault();

    const incidentData = {
      title,
      description,
      value
    };

    api.post('incidents', incidentData, {
      headers: {
        Authorization: ngoId
      }
    })
    .then(() => {
      history.push('/profile');
    })
    .catch(() => {
      alert('Erro ao cadastrar caso, tente novamente.');
    });
  }

  return(
    <div className="new-incident-container" >
      <div className="content" >
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleRegister} >
          <input
            placeholder="Título do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>
    </div>
  );
}