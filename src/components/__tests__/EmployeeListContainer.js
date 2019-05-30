import {EmployeeListContainer} from '../EmployeeListContainer';
import React from "react";
import {shallow} from 'enzyme';

let defaultProps = {};

it("renders", () => {
    shallow(<EmployeeListContainer {...defaultProps} />);
});

describe('initial load', () => {
    let dom;

    beforeAll(async () => {
        dom = shallow(<EmployeeListContainer {...defaultProps} />);
        await dom.instance().componentDidMount();
    });

    it('loads employees on component mount', async () => {
        expect(dom.state().employees).toHaveLength(2);
    });
});

describe('openEmployeeForm', () => {

    it('changes id in state to the row id when row is not null', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({id: 2})
        dom.instance().openEmployeeForm({id: 1});
        expect(dom.state().id).toEqual(1);
    });

    it('changes isEmployeeFormVisible state to true', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({isEmployeeFormVisible: false});
        dom.instance().openEmployeeForm(null);
        expect(dom.state().isEmployeeFormVisible).toBeTruthy();
    });
});

describe('closeEmployeeForm', () => {

    it('changes isEmployeeFormVisible state to false', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({isEmployeeFormVisible: true})
        dom.instance().closeEmployeeForm(null);
        expect(dom.state().isEmployeeFormVisible).toBeFalsy();
    });
});

describe('deselectRow', () => {

    it('nullifies selectedIndex and selectedRow state when table row and row modifier button is not selected and and form is not visible', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({selectedIndex: 1, selectedRow: {id: 1}, isEmployeeFormVisible: false});
        dom.instance().deselectRow({target: {className: '12312 2312ew1'}});
        expect(dom.state().selectedIndex).toEqual(null);
        expect(dom.state().selectedRow).toEqual(null);
    });

    it('does not nullify selectedIndex and selectedRow state when table row is selected and and form is not visible', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({selectedIndex: 1, selectedRow: {id: 1}, isEmployeeFormVisible: false});
        dom.instance().deselectRow({target: {className: '12312 rt-td 2312ew1'}});
        expect(dom.state().selectedIndex).not.toEqual(null);
        expect(dom.state().selectedRow).not.toEqual(null);
    });

    it('does not nullify selectedIndex and selectedRow state when modifier button is selected and and form is not visible', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({selectedIndex: 1, selectedRow: {id: 1}, isEmployeeFormVisible: false});
        dom.instance().deselectRow({target: {className: '12312 row-modifier 2312ew1'}});
        expect(dom.state().selectedIndex).not.toEqual(null);
        expect(dom.state().selectedRow).not.toEqual(null);
    });

    it('does not nullify selectedIndex and selectedRow state to null when form is visible', () => {
        let dom = shallow(<EmployeeListContainer {...defaultProps} />);
        dom.setState({selectedIndex: 1, selectedRow: {id: 1}, isEmployeeFormVisible: true});
        dom.instance().deselectRow({target: {className: ''}});
        expect(dom.state().selectedIndex).not.toEqual(null);
        expect(dom.state().selectedRow).not.toEqual(null);
    });
});
