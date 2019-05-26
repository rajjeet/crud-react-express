import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import EmployeeForm from "./EmployeeForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            id: null,
            isEmployeeFormVisible: false
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleEmployeeDelete = this.handleEmployeeDelete.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
        this.openEmployeeForm = this.openEmployeeForm.bind(this)
        this.closeEmployeeForm = this.closeEmployeeForm.bind(this);
    }

    componentWillMount = () => {
        this.getEmployees()
    };

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

    handleEmployeeDelete = function (event, row) {
        let confirm = window.confirm(`Are you sure you want to delete employee ${row.name} with id ${row.id}?`);
        if (confirm)
            fetch(`http://localhost:8080/api/employees/${row.id}`, {method: "DELETE"})
                .then(() => this.getEmployees());
    };

    closeEmployeeForm = function () {
        this.setState({isEmployeeFormVisible: false})
    };

    openEmployeeForm = function () {
        this.setState({id: null, isEmployeeFormVisible: true})
    };


    render() {
        const {
            employees
        } = this.state;

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Code',
                accessor: 'code',
            },
            {
                Header: 'Profession',
                accessor: 'profession',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Branch',
                accessor: 'branch',
            },
            {
                id: 'assigned',
                Header: 'Assigned',
                accessor: 'assigned',
                Cell: props => <span>{props.value ? "Yes" : "No"}</span>,
            },
            {
                Header: '',
                id: 'edit-button',
                Cell: ({row}) => <button onClick={() => {
                    this.setState({id: row.id, isEmployeeFormVisible: true})

                }
                }>Edit</button>
            },
            {
                Header: '',
                id: 'delete-button',
                Cell: ({row}) => <button onClick={(e) => this.handleEmployeeDelete(e, row)}>X</button>
            }
        ]
        return (
            <div className="App">
                <h1>Plexxis Employees</h1>
                <button onClick={this.openEmployeeForm}>Add New Employee</button>
                <ReactTable data={employees} columns={columns} defaultPageSize={10}/>
                {
                    this.state.isEmployeeFormVisible &&
                    <EmployeeForm id={this.state.id} handleSave={this.handleSave} handleClose={this.closeEmployeeForm} />
                }
            </div>
        );
    }
}

export default App;
