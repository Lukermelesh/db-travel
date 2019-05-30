import { createAction } from 'redux-actions';
import { REJECTED } from '../constants/trip-status';
import { getUserId } from '../selectors/user-data';
import { post } from '../helpers/request-helpers';

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
      const state = getState();
      const userId = getUserId(state);
      await post(`/trip/${tripId}`, {
        action: REJECTED,
        userId
      });
      dispatch(rejectTripSuccess({ tripId, userId }));
    } catch {
      dispatch(rejectTripFailure());
    }
  };
};
