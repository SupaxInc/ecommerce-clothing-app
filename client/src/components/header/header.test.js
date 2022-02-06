import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Header from "./header";
import CartDropdown from "../cart-dropdown/cart-dropdown";



describe('Header component', () => {
    let wrapper;
    // Arrange mocked selectors and dispatches
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    // Create a mock of a state with a current user present and the cart dropdown is hidden
    const initialMockState = {
        user: {
            currentUser: {
                uid: '1234'
            }
        },
        cart: {
            cartHidden: true
        }
    }
    // Create a mock dispatch of saveCartStart function
    const mockDispatch = jest.fn();
    
    
    // Run the following code before each tests
    beforeEach(() => {
        // Set the initial state of all tests within suite
        useSelectorMock.mockImplementation((callback) => callback(initialMockState));
        // If dispatch function is called, return the mocked dispatch function
        useDispatchMock.mockImplementation(() => {
            return mockDispatch;
        });

        wrapper = shallow(<Header />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should render Header component', () => {
        // Snapshot testing
        // Creates a snapshot folder of the current header component
        expect(wrapper).toMatchSnapshot();
    });

    describe('if cartHidden is true', () => {
        expect.assertions(1);
        it('should not render cartDropdown', () => {
            expect(wrapper.exists(CartDropdown)).toBe(false);
        });
    });

    describe('if currentUser is present', () => {
        
        it('should render sign out link', () => {
            expect(wrapper
                    .find('OptionLink')
                    .at(2) // Text node 2 (there are multiple optionlink components)
                    .text()
            ).toBe('SIGN OUT');
        });

        it('should call saveCartStart when sign out link is clicked', () => {
            // Create a mock function to simulate the dispatch saveCartStart function
            wrapper.find('OptionLink').at(2).simulate('click');
            wrapper.find('OptionLink').at(2).simulate('click');
            expect.assertions(1);
            // Assert
            expect(mockDispatch).toHaveBeenCalledTimes(2);
        })
    });

    

    describe('if currentUser is null', () => {
        it('should render sign in link', () => {
            const newMockState = {
                user: {
                    currentUser: null
                },
                cart: {
                    cartHidden: true
                }
            }
            // Change state to the new mock state where current user is null
            useSelectorMock.mockImplementation((callback) => callback(newMockState));
            // Shallow render the new header that uses the new state
            let newWrapper = shallow(< Header/>);
            expect.assertions(1);
            expect(newWrapper.find('OptionLink').at(2).text()).toBe('SIGN IN');
        })
    })
})