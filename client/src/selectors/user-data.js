const getUserData = state => state.userData;

//TODO: remove userId, we won't be needing it
export const getUserId = state => getUserData(state).userId;
export const getUserType = state => getUserData(state).type;
export const isLoggedIn = state => getUserData(state).isLoggedIn;