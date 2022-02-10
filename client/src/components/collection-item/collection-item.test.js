import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import CollectionItem from "./collection-item";
import CustomButton from "../custom-button/custom-button";


describe('Collection Item component', () => {
    let wrapper;

    let item = {
        imageUrl: 'www.testImage.com',
        name: 'Tank Top',
        price: 15
    }
    let mockProps = {
        item
    };
    
    // Mocks the useDispatch hook
    const mockedAddItem = jest.fn();
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => mockedAddItem);

        wrapper = shallow(<CollectionItem {...mockProps}/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render Collectionitem component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should dispatch add item action upon button click', () => {
        const btnAddToCart = wrapper.find(CustomButton);
        expect(btnAddToCart.length).toBe(1);

        btnAddToCart.simulate('click');
        expect(mockedAddItem).toHaveBeenCalled();
    });

});