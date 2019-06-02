import { createAction } from 'redux-actions';
import { requestConfig } from '../helpers/request-helpers';

export const LOGOUT_USER_REQUEST = 'logoutUser/FETCH_REQUEST';
export const LOGOUT_USER_SUCCESS = 'logoutUser/FETCH_SUCCESS';
export const LOGOUT_USER_FAILURE = 'logoutUser/FETCH_FAILURE';

export const logoutUserRequest = createAction(LOGOUT_USER_REQUEST);
export const logoutUserSuccess = createAction(LOGOUT_USER_SUCCESS);
export const logoutUserFailure = createAction(LOGOUT_USER_FAILURE);

export const logoutUser = () => async dispatch => {
  requestConfig.token = null;
  document.cookie = '';
  dispatch(logoutUserSuccess());
};
