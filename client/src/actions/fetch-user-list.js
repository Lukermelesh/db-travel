import { createAction } from 'redux-actions';
import { get } from '../helpers/request-helpers';

export const FETCH_USER_LIST_REQUEST = 'userList/FETCH_REQUEST';
export const FETCH_USER_LIST_SUCCESS = 'userList/FETCH_SUCCESS';
export const FETCH_USER_LIST_FAILURE = 'userList/FETCH_FAILURE';

export const fetchUserListRequest = createAction(FETCH_USER_LIST_REQUEST);
export const fetchUserListSuccess = createAction(FETCH_USER_LIST_SUCCESS);
export const fetchUserListFailure = createAction(FETCH_USER_LIST_FAILURE);

export const fetchUserList = () => {
  return async dispatch => {
    dispatch(fetchUserListRequest());
    try {
      //TODO:[server] Do not suggest users if they are busy during the time of travel
      const users = await get(`/users`);
      dispatch(fetchUserListSuccess(users.data));
      return users.data;
    } catch {
      dispatch(fetchUserListFailure());
    }
  };
};
