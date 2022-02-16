import React from "react";
import { shallow } from "enzyme";

import {sections} from '../../redux/directory/directory.data';

import * as redux from 'react-redux';
import Directory from "./directory";
import MenuItem from "../menu-item/menu-item";

describe('Directory component', () => {
    let wrapper;

    // Mock selector hook
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    const mockState = {
        directory: {
            sections
        }
    }

    beforeEach(() => {
        useSelectorMock.mockImplementation(callback => callback(mockState));
        wrapper = shallow(<Directory />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render directory', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the amount of sections from the sections array', () => {
        expect(wrapper.find(MenuItem).length).toBe(5);
    });
}); 