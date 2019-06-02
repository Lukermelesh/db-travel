import { LOGIN_USER_SUCCESS } from '../actions/login-user';
import { LOGOUT_USER_SUCCESS } from '../actions/logout-user';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        token: undefined,
        userType: undefined,
        isLoggedIn: false
      };
    case LOGIN_USER_SUCCESS:
      const { token, type } = action.payload;
      return {
        ...state,
        token,
        userType: type,
        isLoggedIn: true
      };
    default:
      return state;
  }
};
