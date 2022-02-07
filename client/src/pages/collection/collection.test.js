import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';

import CollectionPage from "./collection";
import CollectionItem from "../../components/collection-item/collection-item";

describe('CollectionPage component', () => {
    // Arrange
    let wrapper;
    let mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    let mockCollections = {
        items: mockItems,
        title: "Test"
    };
    let mockCollectionsState = {
        shop: {
            collections: {
                test: mockCollections // test is the URL paramId
            }
        }
    };

    const useSelectorMock = jest.spyOn(redux, 'useSelector');

    beforeEach(() => {
        useSelectorMock.mockImplementation(() => {
            return mockCollectionsState.shop.collections['test'];
        });

        wrapper = shallow(<CollectionPage />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render CollectionPage component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the same number of CollectionsItems as collection array', () => {
        expect.assertions(1);
        expect(wrapper.find(CollectionItem).length).toBe(mockItems.length);
    });
})