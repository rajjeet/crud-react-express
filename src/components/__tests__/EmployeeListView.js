import {ButtonCell, EmployeeListView, NullModifier} from '../EmployeeListView';
import React from "react";
import {shallow, mount} from 'enzyme';
import Button from "../Button";
import {employees} from "../../__mocks__/axios";

let defaultProps = {
    selectedIndex: null,
    selectedRow: null,
    getTrProps: jest.fn(() => Promise.resolve({})),
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

describe('Button Cell', () => {
    let props = {color: 'green', text: 'Yes'}, dom;
    beforeAll(() => {
        dom = shallow(<ButtonCell {...props}/>);
    });
    it('renders a button with specified background color', () => {
        expect(dom.props().style.backgroundColor).toEqual('green');
    })

    it('renders a button with specified text', () => {
        expect(dom.children().text()).toEqual('Yes');
    })

});

describe('Button Cell Integration', () => {
    let dom;

    beforeAll(() => {
        let props = Object.assign({}, defaultProps, {employees: employees, className: {}})
        dom = mount(<EmployeeListView {...props}/>);
    });

    it('shows a ButtonCell with Yes as text when employee is assigned', () => {
        expect(dom.find('ButtonCell button').first().text()).toEqual('Yes')
    });

    it('shows a ButtonCell with seagreen as color when employee is assigned', () => {
        expect(dom.find('ButtonCell button').first().props().style.backgroundColor).toEqual('seagreen')
    })

    it('shows a ButtonCell with No as text when employee is assigned', () => {
        expect(dom.find('ButtonCell button').at(1).text()).toEqual('No')
    });

    it('shows a ButtonCell with darkred as color when employee is assigned', () => {
        expect(dom.find('ButtonCell button').at(1).props().style.backgroundColor).toEqual('darkred')
    })
});

describe('Add button', () => {
    let dom;
    beforeAll(() => {
        dom = shallow(<EmployeeListView {...defaultProps}/>);
        dom.find('Button').first().props().onClick();
    });

    it('invokes the openEmployeeForm function', () => {
        expect(defaultProps.openEmployeeForm.mock.calls.length).toBe(1);
    });

    it('invokes the openEmployeeForm function with null', () => {
        expect(defaultProps.openEmployeeForm).toHaveBeenCalledWith(null);
    });
});

describe('Edit button', () => {
    let dom, props;
    beforeAll(() => {
        props = Object.assign({}, defaultProps, {openEmployeeForm: jest.fn()})
        dom = shallow(<EmployeeListView {...props}/>);
        dom.find('Button').at(1).props().onClick();
    });

    it('invokes the openEmployeeForm function', () => {
        expect(props.openEmployeeForm.mock.calls.length).toBe(1);
    });

    it('disabled when selectedIndex is null', () => {
        expect(dom.find('Button').at(1).props().disabled).toBeTruthy()
    });

    it('invokes the openEmployeeForm function with selectedIndex', () => {
        let props = Object.assign({}, defaultProps, {selectedRow: {}, openEmployeeForm: jest.fn()});
        dom = shallow(<EmployeeListView {...props}/>);
        dom.find('Button').at(1).props().onClick();
        expect(props.openEmployeeForm).toHaveBeenCalledWith({});
    });
});

describe('Delete button', () => {
    let dom, props;
    beforeAll(() => {
        props = Object.assign({}, defaultProps, {handleEmployeeDelete: jest.fn()})
        dom = shallow(<EmployeeListView {...props}/>);
        dom.find('Button').at(2).props().onClick();
    });

    it('invokes the handleEmployeeDelete function', () => {
        expect(props.handleEmployeeDelete.mock.calls.length).toBe(1);
    });

    it('disabled when selectedIndex is null', () => {
        expect(dom.find('Button').at(1).props().disabled).toBeTruthy()
    });

    it('invokes the openEmployeeForm function with selectedIndex', () => {
        let props = Object.assign({}, defaultProps, {selectedRow: {}, handleEmployeeDelete: jest.fn()});
        dom = shallow(<EmployeeListView {...props}/>);
        dom.find('Button').at(2).props().onClick();
        expect(props.handleEmployeeDelete).toHaveBeenCalledWith({});
    });
});

describe('NullModifier', () => {
    it('returns no span when value is true', () => {
        let component = shallow(<NullModifier value={true}/>);
        // console.log(component.debug());
        expect(component.find('span')).toHaveLength(0);
    });
    it('returns span when value is false', () => {
        let component = shallow(<NullModifier value={false}/>);
        expect(component.find('span')).toHaveLength(1);
    });
})