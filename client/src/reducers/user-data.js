import { LOGIN_USER_SUCCESS } from '../actions/login-user';
import { LOGOUT_USER_SUCCESS } from '../actions/logout-user';
import { requestConfig } from '../helpers/request-helpers';

const getDefaultState = () => {
  let sessionData;
  try {
    sessionData = JSON.parse(localStorage.getItem('session'));
  } catch {
    localStorage.setItem('session', '');
  }
  if (!sessionData) {
    return {};
  }
  if (sessionData.token) {
    requestConfig.token = sessionData.token;
  }
  return {
    isLoggedIn: !!sessionData.token,
    userType: sessionData.type
  };
};

export default (state = getDefaultState(), action) => {
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
