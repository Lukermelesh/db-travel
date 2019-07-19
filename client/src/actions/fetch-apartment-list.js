import { createAction } from 'redux-actions';
import { get } from '../helpers/request-helpers';

export const FETCH_APARTMENT_LIST_REQUEST = 'apartmentList/FETCH_REQUEST';
export const FETCH_APARTMENT_LIST_SUCCESS = 'apartmentList/FETCH_SUCCESS';
export const FETCH_APARTMENT_LIST_FAILURE = 'apartmentList/FETCH_FAILURE';

export const fetchApartmentListRequest = createAction(
  FETCH_APARTMENT_LIST_REQUEST
);
export const fetchApartmentListSuccess = createAction(
  FETCH_APARTMENT_LIST_SUCCESS
);
export const fetchApartmentListFailure = createAction(
  FETCH_APARTMENT_LIST_FAILURE
);

export const fetchApartmentList = () => {
  return async dispatch => {
    dispatch(fetchApartmentListRequest());
    try {
      const apartments = await get('/apartment/getRooms');
      console.log('APARTM', apartments)
      dispatch(fetchApartmentListSuccess(apartments.data));
      return apartments.data;
    } catch {
      dispatch(fetchApartmentListFailure());
    }
  };
};
