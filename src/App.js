import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import EmployeeForm from "./EmployeeForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
        this.handleEmployeeDelete = this.handleEmployeeDelete.bind(this);
    }

    componentWillMount = () => {
        fetch('http://localhost:8080/api/employees')
            .then(response => response.json())
            .then(employees => this.setState({employees}))
    };

    handleEmployeeChange = function (employee) {
        this.setState(
            {
                employees: this.state.employees.map(e => {
                    if (e.id === employee.id) return employee;
                    return e
                })
            }
        )
    };

    handleEmployeeDelete = function (id) {
        fetch(`http://localhost:8080/api/employees/${id}`, {method: 'DELETE'})
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
            }
        ]
        return (
            <div className="App">
                <h1>Plexxis Employees</h1>
                <button onClick={() => this.handleEmployeeDelete(1)}>delete 1</button>
                <ReactTable data={employees} columns={columns}/>
                <EmployeeForm id={1} handleEmployeeChange={this.handleEmployeeChange}/>
            </div>
        );
    }
}

export default App;
