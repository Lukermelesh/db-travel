import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const FETCH_USER_TRIPS_REQUEST = 'userTrips/FETCH_REQUEST';
export const FETCH_USER_TRIPS_SUCCESS = 'userTrips/FETCH_SUCCESS';
export const FETCH_USER_TRIPS_FAILURE = 'userTrips/FETCH_FAILURE';

export const fetchUserTripsRequest = createAction(FETCH_USER_TRIPS_REQUEST);
export const fetchUserTripsSuccess = createAction(FETCH_USER_TRIPS_SUCCESS);
export const fetchUserTripsFailure = createAction(FETCH_USER_TRIPS_FAILURE);

export const fetchUserTrips = userId => {
  return async dispatch => {
    dispatch(fetchUserTripsRequest({ userId }));
    try {
      //TODO: fix the hard coded url!
      //TODO: create a wrapper for requests which includes the cookie!
      const trips = await axios.get(`${apiBaseUrl}/trips/${userId}`);
      dispatch(fetchUserTripsSuccess(trips.data));
    } catch {
      dispatch(fetchUserTripsFailure());
    }
  };
};
