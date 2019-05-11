import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const FETCH_APARTMENT_LIST_REQUEST = 'apartmentList/FETCH_REQUEST';
export const FETCH_APARTMENT_LIST_SUCCESS = 'apartmentList/FETCH_SUCCESS';
export const FETCH_APARTMENT_LIST_FAILURE = 'apartmentList/FETCH_FAILURE';

export const fetchApartmentListRequest = createAction(FETCH_APARTMENT_LIST_REQUEST);
export const fetchApartmentListSuccess = createAction(FETCH_APARTMENT_LIST_SUCCESS);
export const fetchApartmentListFailure = createAction(FETCH_APARTMENT_LIST_FAILURE);

export const fetchApartmentList = locationId => {
  return async dispatch => {
    dispatch(fetchApartmentListRequest());
    try {
      //TODO: create a wrapper for requests which includes the cookie!
      const apartments = await axios.get(`${apiBaseUrl}/apartments/${locationId}`);
      dispatch(fetchApartmentListSuccess(apartments.data));
      return apartments.data;
    } catch {
      dispatch(fetchApartmentListFailure());
    }
  };
};
