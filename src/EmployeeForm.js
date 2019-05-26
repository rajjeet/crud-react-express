import React, {Component} from 'react'
import PropTypes from 'prop-types'

class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Math.floor(Math.random() * 10000),
            name: '',
            code: '',
            profession: '',
            city: '',
            branch: '',
            assigned: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadEmployee = this.loadEmployee.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentWillMount() {
        this.loadEmployee(this.props.id)
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.id !== this.props.id)
            this.loadEmployee(nextProps.id)
    }

    loadEmployee = function (id) {

        if (id === null) {
            return;
        }

        fetch(`http://localhost:8080/api/employees/${id}`)
            .then(response => response.json())
            .then(employee => {
                if (employee)
                    this.setState({
                        id: employee.id,
                        name: employee.name,
                        code: employee.code,
                        profession: employee.profession,
                        city: employee.city,
                        branch: employee.branch,
                        assigned: employee.assigned
                    });
                else
                    this.handleReset()
            })
    };

    handleReset = function (event) {
        event && event.preventDefault()
        this.setState({
            id: Math.floor(Math.random() * 10000),
            name: '',
            code: '',
            profession: '',
            city: '',
            branch: '',
            assigned: false
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
        event && event.preventDefault()
        const {id, name, code, profession, city, branch, assigned} = this.state;
        this.props.handleSave({
            id, name, code, profession, city, branch, assigned
        })
    };

    render() {
        return (
            <div>
                <h3>Add Employee</h3>
                <form>
                    <input type={'hidden'} name={'id'} value={this.state.id} />
                    <label>Name: <input name={'name'} type={'text'} value={this.state.name}
                                        onChange={this.handleChange}/></label>
                    <br/>
                    <label>Code: <input name={'code'} type={'text'} value={this.state.code}
                                        onChange={this.handleChange}/></label>
                    <br/>
                    <label>Profession: <input name={'profession'} type={'text'} value={this.state.profession}
                                              onChange={this.handleChange}/></label>
                    <br/>
                    <label>City: <input name={'city'} type={'text'} value={this.state.city}
                                        onChange={this.handleChange}/></label>
                    <br/>
                    <label>Branch: <input name={'branch'} type={'text'} value={this.state.branch}
                                          onChange={this.handleChange}/></label>
                    <br/>
                    <label>Assigned: <input name={'assigned'} type={'checkbox'} checked={this.state.assigned}
                                            onChange={this.handleChange}/></label>
                    <br/>
                    <button onClick={this.handleSubmit}>Save</button>
                    <button onClick={this.handleReset}>Reset</button>
                </form>
            </div>
        );
    }
}

EmployeeForm.propTypes = {
    handleSave: PropTypes.func.isRequired,
    id: PropTypes.number
};

export default EmployeeForm;