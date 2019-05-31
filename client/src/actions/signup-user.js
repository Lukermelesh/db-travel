import { createAction } from 'redux-actions';
import { post, requestConfig } from '../helpers/request-helpers';

export const SIGNUP_USER_REQUEST = 'signupUser/FETCH_REQUEST';
export const SIGNUP_USER_SUCCESS = 'signupUser/FETCH_SUCCESS';
export const SIGNUP_USER_FAILURE = 'signupUser/FETCH_FAILURE';

export const signupUserRequest = createAction(SIGNUP_USER_REQUEST);
export const signupUserSuccess = createAction(SIGNUP_USER_SUCCESS);
export const signupUserFailure = createAction(SIGNUP_USER_FAILURE);

export const signupUser = (password, passwordConfirmation, token) => {
  return async dispatch => {
    dispatch(signupUserRequest());
    try {
      const result = await post('/auth/signup', {
        passwordConfirmation,
        password,
        token
      });

      requestConfig.token = result.data.token;
      dispatch(signupUserSuccess(result.data));
    } catch {
      dispatch(signupUserFailure());
    }
  };
};
