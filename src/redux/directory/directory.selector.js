import { createSelector } from 'reselect';

// Select the directory state from our Store
export const selectDirectory = state => state.directory;

// Select the sections state from our directory reducer
export const selectDirectorySections = createSelector(
    [selectDirectory],
    (directory) => directory.sections
);