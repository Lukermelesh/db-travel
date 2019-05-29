import { createAction } from 'redux-actions';
import { getUserId } from '../selectors/user-data';
import { post } from '../helpers/request-helpers';

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
      const state = getState();
      await post(`/trips`, {
        userId: getUserId(state)
      });
      dispatch(createTripSuccess({ tripId }));
    } catch {
      dispatch(createTripFailure());
    }
  };
};
