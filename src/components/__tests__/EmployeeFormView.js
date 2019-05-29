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