import React, { FunctionComponent, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css'

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

const Logon: FunctionComponent = (props) => {

  const[id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('session', { id });

      localStorage.setItem('ngoId', id);
      localStorage.setItem('ngoName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('ID Inválido.');
    }
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

export default Logon;
