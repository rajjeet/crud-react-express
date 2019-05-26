import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import EmployeeFormView from "./EmployeeFormView";

class EmployeeFormContainer extends Component {
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
        this.onEsc = this.onEsc.bind(this);
    }

    componentWillMount() {
        this.loadEmployee(this.props.id)
        document.addEventListener("keydown", this.onEsc)
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.id !== this.props.id)
            this.loadEmployee(nextProps.id)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEsc)
    }

    onEsc = function (event) {
        if (event.keyCode === 27) this.props.handleClose()
    };

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
        return <EmployeeFormView
            className={this.props.className}
            handleClose={this.props.handleClose}
            handleReset={this.handleReset}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            id={this.state.id}
            name={this.state.name} code={this.state.code} profession={this.state.profession}
            city={this.state.city} branch={this.state.branch} assigned={this.state.assigned}
        />;
    }
}

EmployeeFormContainer.propTypes = {
    handleSave: PropTypes.func.isRequired,
    id: PropTypes.number,
    handleClose: PropTypes.func.isRequired
};

const StyledEmployeeForm = styled(EmployeeFormContainer)`
    
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
        top: 10%;
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
          height: 2em;
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
        button:first-of-type {
          padding: .25em 0;
          width: 55%;
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
      position: relative;
      h3 {
          display: inline-block;
          width: 80%;
          padding-left: 1em;
          box-sizing: border-box;
        }
      button {
        background-color: red;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        float: right;
        position: absolute;
        top: 0;
        right: 0;
        margin: .5em;
      }
    }
    `;

export default StyledEmployeeForm;