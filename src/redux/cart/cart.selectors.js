import { createSelector } from 'reselect';

// Create a function that gets a whole state but returns just a slice of the state
// In this case, we just want the cart state from our Store
const selectCart = state => state.cart;

// Create a selector just for the cartItems state inside cart
export const selectCartItems = createSelector(
    [selectCart], // array of input selectors
    (cart) => cart.cartItems // function that returns the value that we want from the array of input selectors
);

// Create a selector for the cartItems state that was returned from selectCartItems
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => {
        return cartItems.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
    }
);