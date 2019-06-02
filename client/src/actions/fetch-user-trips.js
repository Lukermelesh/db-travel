import { createAction } from 'redux-actions';
import { get } from '../helpers/request-helpers';

export const FETCH_USER_TRIPS_REQUEST = 'userTrips/FETCH_REQUEST';
export const FETCH_USER_TRIPS_SUCCESS = 'userTrips/FETCH_SUCCESS';
export const FETCH_USER_TRIPS_FAILURE = 'userTrips/FETCH_FAILURE';

export const fetchUserTripsRequest = createAction(FETCH_USER_TRIPS_REQUEST);
export const fetchUserTripsSuccess = createAction(FETCH_USER_TRIPS_SUCCESS);
export const fetchUserTripsFailure = createAction(FETCH_USER_TRIPS_FAILURE);

export const fetchUserTrips = () => {
  return async dispatch => {
    dispatch(fetchUserTripsRequest());
    try {
      const trips = await get(`/trip/allUserTrips`);
      dispatch(fetchUserTripsSuccess(trips.data));
    } catch {
      dispatch(fetchUserTripsFailure());
    }
  };
};
