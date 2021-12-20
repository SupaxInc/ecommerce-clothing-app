// This action will contain one parameter which could be the authenticated user
export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});