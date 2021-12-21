import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

// The SHOP_DATA object property ID is a number but the URL parameter we want to match is a string.
// We nede to create this map object to allow us to map the string URL parameter to an ID
const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}

// Create a selector for the shop state in Store
export const selectShop = state => state.shop; 

// Create a selector for collections state inside shop state
export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections 
)

// Create a selector that returns the state of the object that contains the dynamic parameter. (hats, jackets, etc)
// Uses memoize helper function from lodash since 'collectionUrlParam' is a dynamic argument and the function will not be memoized using reselect
// Also uses function currying, turns multiple parameters into a single parameter
export const selectShopCollectionsId = memoize((collectionUrlParam) => {
    return createSelector(
        [selectShopCollections],
        collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    )
})