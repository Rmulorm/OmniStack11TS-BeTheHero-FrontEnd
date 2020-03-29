import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './styles.css'

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

interface Session {
  name: string;
}

export default function Logon() {

  const[id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    await api.post<Session>('session', { id })
    .then((response) => {
      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    })
    .catch(() => {
      alert('ID Inválido.');
    });
  }

  return(
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin} >
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não Tenho Cadastro
          </Link>

        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
