import {EmployeeListView} from '../EmployeeListView';
import React from "react";
import {shallow} from 'enzyme';
import Button from "../Button";

let defaultProps = {
    selectedIndex: null,
    selectedRow: null,
    getTrProps: jest.fn(),
    employees: [],
    id: null,
    handleSave: jest.fn(),
    closeEmployeeForm: jest.fn(),
    isEmployeeFormVisible: false,
    openEmployeeForm: jest.fn(),
    handleEmployeeDelete: jest.fn()
};

it('renders', () => {
    shallow(<EmployeeListView {...defaultProps}/>)
});

let dom;
describe('default load', () => {
    beforeAll(() => {
        dom = shallow(<EmployeeListView {...defaultProps}/>)
    });

    it('has a header', () => {
        expect(dom.find('h1')).toHaveLength(1);
    });

    it('has three styled.button', () => {
        expect(dom.find(Button)).toHaveLength(3);
    })

    it('has a single ReactTable', () => {
        expect(dom.find('ReactTable')).toHaveLength(1);
    })

    it('hides EmployeeFormContainer when isEmployeeFormVisible is false', () => {
        let dom = shallow(<EmployeeListView {...defaultProps}/>);
        expect(dom.find('Styled(EmployeeFormContainer)')).toHaveLength(0);
    });

});

it('shows EmployeeFormContainer when isEmployeeFormVisible is true', () => {
    let props = Object.assign({}, defaultProps, {isEmployeeFormVisible: true});
    let dom = shallow(<EmployeeListView {...props}/>);
    expect(dom.find('Styled(EmployeeFormContainer)')).toHaveLength(1);
});
