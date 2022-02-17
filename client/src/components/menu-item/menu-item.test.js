import React from "react";
import { mount } from "enzyme";

import * as redux from 'react-redux';
import MenuItem from "./menu-item";
import { BrowserRouter } from "react-router-dom";

describe('MenuItem component', () => {
    let wrapper;
    const mockProps = {
        title: 'hats',
        imageUrl: 'testHats',
        size: 'large',
        linkUrl: '/hats'
    }

    beforeEach(() => {

        wrapper = mount(<BrowserRouter><MenuItem {...mockProps}/></BrowserRouter>);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render MenuItem component', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render a large menu-item', () => {
        expect(wrapper.find('.large').length).toBe(1);
    });
});