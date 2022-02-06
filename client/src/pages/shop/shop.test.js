import React from "react";
import { mount } from "enzyme";

import * as redux from 'react-redux';
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import ShopPage from "./shop";

// Allows us to create mock stores multiple times if needed
export const createMockStore = ({ state, reducers }) => {
    const store = createStore(combineReducers(reducers), state);
    return {
        ...store,
        persistor: {
            persist: () => null
        }
    }
}

describe('ShopPage component', () => {
    // Arrange
    let wrapper;
    let mockFetchCollectionsStart;
    let store;
    // Mocks the useDispatch hook
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');

    beforeEach(() => {
        // Create a mock reducer function with initial state and returns a new state based on action
        const mockShopReducer = (
            state = {
                isFetching: true
            },
            action
        ) => state;
        // Create a mock slice of state for the shop that is part of the Store
        const mockShopState = {
            shop: {
                isFetching: true
            }
        };
        // Create a mock function that acts as fetch collection start action
        mockFetchCollectionsStart = jest.fn();
        // Create the mock store that uses the mock state and mock reducer
        store = createMockStore({
            state: mockShopState,
            reducers: {
                shop: mockShopReducer
            }
        });

        // If dispatch function is called, return the mocked dispatch function
        useDispatchMock.mockImplementation(() => {
            return mockFetchCollectionsStart;
        });

        // Full DOM Render with mount since Shop component interacts with the DOM life/cycle methods using useEffect
        wrapper = mount(
            <BrowserRouter>
                <Provider store={store}>
                    <ShopPage />
                </Provider>
            </BrowserRouter>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render ShopPage component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('fetchCollectionStart should be called upon render', () => {
        expect.assertions(1);
        expect(mockFetchCollectionsStart).toHaveBeenCalled();
    });
});