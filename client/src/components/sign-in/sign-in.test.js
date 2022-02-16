import React from "react";
import { mount, shallow } from "enzyme";

import * as redux from 'react-redux';
import SignIn from "./sign-in";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

describe('Sign In component', () => {
    let wrapper;

    // Mock dispatch call
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatch = jest.fn();

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => dispatch);
        wrapper = shallow(<SignIn />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render sign-in component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should submit form on click and dispatch EMAIL_SIGN_IN_START action', () => {
        expect.assertions(1);
        
        wrapper.find(FormInput).at(0).dive().find('.form-input').simulate('change', {
            target: {
                name: 'email',
                value: 'foo@gmail.com'
            }
        });

        wrapper.find(FormInput).at(1).dive().find('.form-input').simulate('change', {
            target: {
                name: 'password',
                value: 'test123'
            }
        });

        wrapper.find('form').simulate(
            'submit', {
                preventDefault() {}
            }
        );
        expect(dispatch).toHaveBeenCalledWith({
            type: 'EMAIL_SIGN_IN_START',
            payload: {
                email: 'foo@gmail.com',
                password: 'test123'
            }
        });
    });

    it('should dispatch GOOGLE_SIGN_IN_START action upon clicking second custom button', () => {

        wrapper.find(CustomButton).at(1).simulate('click');

        expect(dispatch).toHaveBeenCalledWith({
            type: 'GOOGLE_SIGN_IN_START'
        });
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