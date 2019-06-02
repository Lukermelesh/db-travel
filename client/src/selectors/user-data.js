const getUserData = state => state.userData;

export const getUserType = state => getUserData(state).userType;
export const isLoggedIn = state => getUserData(state).isLoggedIn;