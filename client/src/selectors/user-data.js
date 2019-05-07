const getUserData = state => state.userData;

export const getUserId = state => getUserData(state).userId;
export const getUserType = state => getUserData(state).type;