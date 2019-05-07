import { APPROVE_TRIP_SUCCESS } from '../actions/approve-trip';
import { FETCH_USER_TRIPS_SUCCESS } from '../actions/fetch-user-trips';
import { APPROVED, REJECTED } from '../constants/trip-status';
import { REJECT_TRIP_SUCCESS } from '../actions/reject-trip';

const updateTripStatus = (state, tripId, status) => {
  return state.map(trip =>
    trip.id === tripId
      ? {
          ...trip,
          details: {
            ...trip.details,
            status
          }
        }
      : trip
  );
};

export default (state = [], action) => {
  switch (action.type) {
    case APPROVE_TRIP_SUCCESS:
      return updateTripStatus(state, action.payload.tripId, APPROVED);
    case REJECT_TRIP_SUCCESS:
      return updateTripStatus(state, action.payload.tripId, REJECTED);
    case FETCH_USER_TRIPS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
