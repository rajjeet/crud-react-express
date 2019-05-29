import {EmployeeFormContainer} from "../EmployeeFormContainer";
import React from "react";
import {shallow} from 'enzyme';

let defaultProps = {
    handleSave: jest.fn(),
    handleClose: jest.fn(),
    id: 1
};

it("renders", () => {
    shallow(<EmployeeFormContainer {...defaultProps} />);
});


let dom;
describe('initial load when id is provided', () => {
    beforeAll(async () => {
        dom = shallow(<EmployeeFormContainer {...defaultProps} />);
        await dom.instance().componentDidMount();
    });

    it('loads name into state', () => {
        expect(dom.state().name).toEqual('Rajjeet!');
    });

    it('loads code into state', () => {
        expect(dom.state().code).toEqual(1);
    });

    it('loads profession into state', () => {
        expect(dom.state().profession).toEqual(1);
    });

    it('loads city into state', () => {
        expect(dom.state().city).toEqual(1);
    });

    it('loads branch into state', () => {
        expect(dom.state().branch).toEqual(1);
    });

    it('loads assigned into state', () => {
        expect(dom.state().assigned).toBeTruthy();
    });

    it('loads code options into state', () => {
        expect(dom.state().codes).not.toEqual(0);
    });

    it('loads profession options into state', () => {
        expect(dom.state().professions).not.toEqual(0);
    });

    it('loads city options into state', () => {
        expect(dom.state().cities).not.toEqual(0);
    });

    it('loads branch options into state', () => {
        expect(dom.state().branches).not.toEqual(0);
    });
});


describe('initial load when id is NOT provided', () => {
    beforeAll(async () => {
        defaultProps.id = null;
        dom = shallow(<EmployeeFormContainer {...defaultProps} />);
        await dom.instance().componentDidMount();
    });

    it('should set name to blank', () => {
        expect(dom.state().name).toEqual('');
    });

    it('should set code to "None" value', () => {
        expect(dom.state().code).toEqual(0);
    });

    it('should set profession to "None"', () => {
        expect(dom.state().profession).toEqual(0);
    });

    it('should set city to "None"', () => {
        expect(dom.state().city).toEqual(0);
    });

    it('should set branch to "None"', () => {
        expect(dom.state().branch).toEqual(0);
    });

    it('should set assigned to False', () => {
        expect(dom.state().branch).toEqual(0);
    });

    it('loads code options into state', () => {
        expect(dom.state().codes).not.toEqual(0);
    });

    it('loads profession options into state', () => {
        expect(dom.state().professions).not.toEqual(0);
    });

    it('loads city options into state', () => {
        expect(dom.state().cities).not.toEqual(0);
    });

    it('loads branch options into state', () => {
        expect(dom.state().branches).not.toEqual(0);
    });
});
