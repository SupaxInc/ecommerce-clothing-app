import { UserActionTypes } from "./user.types";

// This action will contain one parameter which could be the authenticated user
export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});