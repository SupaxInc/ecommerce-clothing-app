import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import CartIcon from "./cart-icon";

describe('CartIcon component', () => {
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

        wrapper = shallow(<CartIcon />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render CartIcon', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the total combined quantity of the cartItems object', () => {
        expect.assertions(1);
        expect(wrapper.find('.item-count').text()).toEqual('6');
    });

    it('should dispatch TOGGLE_CART_HIDDEN action upon clicking the cart', () => {
        expect.assertions(1);
        wrapper.find('.cart-icon').simulate('click');
        expect(cartHiddenToggle).toHaveBeenCalledWith({
            type: 'TOGGLE_CART_HIDDEN'
        });
    });
});