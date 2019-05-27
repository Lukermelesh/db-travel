import { createAction } from 'redux-actions';
import axios from 'axios';
import { apiBaseUrl } from '../constants/env';

export const LOGIN_USER_REQUEST = 'loginUser/FETCH_REQUEST';
export const LOGIN_USER_SUCCESS = 'loginUser/FETCH_SUCCESS';
export const LOGIN_USER_FAILURE = 'loginUser/FETCH_FAILURE';

export const loginUserRequest = createAction(LOGIN_USER_REQUEST);
export const loginUserSuccess = createAction(LOGIN_USER_SUCCESS);
export const loginUserFailure = createAction(LOGIN_USER_FAILURE);

export const loginUser = (userName, password) => {
  return async dispatch => {
    dispatch(loginUserRequest());
    try {
      //TODO: create a wrapper for requests which includes the cookie!
      const result = await axios.post(`${apiBaseUrl}/login`, {
        userName,
        password
      });

      dispatch(loginUserSuccess(result.data));
    } catch {
      dispatch(loginUserFailure());
    }
  };
};
