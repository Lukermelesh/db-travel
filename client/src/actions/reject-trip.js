import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';
import { REJECTED } from '../constants/trip-status';
import { getUserId } from '../selectors/user-data';

export const REJECT_TRIP_REQUEST = 'rejectTrip/FETCH_REQUEST';
export const REJECT_TRIP_SUCCESS = 'rejectTrip/FETCH_SUCCESS';
export const REJECT_TRIP_FAILURE = 'rejectTrip/FETCH_FAILURE';

export const rejectTripRequest = createAction(REJECT_TRIP_REQUEST);
export const rejectTripSuccess = createAction(REJECT_TRIP_SUCCESS);
export const rejectTripFailure = createAction(REJECT_TRIP_FAILURE);

export const rejectTrip = tripId => {
  return async (dispatch, getState) => {
    dispatch(rejectTripRequest());
    try {
      //TODO: create a wrapper for requests which includes the cookie!
      const state = getState();
      await axios.post(`${apiBaseUrl}/trip/${tripId}`, {
        action: REJECTED,
        userId: getUserId(state)
      });
      dispatch(rejectTripSuccess({ tripId }));
    } catch {
      dispatch(rejectTripFailure());
    }
  };
};
