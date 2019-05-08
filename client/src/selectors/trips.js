import { getUserId } from './user-data';

export const getOwnTrips = state => {
  const currentUserId = getUserId(state);
  return state.trips.filter(trip => trip.travellers.find(traveller => traveller.id === currentUserId));
};
