import { createAction } from 'redux-actions';
import { post } from '../helpers/request-helpers';

export const MERGE_TRIPS_REQUEST = 'mergeTrips/FETCH_REQUEST';
export const MERGE_TRIPS_SUCCESS = 'mergeTrips/FETCH_SUCCESS';
export const MERGE_TRIPS_FAILURE = 'mergeTrips/FETCH_FAILURE';

export const mergeTripsRequest = createAction(MERGE_TRIPS_REQUEST);
export const mergeTripsSuccess = createAction(MERGE_TRIPS_SUCCESS);
export const mergeTripsFailure = createAction(MERGE_TRIPS_FAILURE);

export const mergeTrips = ids => {
  return async dispatch => {
    dispatch(mergeTripsRequest());
    try {
      await post(`/trip/joinTrips`, {
        ids
      });
      dispatch(mergeTripsSuccess());
    } catch {
      dispatch(mergeTripsFailure());
    }
  };
};
