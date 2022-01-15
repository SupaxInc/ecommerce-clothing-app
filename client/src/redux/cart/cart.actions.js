import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => {
    return {
        type: CartActionTypes.TOGGLE_CART_HIDDEN
    }
}

export const addItem = (item) => {
    return {
        type: CartActionTypes.ADD_ITEM,
        payload: item 
    }
}

export const clearItemFromCart = (item) => {
    return {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: item
    }
}

export const removeItem = (item) => {
    return {
        type: CartActionTypes.REMOVE_ITEM,
        payload: item
    }
}

export const clearCart = () => {
    return {
        type: CartActionTypes.CLEAR_CART
    }
}

export const saveCartStart = (cart) => {
    return {
        type: CartActionTypes.SAVE_CART_START,
        payload: cart
    }
}

export const saveCartSuccess = () => {
    return {
        type: CartActionTypes.SAVE_CART_SUCCESS
    }
}

export const saveCartFailure = (errorMessage) => {
    return {
        type: CartActionTypes.SAVE_CART_FAILURE,
        payload: errorMessage
    }
}

export const setCartFromFirebase = (cart) => {
    return {
        type: CartActionTypes.SET_CART_FROM_FIREBASE,
        payload: cart
    }
}