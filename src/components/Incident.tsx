import React, { FunctionComponent } from 'react';
import IncidentType from '../types/incident';
import { FiTrash2 } from 'react-icons/fi';

interface IncidentProps{
  incident: IncidentType;
  handleDeleteIncident: Function;
};

const Incident: FunctionComponent<IncidentProps> = (props) => {
  return(
    <li key={String(props.incident.id)} >
      <strong>CASO:</strong>
      <p>{props.incident.title}</p>

      <strong>DESCRIÇÃO:</strong>
      <p>{props.incident.description}</p>

      <strong>VALOR:</strong>
      <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.incident.value)}</p>

      <button
        onClick={() => props.handleDeleteIncident(props.incident.id)}
        type="button">
        <FiTrash2 size={20} color="#a8a8b3" />
      </button>
    </li>
  );
};

export default Incident;