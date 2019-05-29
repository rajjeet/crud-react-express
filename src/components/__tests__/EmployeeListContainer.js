import {EmployeeListContainer} from '../EmployeeListContainer';
import React from "react";
import {shallow} from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

let defaultProps = {};

it("renders", () => {
    shallow(<EmployeeListContainer {...defaultProps} />);
});

it('loads employees on component mount', async () => {
    let mock = new MockAdapter(axios);
    const data =
        [
            {
                "id": 1,
                "name": "Rajjeet!",
                "code": "F101",
                "profession": null,
                "city": "Mississauga",
                "branch": "Abacus",
                "assigned": 1
            },
            {
                "id": 2,
                "name": "Jasmine!",
                "code": "F102",
                "profession": "Developer",
                "city": "Brampton",
                "branch": "Abacus",
                "assigned": 1
            }
        ];
    mock.onGet('http://localhost:8080/api/employees').reply(200, data);
    let dom = shallow(<EmployeeListContainer {...defaultProps} />);
    await dom.instance().componentDidMount();
    console.log(dom.state());
});