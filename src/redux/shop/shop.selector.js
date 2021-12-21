import { createSelector } from "reselect";

// Create a selector for the shop state in Store
export const selectShop = state => state.shop; 

// Create a selector for collections state inside shop state
export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections 
)