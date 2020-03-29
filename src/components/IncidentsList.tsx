import React, { FunctionComponent, useEffect, useState } from 'react';

import api from '../services/api';
import IncidentType from '../types/incident';
import Incident from './Incident';

interface IncidentsListProps{
  ngoId: string | null;
};

const IncidentsList: FunctionComponent<IncidentsListProps> = (props) => {

  const [incidents, setIncidents] = useState<IncidentType[]>([]);

  useEffect(() =>{
    api.get<IncidentType[]>('profile', {
      headers: {
        Authorization: props.ngoId
      }
    })
    .then(response => {
      setIncidents(response.data);
    })
  }, [props.ngoId]);

  function handleDeleteIncident(id: number) {
    api.delete(`incidents/${id}`, {
      headers: {
        Authorization: props.ngoId
      }
    })
    .then(() => {
      setIncidents(incidents.filter(incident => incident.id !== id));
    })
    .catch(() => {
      alert('Erro ao deletar caso, tente novamente.');
    });
  }

  const incidentsList = incidents.map(incident => (
    <Incident incident={incident} handleDeleteIncident={handleDeleteIncident} />
  ));


  return(
    <ul>
      {incidentsList}
    </ul>
  );
};

export default IncidentsList;