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

/*
    Remove the item from cart if it exists inside the cartItem state
*/
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    // Check if the cart item selected to remove exists inside the cartItem state
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id)
    }
    else {
        return cartItems.map(item => {
            if(item.id === cartItemToRemove.id) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            else {
                return item;
            }
        });
    }
}

/*
    Check if the user has a cart item object document from Firebase
*/
export const checkIfCartExists = (cartItems) => {
    // If the users cartItem does not exist then return an empty cart
    if(!cartItems) {
        return [];
    }
    // If the users cartItem exists then return the cartItems as is
    return cartItems;
}