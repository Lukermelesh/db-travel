import { APPROVE_TRIP_SUCCESS } from '../actions/approve-trip';
import { FETCH_USER_TRIPS_SUCCESS } from '../actions/fetch-user-trips';
import { APPROVED, REJECTED } from '../constants/trip-status';
import { REJECT_TRIP_SUCCESS } from '../actions/reject-trip';
import { FETCH_ALL_TRIPS_SUCCESS } from '../actions/fetch-all-trips';

const updateTripStatus = (state, { tripId, userId }, status) => {
  return state.map(trip =>
    trip.id === tripId
      ? {
          ...trip,
          details: [
            ...trip.travelDetails.map(details =>
              details.userId === userId ? { ...details, status } : details
            )
          ]
        }
      : trip
  );
};

export default (state = { ownTrips: [], all: [] }, action) => {
  switch (action.type) {
    case APPROVE_TRIP_SUCCESS:
      return updateTripStatus(state, action.payload, APPROVED);
    case REJECT_TRIP_SUCCESS:
      return updateTripStatus(state, action.payload.tripId, REJECTED);
    case FETCH_USER_TRIPS_SUCCESS:
      return { ...state, ownTrips: action.payload };
    case FETCH_ALL_TRIPS_SUCCESS:
      return { ...state, all: action.payload };
    default:
      return state;
  }
};
