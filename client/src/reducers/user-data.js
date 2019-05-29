//TODO: fix hard-coded userData! Implement real login!
import { LOGIN_USER_SUCCESS } from '../actions/login-user';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true
      };
    default:
      return state;
  }
};
