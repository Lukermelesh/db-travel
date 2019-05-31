import { getUserId } from './user-data';

export const getOwnTrips = state => {
  const currentUserId = getUserId(state);
  return state.trips.filter(trip => trip.travellers.find(traveller => traveller.id === currentUserId));
};

export const getTripById = (state, id) => state.trips.find(trip => trip.id === id);