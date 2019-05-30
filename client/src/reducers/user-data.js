import { LOGIN_USER_SUCCESS } from '../actions/login-user';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      const { token, userType } = action.payload;
      return {
        ...state,
        token,
        userType,
        userId: action.payload.userId, //TODO: remove this line and all usages of userId!
        isLoggedIn: true
      };
    default:
      return state;
  }
};
