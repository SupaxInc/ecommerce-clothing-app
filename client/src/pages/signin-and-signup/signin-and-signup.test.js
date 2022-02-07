import React from "react";
import { shallow } from "enzyme";

import * as redux from 'react-redux';
import SignInAndSignUpPage from "./signin-and-signup";

describe('signin-and-signup page component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SignInAndSignUpPage />);
    });
    
    it('should render signin-and-signup page', () => {
        expect(wrapper).toMatchSnapshot();
    });
})