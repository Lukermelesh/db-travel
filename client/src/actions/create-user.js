import { createAction } from 'redux-actions';
import { post } from '../helpers/request-helpers';

export const CREATE_USER_REQUEST = 'createUser/FETCH_REQUEST';
export const CREATE_USER_SUCCESS = 'createUser/FETCH_SUCCESS';
export const CREATE_USER_FAILURE = 'createUser/FETCH_FAILURE';

export const createUserRequest = createAction(CREATE_USER_REQUEST);
export const createUserSuccess = createAction(CREATE_USER_SUCCESS);
export const createUserFailure = createAction(CREATE_USER_FAILURE);

export const createUser = email => {
  return async dispatch => {
    dispatch(createUserRequest());
    try {
      await post(`/auth/createUser`, { email });
      //TODO: SHOW SUCCESS MESSAGE
      dispatch(createUserSuccess());
    } catch {
      dispatch(createUserFailure());
    }
  };
};
