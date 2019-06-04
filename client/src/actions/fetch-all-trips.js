import { createAction } from 'redux-actions';
import { get } from '../helpers/request-helpers';

export const FETCH_ALL_TRIPS_REQUEST = 'allTrips/FETCH_REQUEST';
export const FETCH_ALL_TRIPS_SUCCESS = 'allTrips/FETCH_SUCCESS';
export const FETCH_ALL_TRIPS_FAILURE = 'allTrips/FETCH_FAILURE';

export const fetchAllTripsRequest = createAction(FETCH_ALL_TRIPS_REQUEST);
export const fetchAllTripsSuccess = createAction(FETCH_ALL_TRIPS_SUCCESS);
export const fetchAllTripsFailure = createAction(FETCH_ALL_TRIPS_FAILURE);

export const fetchAllTrips = () => {
  return async dispatch => {
    dispatch(fetchAllTripsRequest());
    try {
      const trips = await get(`/trip/allUserTrips`);
      dispatch(fetchAllTripsSuccess(trips.data));
    } catch {
      dispatch(fetchAllTripsFailure());
    }
  };
};
