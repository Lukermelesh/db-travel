import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';
import { APPROVED } from '../constants/trip-status';
import { getUserId } from '../selectors/user-data';

export const APPROVE_TRIP_REQUEST = 'approveTrip/FETCH_REQUEST';
export const APPROVE_TRIP_SUCCESS = 'approveTrip/FETCH_SUCCESS';
export const APPROVE_TRIP_FAILURE = 'approveTrip/FETCH_FAILURE';

export const approveTripRequest = createAction(APPROVE_TRIP_REQUEST);
export const approveTripSuccess = createAction(APPROVE_TRIP_SUCCESS);
export const approveTripFailure = createAction(APPROVE_TRIP_FAILURE);

export const approveTrip = tripId => {
  return async (dispatch, getState) => {
    dispatch(approveTripRequest());
    try {
      //TODO: create a wrapper for requests which includes the cookie!
      const state = getState();
      const userId = getUserId(state);
      await axios.post(`${apiBaseUrl}/trip/${tripId}`, {
        action: APPROVED,
        userId
      });
      dispatch(approveTripSuccess({ tripId, userId }));
    } catch {
      dispatch(approveTripFailure());
    }
  };
};
