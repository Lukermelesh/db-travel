import { createAction } from 'redux-actions';
import { get } from '../helpers/request-helpers';

export const FETCH_LOCATION_LIST_REQUEST = 'locationList/FETCH_REQUEST';
export const FETCH_LOCATION_LIST_SUCCESS = 'locationList/FETCH_SUCCESS';
export const FETCH_LOCATION_LIST_FAILURE = 'locationList/FETCH_FAILURE';

export const fetchLocationListRequest = createAction(
  FETCH_LOCATION_LIST_REQUEST
);
export const fetchLocationListSuccess = createAction(
  FETCH_LOCATION_LIST_SUCCESS
);
export const fetchLocationListFailure = createAction(
  FETCH_LOCATION_LIST_FAILURE
);

export const fetchLocationList = () => {
  return async dispatch => {
    dispatch(fetchLocationListRequest());
    try {
      const locations = await get(`/location/all`);
      dispatch(fetchLocationListSuccess(locations.data));
      return locations.data;
    } catch {
      dispatch(fetchLocationListFailure());
    }
  };
};
