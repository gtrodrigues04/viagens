import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { MdFlightTakeoff } from 'react-icons/md';
import './style.css'
import { addReserveRequest } from '../../store/modules/reserve/actions';

export default function Home() {

  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);

  useEffect(() => {

    async function loadApi() {
      const response = await api.get('trips');
      setTrips(response.data);
    }
    loadApi();
  }, []);

  function handleAdd(id) {
    dispatch(addReserveRequest(id));
  }
 return (
   <div>
      <div className='box'>
        {trips.map(trip => (
          <li key={trip.id}>
            <img src={trip.image} alt={trip.title} />
            <strong>{trip.title}</strong>
            <span> Status: {trip.status ? 'Disponível' : 'Indisponúvel'}</span>
            
            <button type='button' onClick={() => handleAdd(trip.id)}>
              <div>
                <MdFlightTakeoff size={16}/>
              </div>
              <span>SOLICITAR RESERVA</span>
            </button>
          </li>
        ))}
      </div>
   </div>
 );
}