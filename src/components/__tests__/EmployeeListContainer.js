import {EmployeeListContainer} from '../EmployeeListContainer';
import React from "react";
import {shallow} from 'enzyme';

let defaultProps = {};

it("renders", () => {
    shallow(<EmployeeListContainer {...defaultProps} />);
});

it('loads employees on component mount', async () => {
    let dom = shallow(<EmployeeListContainer {...defaultProps} />);
    await dom.instance().componentDidMount();
    expect(dom.state().employees).toHaveLength(2);
});
