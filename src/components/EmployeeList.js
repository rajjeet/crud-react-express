import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import EmployeeForm from "./EmployeeForm";
import styled from 'styled-components';

class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            id: null,
            isEmployeeFormVisible: false,
            selectedIndex: null,
            selectedRow: null
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleEmployeeDelete = this.handleEmployeeDelete.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
        this.openEmployeeForm = this.openEmployeeForm.bind(this)
        this.closeEmployeeForm = this.closeEmployeeForm.bind(this);
        this.deselectRow = this.deselectRow.bind(this);
    }

    componentWillMount = () => {
        this.getEmployees()
        document.addEventListener('click', this.deselectRow)
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.deselectRow)
    }

    deselectRow = function (e) {
        if (!['rt-td', 'row-modifier'].includes(e.target.className) && !this.state.isEmployeeFormVisible)
            this.setState({selectedIndex: null, selectedId: null})
    }

    getEmployees = function () {
        fetch('http://localhost:8080/api/employees')
            .then(response => response.json())
            .then(employees => this.setState({employees, isEmployeeFormVisible: false}))

    }

    handleSave = function (employee) {
        let method = this.state.employees.find(e => e.id === employee.id) ? 'PUT' : 'POST';
        fetch(`http://localhost:8080/api/employees/${employee.id}`,
            {
                method: method,
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            })
            .then(() => {
                this.getEmployees()
            })
    };

    handleEmployeeDelete = function (row) {
        let confirm = window.confirm(`Are you sure you want to delete employee: ${row.name} with id ${row.id}?`);
        if (confirm)
            fetch(`http://localhost:8080/api/employees/${row.id}`, {method: "DELETE"})
                .then(() => this.getEmployees());
    };

    closeEmployeeForm = function () {
        this.setState({isEmployeeFormVisible: false})
    };

    openEmployeeForm = function (row = null) {
        this.setState({id: row ? row.id : null, isEmployeeFormVisible: true})
    };

    render() {
        const {
            employees
        } = this.state;

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                headerClassName: 'table-header',
                width: 60
            },
            {
                Header: 'Name',
                accessor: 'name',
                headerClassName: 'table-header'
            },
            {
                Header: 'Code',
                accessor: 'code',
                headerClassName: 'table-header'
            },
            {
                Header: 'Profession',
                accessor: 'profession',
                headerClassName: 'table-header'
            },
            {
                Header: 'City',
                accessor: 'city',
                headerClassName: 'table-header'
            },
            {
                Header: 'Branch',
                accessor: 'branch',
                headerClassName: 'table-header'
            },
            {
                id: 'assigned',
                Header: 'Assigned',
                accessor: 'assigned',
                Cell: props => <span>{props.value ? "Yes" : "No"}</span>,
                headerClassName: 'table-header',
                width: 100
            },
        ]
        return (
            <div className={this.props.className}>
                <h1>Plexxis Employees</h1>
                <button onClick={() => this.openEmployeeForm(null)}>
                    Add New
                </button>
                <button className={'row-modifier'}
                        disabled={this.state.selectedIndex === null}
                        onClick={() => this.openEmployeeForm(this.state.selectedRow)}>
                    Edit
                </button>
                <button className={'row-modifier'}
                        disabled={this.state.selectedIndex === null}
                        onClick={() => this.handleEmployeeDelete(this.state.selectedRow)}>
                    Delete
                </button>
                <ReactTable data={employees} columns={columns} defaultPageSize={10}
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {
                                            this.setState({
                                                selectedIndex: rowInfo.index,
                                                selectedRow: rowInfo.row
                                            })
                                        },
                                        style: {
                                            background: rowInfo.index === this.state.selectedIndex ? '#00afec' : 'white',
                                            color: rowInfo.index === this.state.selectedIndex ? 'white' : 'black'
                                        }
                                    }
                                } else {
                                    return {}
                                }
                            }}
                />
                {
                    this.state.isEmployeeFormVisible &&
                    <EmployeeForm id={this.state.id} handleSave={this.handleSave} handleClose={this.closeEmployeeForm}/>
                }
            </div>
        );
    }
}

const StyledEmployeeList = styled(EmployeeList)`
  width: 80%;
  margin: auto;
`


export default StyledEmployeeList;
