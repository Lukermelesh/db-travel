import { createAction } from 'redux-actions';
import { post } from '../helpers/request-helpers';

export const CREATE_TRIP_REQUEST = 'createApartment/FETCH_REQUEST';
export const CREATE_TRIP_SUCCESS = 'createApartment/FETCH_SUCCESS';
export const CREATE_TRIP_FAILURE = 'createApartment/FETCH_FAILURE';

export const createTripRequest = createAction(CREATE_TRIP_REQUEST);
export const createTripSuccess = createAction(CREATE_TRIP_SUCCESS);
export const createTripFailure = createAction(CREATE_TRIP_FAILURE);

export const createApartment = apartmentData => {
  return async dispatch => {
    dispatch(createTripRequest());
    try {
      await post(`/apartment`, apartmentData);
      dispatch(createTripSuccess());
    } catch {
      dispatch(createTripFailure());
    }
  };
};
