import { createSelector } from 'reselect';

// Create a selector function to grab the whole user state property from the Store
const selectUser = state => state.user;

// Create a selector function to grab the currentUser state
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser // Returns the currentUser state from the user state property
);



