import { createAction } from 'redux-actions';
import { post } from '../helpers/request-helpers';

export const CREATE_TRIP_REQUEST = 'createTrip/FETCH_REQUEST';
export const CREATE_TRIP_SUCCESS = 'createTrip/FETCH_SUCCESS';
export const CREATE_TRIP_FAILURE = 'createTrip/FETCH_FAILURE';

export const createTripRequest = createAction(CREATE_TRIP_REQUEST);
export const createTripSuccess = createAction(CREATE_TRIP_SUCCESS);
export const createTripFailure = createAction(CREATE_TRIP_FAILURE);

export const createTrip = (tripData, travellerDetails) => {
  return async (dispatch) => {
    dispatch(createTripRequest());
    try {
      //TODO: ADD TRAVELLER DETAILS
      const trip = await post(`/trip`, tripData);
      // await post(`/ticket`, {
      //   travellerDetails
      // });
      dispatch(createTripSuccess());
    } catch {
      dispatch(createTripFailure());
    }
  };
};
