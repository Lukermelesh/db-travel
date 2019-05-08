import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';
import { CREATED } from '../constants/trip-status';
import { getUserId } from '../selectors/user-data';

export const CREATE_TRIP_REQUEST = 'createTrip/FETCH_REQUEST';
export const CREATE_TRIP_SUCCESS = 'createTrip/FETCH_SUCCESS';
export const CREATE_TRIP_FAILURE = 'createTrip/FETCH_FAILURE';

export const createTripRequest = createAction(CREATE_TRIP_REQUEST);
export const createTripSuccess = createAction(CREATE_TRIP_SUCCESS);
export const createTripFailure = createAction(CREATE_TRIP_FAILURE);

export const createTrip = tripId => {
  return async (dispatch, getState) => {
    dispatch(createTripRequest());
    try {
      //TODO: create a wrapper for requests which includes the cookie!
      const state = getState();
      await axios.post(`${apiBaseUrl}/trips`, {
        userId: getUserId(state)
      });
      dispatch(createTripSuccess({ tripId }));
    } catch {
      dispatch(createTripFailure());
    }
  };
};
