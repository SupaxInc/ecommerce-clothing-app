import React from "react";
import { mount } from "enzyme";

import * as redux from 'react-redux';
import CollectionPreview from "./collection-preview";
import CollectionItem from "../collection-item/collection-item";
import { BrowserRouter } from "react-router-dom";

describe('CollectionPreview component', () => {
    let wrapper;
    let mockProps = {
        title: 'Womens',
        items: [
            {id: 1}, {id: 2}, {id: 3}
        ],
        routeName: 'womens'
    }

    // Mocks the useDispatch hook
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    
    beforeEach(() => {
        
        // Need to use mount since shallow rendering does not render beyond first level of elements
        // In this case only the first div was rendering
        wrapper = mount(<BrowserRouter><CollectionPreview {...mockProps}/></BrowserRouter>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should render CollectionPreview', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the collection item component depending on items length', () => {
        expect.assertions(1);
        expect(wrapper.find(CollectionItem).length).toBe(3);
    })
})