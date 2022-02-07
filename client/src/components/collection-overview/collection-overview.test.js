import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import CollectionOverview from "./collection-overview";
import CollectionPreview from "../collection-preview/collection-preview";

describe('CollectionOverview component', () => {
    // Arrange
    let wrapper;
    // Mocking collections
    let mockCollections = {
        1: { id: 1 }, 
        2: {id: 2}, 
        3: {id: 3}
    };
    // Mock shop state
    let mockState = {
        shop: {
            collections: mockCollections
        }
    }

    const useSelectorMock = jest.spyOn(redux, 'useSelector');

    beforeEach(() => {
        // Selector should change collections object to an array by mapping the mockCollections keys
        // Allows us to loop over the collections objects and create CollectionPreview items
        /*
            mockCollectionsArray = [{
                {id: 1}, {id: 2}, {id: 3}
            }]
        */
        useSelectorMock.mockImplementation((callback) => callback(mockState));

        wrapper = shallow(<CollectionOverview />);
    });

    it('should render CollectionOverview', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the same number of CollectionPreview as the collections array', () => {
        expect.assertions(1);
        expect(wrapper.find(CollectionPreview).length).toBe(3);
    });

})