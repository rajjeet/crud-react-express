import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

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
            <div className={this.props.className}>
                <div>
                    <div>
                        <h3>Employee</h3>
                        <button onClick={this.props.handleClose}>X</button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type={'hidden'} name={'id'} value={this.state.id}/>
                        <div>
                            <label htmlFor={'name'}>Name: </label>
                            <input name={'name'} type={'text'} value={this.state.name}
                                   placeholder={'Enter the first and last name'}
                                   onChange={this.handleChange}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor={'code'}>Code: </label>
                            <input name={'code'} type={'text'} value={this.state.code}
                                   placeholder={'Enter the employee code'}
                                   onChange={this.handleChange}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor={'profession'}>Profession: </label>
                            <input name={'profession'} type={'text'} value={this.state.profession}
                                   placeholder={'Enter the current profession'}
                                   onChange={this.handleChange}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor={'city'}>City: </label>
                            <input name={'city'} type={'text'} value={this.state.city}
                                   placeholder={'Enter the residential city'}
                                   onChange={this.handleChange}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor={'branch'}>Branch: </label>
                            <input name={'branch'} type={'text'} value={this.state.branch}
                                   placeholder={'Enter the primary company branch'}
                                   onChange={this.handleChange}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor={'assigned'}>Assigned: </label>
                            <input name={'assigned'} type={'checkbox'} checked={this.state.assigned}
                                   onChange={this.handleChange}
                            />
                        </div>
                        <button type={'submit'} >Save</button>
                        <button onClick={this.handleReset}>Reset</button>
                    </form>
                </div>
            </div>
        );
    }
}

EmployeeForm.propTypes = {
    handleSave: PropTypes.func.isRequired,
    id: PropTypes.number,
    handleClose: PropTypes.func.isRequired
};

const StyledEmployeeForm = styled(EmployeeForm)`
    
      transition: all .3s ease;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      position: absolute;
      background-color: rgba(0, 0, 0, .5);
      top: 0;
      left: 0;
    
     > div {
        z-index: 2;
        width: 50%;
        padding: 1em;
        margin: 2em auto;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: white;
        border-radius: 5px;
    }
    
    
    form {
      > div {
          margin-bottom: .5em;
        }
        label {
           width: 25%;
           font-size: 1.1em;
           display: inline-block;
           text-align: right;
           padding-right: .5em;
           box-sizing: border-box;
           vertical-align: center;
        }
        input {
          box-sizing: border-box;
          width: 75%;
          font-size: 1.1em;
          padding: .2em;
          border-radius: 5px;
          border: .7px solid darkgray;
        }
        input[type="checkbox"]{
          width: 30px;
          height: 30px;
          :hover {
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          }
        }
        button {
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          font-size: 1.3em;
          border-radius: 5px;
          margin:0 0;
          box-sizing: border-box;
          cursor: pointer;
          :hover {
            transform:  translateY(-2px);
            transition: .3s ease;
          }
        }
        button:first-of-type {
          padding: .25em 0;
          width: 60%;
          background-color: darkgreen;
          color: white;
        }
        button:nth-of-type(2) {
          padding: .25em 0;
          width: 40%;
          background-color: darkgray;
          color: white;
        }
    }
    > div > div:first-of-type {
      background-color: lightgrey;
      border-radius: 5px;
      padding: auto 4em;
      margin: 1em;
      h3 {
          display: inline-block;
          width: 90%;
          padding-left: 1em;
          box-sizing: border-box;
        }
      button {
        margin: 1em;
        background-color: red;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    
    
    `;

export default StyledEmployeeForm;