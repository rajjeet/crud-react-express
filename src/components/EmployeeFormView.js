import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Button from './Button'

const EmployeeFormView = ({
                              className, handleClose, handleReset, handleChange, handleSubmit,
                              id, name, code, profession, city, branch, assigned
                          }) => (
    <div className={className} onClick={handleClose}>
        <div onClick={e => e.stopPropagation()}>
            <div>
                <h3>Employee</h3>
                <Button onClick={handleClose}>&times;</Button>
            </div>
            <form onSubmit={handleSubmit}>
                <input type={'hidden'} name={'id'} value={id}/>
                <div>
                    <label htmlFor={'name'}>Name: </label>
                    <input name={'name'} type={'text'} value={name}
                           placeholder={'Enter the first and last name'}
                           onChange={handleChange}
                           required
                    />
                </div>
                <div>
                    <label htmlFor={'code'}>Code: </label>
                    <input name={'code'} type={'text'} value={code}
                           placeholder={'Enter the employee code'}
                           onChange={handleChange}
                           required
                    />
                </div>
                <div>
                    <label htmlFor={'profession'}>Profession: </label>
                    <input name={'profession'} type={'text'} value={profession}
                           placeholder={'Enter the current profession'}
                           onChange={handleChange}
                           required
                    />
                </div>
                <div>
                    <label htmlFor={'city'}>City: </label>
                    <input name={'city'} type={'text'} value={city}
                           placeholder={'Enter the residential city'}
                           onChange={handleChange}
                           required
                    />
                </div>
                <div>
                    <label htmlFor={'branch'}>Branch: </label>
                    <input name={'branch'} type={'text'} value={branch}
                           placeholder={'Enter the primary company branch'}
                           onChange={handleChange}
                           required
                    />
                </div>
                <div>
                    <label htmlFor={'assigned'}>Assigned: </label>
                    <input name={'assigned'} type={'checkbox'} checked={assigned}
                           onChange={handleChange}
                    />
                </div>
                <Button type={'submit'}>Save</Button>
                <Button onClick={handleReset}>Reset</Button>
            </form>
        </div>
    </div>
);

EmployeeFormView.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    profession: PropTypes.string,
    city: PropTypes.string,
    branch: PropTypes.string,
    assigned: PropTypes.bool
};

const StyledEmployeeFormView = styled(EmployeeFormView)`
    
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

export default StyledEmployeeFormView;