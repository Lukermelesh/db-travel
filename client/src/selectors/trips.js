export const getOwnTrips = state => state.trips.ownTrips;
export const getAllTrips = state => state.trips.all;

export const getTripById = (state, id) => {
  const findTripFunc = trip => trip.id === id;
  return (
    getAllTrips(state).find(findTripFunc) ||
    getOwnTrips(state).find(findTripFunc)
  );
};
