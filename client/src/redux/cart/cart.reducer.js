import UserActionTypes from "../user/user.types";
import { CartActionTypes } from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    cartHidden: true,
    cartItems: [],
    error: null
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state, // Make sure to spread the other state properties so we don't replace an entirely new object with just the one state
                cartHidden: !state.cartHidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload) // Use the utility function to add the item to cart
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => { // create a new array of items that were not selected to be cleared from the cart
                    return item.id !== action.payload.id
                })
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: [],
                cartHidden: true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                cartItems: action.payload.cart,
                error: null
            }
        case CartActionTypes.SAVE_CART_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;