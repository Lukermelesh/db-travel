import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const FETCH_LOCATION_LIST_REQUEST = 'locationList/FETCH_REQUEST';
export const FETCH_LOCATION_LIST_SUCCESS = 'locationList/FETCH_SUCCESS';
export const FETCH_LOCATION_LIST_FAILURE = 'locationList/FETCH_FAILURE';

export const fetchLocationListRequest = createAction(FETCH_LOCATION_LIST_REQUEST);
export const fetchLocationListSuccess = createAction(FETCH_LOCATION_LIST_SUCCESS);
export const fetchLocationListFailure = createAction(FETCH_LOCATION_LIST_FAILURE);

export const fetchLocationList = () => {
  return async dispatch => {
    dispatch(fetchLocationListRequest());
    try {
      //TODO: create a wrapper for requests which includes the cookie!
      const locations = await axios.get(`${apiBaseUrl}/location-list`);
      dispatch(fetchLocationListSuccess(locations.data));
      return locations.data;
    } catch {
      dispatch(fetchLocationListFailure());
    }
  };
};
