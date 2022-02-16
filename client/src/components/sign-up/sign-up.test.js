import React from "react";
import { mount, shallow } from "enzyme";

import * as redux from 'react-redux';

import FormInput from "../form-input/form-input";
import SignUp from "./sign-up";

describe('Sign Up component', () => {
    let wrapper;

    // Mock use dispatch
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatch = jest.fn();

    beforeEach(() => {
        useDispatchMock.mockImplementation(() => dispatch);
        wrapper = shallow(<SignUp />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render sign-up component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should submit form on click and dispatch the correct action and parameters', () => {
        expect.assertions(1);

        wrapper.find(FormInput).at(0).dive().find('.form-input').simulate('change', {
            target: {
                name: 'displayName',
                value: 'foo'
            }
        });

        wrapper.find(FormInput).at(1).dive().find('.form-input').simulate('change', {
            target: {
                name: 'email',
                value: 'foo@gmail.com'
            }
        });

        wrapper.find(FormInput).at(2).dive().find('.form-input').simulate('change', {
            target: {
                name: 'password',
                value: 'test123'
            }
        });

        wrapper.find(FormInput).at(3).dive().find('.form-input').simulate('change', {
            target: {
                name: 'confirmPassword',
                value: 'test123'
            }
        });

        wrapper.find('form').simulate(
            'submit', {
                preventDefault() {}
            }
        );

        expect(dispatch).toHaveBeenCalledWith({
            type: 'SIGN_UP_START',
            payload: {
                displayName: 'foo',
                email: 'foo@gmail.com',
                password: 'test123'
            }
        });
    });

    it('should submit form on click but do not dispatch the action due to password and confirm password does not equal each other', () => {
        expect.assertions(1);

        wrapper.find(FormInput).at(0).dive().find('.form-input').simulate('change', {
            target: {
                name: 'displayName',
                value: 'foo'
            }
        });

        wrapper.find(FormInput).at(1).dive().find('.form-input').simulate('change', {
            target: {
                name: 'email',
                value: 'foo@gmail.com'
            }
        });

        wrapper.find(FormInput).at(2).dive().find('.form-input').simulate('change', {
            target: {
                name: 'password',
                value: 'test123'
            }
        });

        wrapper.find(FormInput).at(3).dive().find('.form-input').simulate('change', {
            target: {
                name: 'confirmPassword',
                value: 'test1234'
            }
        });

        wrapper.find('form').simulate(
            'submit', {
                preventDefault() {}
            }
        );

        // did NOT call the sign_up_start action
        expect(dispatch).not.toHaveBeenCalledWith({
            type: 'SIGN_UP_START',
            payload: {
                displayName: 'foo',
                email: 'foo@gmail.com',
                password: 'test123'
            }
        });
    });
}); 