import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

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
      //TODO: create a wrapper for requests which includes the cookie!
      const trips = await axios.get(`${apiBaseUrl}/trips`);
      dispatch(fetchAllTripsSuccess(trips.data));
    } catch {
      dispatch(fetchAllTripsFailure());
    }
  };
};
