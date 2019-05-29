import {OptionSelectInput} from '../OptionSelectInput';
import {shallow} from 'enzyme';
import React from "react";

let defaultProps = {
    name: 'selectName',
    value: 1,
    options: [
        {id: 1, name: 'option1'},
        {id: 2, name: 'option2'}
    ],
    handleChange: jest.fn()
};

it('renders', () => {
    shallow(<OptionSelectInput {...defaultProps} />)
});

let dom;

describe('default shallow render', () => {
    beforeAll(() => {
        dom = shallow(<OptionSelectInput {...defaultProps} />)
    });

    it('renders 3 options', () => {
        expect(dom.find('option')).toHaveLength(3);
    });

    it('has None with 0 id as the first option', () => {
        expect(dom.find('option').at(0).props().value).toEqual(0);
        expect(dom.find('option').at(0).children().text()).toEqual('None');
    });

    it('renders 3rd option with correct id and name', () => {
        expect(dom.find('option').at(2).props().value).toEqual(2);
        expect(dom.find('option').at(2).children().text()).toEqual('option2');
    });
});

