/* 
    Adds item to the cart and increments the quantity property
*/
export const addItemToCart = (cartItems, cartItemToAdd) => {
    // .find() returns the first item found in the array depending on a condition
    // checks if there are any existing cart items compared to the cart item we are adding
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id) 

    if (existingCartItem) {
        // Return a new array, so that our component re-renders correctly.
        return cartItems.map(cartItem => {
            // if the cartItem we are adding already exists in the cart, increment the quantity by 1
            if(cartItem.id === cartItemToAdd.id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                };
            }
            else {
                return cartItem;
            }
        })
    } else {
        return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
    }
}