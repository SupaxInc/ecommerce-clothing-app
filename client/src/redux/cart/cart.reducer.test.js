import { CartActionTypes } from "./cart.types";
import cartReducer from "./cart.reducer";

const INITIAL_STATE = {
    cartHidden: true,
    cartItems: [],
    error: null
};

describe('Cart Reducer', () => {

    it('should return initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('should toggle hidden cart action', () => {
        expect(cartReducer(INITIAL_STATE, {type: CartActionTypes.TOGGLE_CART_HIDDEN}).cartHidden).toBe(false);
    });

    it('should increase quantity of matching item by 1 if addItem action is fired with the same item as payload', () => {
        const mockItem = {
            id: 1,
            quantity: 1
        };

        const mockPrevState = {
            cartHidden: true,
            cartItems: [mockItem, { id: 2, quantity: 3}],
            error: null
        };

        expect(cartReducer(mockPrevState, {type: CartActionTypes.ADD_ITEM, payload: mockItem}).cartItems[0].quantity).toBe(2);
    });

    it('should create a new cartItem with quantity of 1, if the addItem action is fired with a payload cartItem that does not exist in the state', () => {
        const mockItem = {
            id: 3
        };

        const mockPrevState = {
            cartHidden: true,
            cartItems: [{ id: 2, quantity: 3}],
            error: null
        };

        expect(cartReducer(mockPrevState, {type: CartActionTypes.ADD_ITEM, payload: mockItem}).cartItems[1].quantity).toBe(1);
    });

    it('should decrease cartItem quantity of matching item by 1, if the removeItem action is fired with same item as the payload', () => {
        const mockItem = {
            id: 3,
            quantity: 2
        };

        const mockPrevState = {
            cartHidden: true,
            cartItems: [mockItem, { id: 2, quantity: 3}],
            error: null
        };

        expect(cartReducer(mockPrevState, {type: CartActionTypes.REMOVE_ITEM, payload: mockItem}).cartItems[0].quantity).toBe(1);
    });

    it('should remove cartItem that has a quantity of 1, if the removeItem action is fired with a payload of an existing item', () => {
        const mockItem = {
            id: 3,
            quantity: 1
        };

        const mockPrevState = {
            cartHidden: true,
            cartItems: [mockItem, { id: 2, quantity: 3}],
            error: null
        };

        expect(cartReducer(mockPrevState, {type: CartActionTypes.REMOVE_ITEM, payload: mockItem}).cartItems.length).toBe(1);
    });

    it('should clear the cart, if clearCart action is fired', () => {
        const mockPrevState = {
            cartHidden: true,
            cartItems: [{id: 1, quantity: 1}, { id: 2, quantity: 3}],
            error: null
        };

        expect(cartReducer(mockPrevState, {type: CartActionTypes.CLEAR_CART}).cartItems.length).toBe(0);
    });

    it('should remove item from cart if clearItemFromCart action is fired with payload of an existing item', () => {
        const mockItem = {
            id: 3,
            quantity: 1
        };

        const mockPrevState = {
            cartHidden: true,
            cartItems: [mockItem, { id: 2, quantity: 3}],
            error: null
        };

        expect(cartReducer(mockPrevState, {type: CartActionTypes.REMOVE_ITEM, payload: mockItem}).cartItems.includes(item => item.id === 3)).toEqual(false);
    });
});