import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import FormInput from "./form-input";

describe('FormInput component', () => {
    let wrapper;

    // Mock the properties
    const handleChange = jest.fn();
    const label = "Email";
    const mockProps = {
        value: 'foo@gmail.com',
        name: 'email',
        type: 'email'
    };
    
    beforeEach(() => {
        wrapper = shallow(<FormInput handleChange={handleChange} label={label} {...mockProps}/>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the FormInput component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should trigger handleChange when onChange is simulated', () => {
        wrapper.find('.form-input').simulate('change', {
            target: {
                name: 'email',
                value: 'test123@gmail.com'
            }
        });

        expect(handleChange).toHaveBeenCalledWith({
            target: {
                name: 'email',
                value: 'test123@gmail.com'
            }
        });
    });

    it('should render shrink animation because label is not empty', () => {
        expect(wrapper.find('.shrink').length).toBe(1);
    });

    it('should not render shrink animation because label is empty', () => {
        // Mock the properties
        const handleChange = jest.fn();
        const mockProps = {
            value: 'foo@gmail.com',
            name: 'email',
            type: 'email'
        };

        let newWrapper = shallow(<FormInput handleChange={handleChange} label="" {...mockProps}/>);
        expect(newWrapper.find('label').length).toBe(0);
        expect(newWrapper.find('.shrink').length).toBe(0);
    });
});