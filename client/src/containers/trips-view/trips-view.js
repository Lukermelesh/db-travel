import React, {useEffect, useState} from 'react';
import {getTrips} from '../../helpers/data-fetchers';
import {TripCard} from '../../components/trip-card';

const TripsView = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //TODO: don't hardcode userId!
      const result = await getTrips('1');

      setTrips(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {trips.map(trip => <TripCard key={trip.id} trip={trip}/>)}
    </div>
  );
};

export default TripsView;