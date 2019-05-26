import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import EmployeeForm from "./EmployeeFormContainer";
import styled from 'styled-components';
import Button from "./Button";
import EmployeeListView from "./EmployeeListView";

class EmployeeListContainer extends React.Component {
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
        this.getTrProps = this.getTrProps.bind(this);
    }

    componentWillMount = () => {
        this.getEmployees()
        document.addEventListener('click', this.deselectRow)
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.deselectRow)
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

    openEmployeeForm = function (row = null) {
        this.setState({id: row ? row.id : null, isEmployeeFormVisible: true})
    };

    closeEmployeeForm = function () {
        this.setState({isEmployeeFormVisible: false})
    };

    deselectRow = function (e) {
        if (!e.target.className.match(/rt-td|row-modifier/) && !this.state.isEmployeeFormVisible)
            this.setState({selectedIndex: null, selectedId: null})
    };

    getTrProps = function (state, rowInfo) {
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
    }

    render() {
        return (
            <EmployeeListView
                selectedIndex={this.state.selectedIndex}
                selectedRow={this.state.selectedRow}
                getTrProps={this.getTrProps}
                employees={this.state.employees}
                id={this.state.id}
                handleSave={this.handleSave}
                closeEmployeeForm={this.closeEmployeeForm}
                isEmployeeFormVisible={this.state.isEmployeeFormVisible}
                openEmployeeForm={this.openEmployeeForm}
                handleEmployeeDelete={this.handleEmployeeDelete}
            />
        );
    }
}

export default EmployeeListContainer;
