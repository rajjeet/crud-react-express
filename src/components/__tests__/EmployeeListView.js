import {EmployeeListView} from '../EmployeeListView';
import React from "react";
import {shallow} from 'enzyme';

let defaultProps = {}

it('renders', () => {
    shallow(<EmployeeListView {...defaultProps}/>)
});