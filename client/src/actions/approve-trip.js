import { createAction } from 'redux-actions';
import { APPROVED } from '../constants/trip-status';
import { getUserId } from '../selectors/user-data';
import { post } from '../helpers/request-helpers';

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
      const state = getState();
      const userId = getUserId(state);
      await post(`/trip/${tripId}`, {
        action: APPROVED,
        userId
      });
      dispatch(approveTripSuccess({ tripId, userId }));
    } catch {
      dispatch(approveTripFailure());
    }
  };
};
