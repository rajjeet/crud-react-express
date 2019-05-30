import {EmployeeFormView} from '../EmployeeFormView';
import React from "react";
import {shallow} from 'enzyme';

let defaultProps = {
    handleSubmit: jest.fn(),
    handleReset: jest.fn(),
    handleChange: jest.fn(),
    handleClose: jest.fn()
};


it('renders', () => {
    shallow(<EmployeeFormView {...defaultProps}/>)
});

describe('initial render', () => {
    let dom;
    beforeAll(() => {
        dom = shallow(<EmployeeFormView {...defaultProps}/>)
    });

    it('renders a form', () => expect(dom.find('form')).toHaveLength(1));
    it('renders a h3 header tag', () => expect(dom.find('h3')).toHaveLength(1));
    it('renders 3 inputs', () => expect(dom.find('input')).toHaveLength(3));
    it('renders 2 labels', () => expect(dom.find('label')).toHaveLength(2));
    it('renders 4 OptionSelectInput components', () => expect(dom.find('OptionSelectInput')).toHaveLength(4));
    it('renders 3 Button components', () => expect(dom.find('Button')).toHaveLength(3));
});