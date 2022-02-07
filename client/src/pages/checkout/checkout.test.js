import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import CheckoutPage from "./checkout";
import CheckoutItem from "../../components/checkout-item/checkout-item";

describe('CheckoutPage component', () => {
    let wrapper;
    let cartItems = [
        {
            id: 1,
            name: 'Air Forces',
            price: 160,
            quantity: 3
        },
        {
            id: 2,
            name: 'Converse',
            price: 110,
            quantity: 2
        }
    ];
    let cartState = {
        cart: {
            cartItems
        }
    }

    // Arrange mocked selectors
    const useSelectorMock = jest.spyOn(redux, 'useSelector');

    beforeEach(() => {
        // Mock the selector and grab the cart state
        useSelectorMock.mockImplementation((callback) => callback(cartState));

        wrapper = shallow(<CheckoutPage />);
    });

    it('should render CheckoutPage', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the same number of CheckoutItem components as the length of cartItems array', () => {
        expect.assertions(1);
        expect(wrapper.find(CheckoutItem).length).toBe(cartItems.length);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the cartItems total based on price and quantity from cartItems array', () => {
        expect.assertions(1);
        let totalPrice = cartItems.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        expect(wrapper.find('.total').text()).toBe(`TOTAL $${totalPrice}`);
    });
})