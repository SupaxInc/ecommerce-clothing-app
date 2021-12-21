import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
    key: 'root',
    storage,
    // Currently, only peristing cart reducer and not user because user is being handled by Firebase
    whitelist: ['cart']
}

// combineReducers will return all of the state into one giant object
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

// Exports a modified version of root reducer with persist config on top of it
export default persistReducer(persistConfig, rootReducer);