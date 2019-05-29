import { createAction } from 'redux-actions';
import { post, requestConfig } from '../helpers/request-helpers';

export const LOGIN_USER_REQUEST = 'loginUser/FETCH_REQUEST';
export const LOGIN_USER_SUCCESS = 'loginUser/FETCH_SUCCESS';
export const LOGIN_USER_FAILURE = 'loginUser/FETCH_FAILURE';

export const loginUserRequest = createAction(LOGIN_USER_REQUEST);
export const loginUserSuccess = createAction(LOGIN_USER_SUCCESS);
export const loginUserFailure = createAction(LOGIN_USER_FAILURE);

export const loginUser = (email, password) => {
  return async dispatch => {
    dispatch(loginUserRequest());
    try {
      const result = await post('/auth/login', {
        email,
        password
      });

      requestConfig.token = result.data;
      dispatch(loginUserSuccess(result.data));
    } catch {
      dispatch(loginUserFailure());
    }
  };
};
