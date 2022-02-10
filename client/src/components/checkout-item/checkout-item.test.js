import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import CheckoutItem from "./checkout-item";

describe('CheckoutItem component', () => {
    let wrapper;
    let item = {
        id: 1,
        imageUrl: 'testimage.com',
        name: 'Birkenstocks',
        price: 190,
        quantity: 2
    };
    let mockProps = {
        cartItem: item
    };

    const mockedDispatch = jest.fn();
    // Mocks the useDispatch hook
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    beforeEach(() => {
        useDispatchMock.mockImplementation(() => mockedDispatch);
        wrapper = shallow(<CheckoutItem {...mockProps}/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render CheckoutItem', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should dispatch add item action upon clicking right arrow', () => {
        expect.assertions(2);
        // Grab the right arrow element at node 1 (there are two arrows with the same classes)
        const btnRightArrow = wrapper.find('.arrow').at(1);
        expect(btnRightArrow.length).toBe(1);

        btnRightArrow.simulate('click');
        expect(mockedDispatch).toHaveBeenCalled();
    });

    it('should dispatch remove item action upon clicking left arrow', () => {
        expect.assertions(2);
        // Grab the right arrow element at node 0 (there are two arrows with the same classes)
        const btnLeftArrow = wrapper.find('.arrow').at(1);
        expect(btnLeftArrow.length).toBe(1);

        btnLeftArrow.simulate('click');
        expect(mockedDispatch).toHaveBeenCalled();
    });

    it('should dispatch clear items action upon clicking left arrow', () => {
        expect.assertions(2);
        const btnClearItems = wrapper.find('.remove-button');
        expect(btnClearItems.length).toBe(1);

        btnClearItems.simulate('click');
        expect(mockedDispatch).toHaveBeenCalled();
    });
});