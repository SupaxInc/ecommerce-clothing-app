import React from "react";
import { mount, shallow } from "enzyme";

import * as redux from 'react-redux';
import CartDropdown from "./cart-dropdown";
import { BrowserRouter } from "react-router-dom";
import CartItem from "../cart-item/cart-item";
import CustomButton from "../custom-button/custom-button";

describe('CartDropdown component', () => {
    let wrapper;

    // Mock dispatch hook
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const cartHiddenToggle = jest.fn();

    // Mock selector hook
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    let cartItems = [
        {
            id: 1,
            imageUrl: 'testimage.com',
            name: 'Birkenstocks',
            price: 190,
            quantity: 2
        },
        {
            id: 2,
            imageUrl: 'testimage.com/2',
            name: 'Jordans',
            price: '280',
            quantity: 4
        }
    ];
    let mockState = {
        cart: {
            cartItems
        }
    };

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => cartHiddenToggle);
        useSelectorMock.mockImplementation((callback) => callback(mockState));

        wrapper = mount(<BrowserRouter><CartDropdown /></BrowserRouter>);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render CartDropdown component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct amount of cartItems based on length of cartItems array', () => {
        expect(wrapper.find(CartItem).length).toBe(2);
    });

    it('should render cart as empty when cartItems state is empty', () => {
        const newMockState = {
            cart: {
                cartItems: []
            }
        };
        useSelectorMock.mockImplementation((callback) => callback(newMockState));
        let newWrapper = mount(<BrowserRouter><CartDropdown /></BrowserRouter>);

        expect(newWrapper.find(CartItem).length).toBe(0);
        expect(newWrapper.find('.empty-message').text()).toEqual('Your cart is empty');
    });

    it('should dispatch TOGGLE_CART_ITEMS action upon click button', () => {
        wrapper.find(CustomButton).simulate('click');

        expect(cartHiddenToggle).toHaveBeenCalledWith({
            type: 'TOGGLE_CART_HIDDEN'
        });
    });
});