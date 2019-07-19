import { createAction } from 'redux-actions';
import { post } from '../helpers/request-helpers';

export const CREATE_USER_REQUEST = 'createUser/FETCH_REQUEST';
export const CREATE_USER_SUCCESS = 'createUser/FETCH_SUCCESS';
export const CREATE_USER_FAILURE = 'createUser/FETCH_FAILURE';

export const createUserRequest = createAction(CREATE_USER_REQUEST);
export const createUserSuccess = createAction(CREATE_USER_SUCCESS);
export const createUserFailure = createAction(CREATE_USER_FAILURE);

const REGULAR = 0;
const ORGANIZER = 1;

export const createUser = (email, isOrganizer) => {
  return async dispatch => {
    dispatch(createUserRequest());
    await post(`/auth/createUser`, {
      email,
      type: isOrganizer ? ORGANIZER : REGULAR
    });
    dispatch(createUserSuccess());
  };
};
