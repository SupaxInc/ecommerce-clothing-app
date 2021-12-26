import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

// Create a selector for the shop state in Store
export const selectShop = state => state.shop; 

// Create a selector for collections state inside shop state
export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections 
);

// Turning the collections object into an array
export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    // Get the keys of the collections object and put it in an array
    // Return a new array of each collection using the array of keys
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

// Create a selector that returns the state of the object that contains the dynamic parameter. (hats, jackets, etc)
// Uses memoize helper function from lodash since 'collectionUrlParam' is a dynamic argument and the function will not be memoized using reselect
// Uses function currying, turns multiple parameters into a single parameter
// Uses data normalization. Instead of looping through an entire array, I had to change shop.data.js to be an object instead of an array to find the item with a key.
export const selectShopCollectionsId = memoize((collectionUrlParam) => {
    return createSelector(
        [selectShopCollections],
        collections => collections ? collections[collectionUrlParam] : null
    )
});

// Creates a selector for the isFetching state from the shop reducer
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

// Create a selector that checks if the collections state is empty or not and returns a boolean value
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    // Returns a boolean value using the !! operator, helps with falsey values
    shop => !!shop.collections
)