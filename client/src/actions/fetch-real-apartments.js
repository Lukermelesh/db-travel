import { createAction } from 'redux-actions';
import { get } from '../helpers/request-helpers';

export const FETCH_REAL_APARTMENTS_REQUEST = 'realApartments/FETCH_REQUEST';
export const FETCH_REAL_APARTMENTS_SUCCESS = 'realApartments/FETCH_SUCCESS';
export const FETCH_REAL_APARTMENTS_FAILURE = 'realApartments/FETCH_FAILURE';

export const fetchRealApartmentsListRequest = createAction(
  FETCH_REAL_APARTMENTS_REQUEST
);
export const fetchRealApartmentsListSuccess = createAction(
  FETCH_REAL_APARTMENTS_SUCCESS
);
export const fetchRealApartmentsListFailure = createAction(
  FETCH_REAL_APARTMENTS_FAILURE
);

export const fetchRealApartmentsList = () => {
  return async dispatch => {
    dispatch(fetchRealApartmentsListRequest());
    try {
      const apartments = await get('/apartment/room');
      console.log('APARTM->Reral', apartments)
      dispatch(fetchRealApartmentsListSuccess(apartments.data));
      return apartments.data;
    } catch {
      dispatch(fetchRealApartmentsListFailure());
    }
  };
};
