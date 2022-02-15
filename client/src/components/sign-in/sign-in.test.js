import React from "react";
import { mount, shallow } from "enzyme";

import * as redux from 'react-redux';
import SignIn from "./sign-in";
import FormInput from "../form-input/form-input";

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

describe('Sign In component', () => {
    let wrapper;

    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatch = jest.fn();
    beforeEach(() => {
        useDispatchMock.mockImplementation(() => dispatch);
        wrapper = shallow(<SignIn />);
    });

    it('should render sign-in component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should submit form on click and dispatch', () => {
        expect.assertions(1);
        wrapper.find('form').simulate(
            'submit', {
                preventDefault() {}
            }
        );

        expect(dispatch).toHaveBeenCalled();
    });

    it('should update email state on change of email input', () => {
        // Mock useState hook for setCredentials function
        // const setCredentials = jest.fn();
        // const useStateMock = jest.spyOn(React, 'useState');
        // useStateMock.mockImplementation(() => setCredentials);

        // Check if form inputs exist
        expect(wrapper.find(FormInput).length).toBe(2);
        wrapper.find(FormInput).at(0).dive().find('.form-input').simulate('change', {
            target: {
                name: 'email',
                value: 'foo@gmail.com'
            }
        });

        expect(wrapper.find(FormInput).at(0).dive().find('.form-input').prop('value')).toEqual('foo@gmail.com');
        //expect(setCredentials).toHaveBeenCalled();
    });
}); 