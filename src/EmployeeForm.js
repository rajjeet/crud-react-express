import React, {Component} from 'react'
import PropTypes from 'prop-types'

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            code: '',
            profession: '',
            city: '',
            branch: '',
            assigned: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        fetch('http://localhost:8080/api/employees')
            .then(response => response.json())
            .then(employees => {
                let employee = employees.find(employee => employee.id === this.props.id)
                if (employee)
                    this.setState({
                        id: employee.id,
                        name: employee.name,
                        code: employee.code,
                        profession: employee.profession,
                        city: employee.city,
                        branch: employee.branch,
                        assigned: employee.assigned
                    })
            })
    }

    handleChange = function (event) {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = function (event) {
        event.preventDefault()
        const {name, code, profession, city, branch, assigned} = this.state;
        this.props.handleEmployeeChange({
            id: this.props.id, name, code, profession, city, branch, assigned
        })
    };

    render() {
        return (
            <div>
                <h3>Add Employee</h3>
                <form>
                    <label>Name: <input name={'name'} type={'text'} value={this.state.name} onChange={this.handleChange}/></label>
                    <br />
                    <label>Code: <input name={'code'} type={'text'} value={this.state.code} onChange={this.handleChange}/></label>
                    <br />
                    <label>Profession: <input name={'profession'} type={'text'} value={this.state.profession} onChange={this.handleChange}/></label>
                    <br />
                    <label>City: <input name={'city'} type={'text'} value={this.state.city} onChange={this.handleChange}/></label>
                    <br />
                    <label>Branch: <input name={'branch'} type={'text'} value={this.state.branch} onChange={this.handleChange}/></label>
                    <br />
                    <label>Assigned: <input name={'assigned'} type={'checkbox'} checked={this.state.assigned} onChange={this.handleChange}/></label>
                    <br />
                    <button name={'submit'} onClick={this.handleSubmit}>Add</button>
                </form>
            </div>
        );
    }
}

EmployeeForm.propTypes = {
    handleEmployeeChange: PropTypes.func.isRequired,
    id: PropTypes.number
}

export default EmployeeForm;