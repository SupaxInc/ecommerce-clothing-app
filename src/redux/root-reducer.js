import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

// combineReducers will return all of the state into one giant object
export default combineReducers({
    user: userReducer,
    cart: cartReducer
});