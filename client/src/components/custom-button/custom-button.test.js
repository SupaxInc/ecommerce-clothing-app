import React from "react";
import { shallow, mount } from "enzyme";

import * as redux from 'react-redux';
import CustomButton from "./custom-button";

describe('Custom Buttom component', () => {
    let wrapper;

    afterEach(() => {
        wrapper = shallow(<CustomButton />);
    });

    it('should render custom button',() => {
        expect(wrapper).toMatchSnapshot();
    });
});