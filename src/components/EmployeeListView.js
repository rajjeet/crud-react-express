import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import EmployeeForm from "./EmployeeFormContainer";
import styled from 'styled-components';
import Button from "./Button";
import PropTypes from 'prop-types';

const nullModifier = props => props.value || <span style={{color: 'gray', fontStyle: 'italic'}}>&lt;none&gt;</span>;

const ButtonCell = ({color, text}) => {
    return <Button style={{
        backgroundColor: color,
        color: "white",
        border: "none",
        fontWeight: "bold",
        margin: 0,
        fontSize: ".8em",
        padding: ".3em"
    }}>{text}</Button>;
}

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
        headerClassName: 'table-header',
        Cell: nullModifier
    },
    {
        Header: 'Code',
        accessor: 'code',
        headerClassName: 'table-header',
        Cell: nullModifier
    },
    {
        Header: 'Profession',
        accessor: 'profession',
        headerClassName: 'table-header',
        Cell: nullModifier
    },
    {
        Header: 'City',
        accessor: 'city',
        headerClassName: 'table-header',
        Cell: nullModifier
    },
    {
        Header: 'Branch',
        accessor: 'branch',
        headerClassName: 'table-header',
        Cell: nullModifier
    },
    {
        id: 'assigned',
        Header: 'Assigned',
        accessor: 'assigned',
        Cell: props => props.value ?
            <ButtonCell color={'seagreen'} text={'Yes'}/>
            : <ButtonCell color={'darkred'} text={'No'}/>,
        headerClassName: 'table-header',
        width: 100
    },
];

const EmployeeListView = ({
                              className, selectedIndex, selectedRow, getTrProps,
                              employees, id, handleSave, closeEmployeeForm, isEmployeeFormVisible, openEmployeeForm,
                              handleEmployeeDelete
                          }) => (
    <div className={className}>
        <h1>Plexxis Employees</h1>
        <Button onClick={() => openEmployeeForm(null)}>
            Add
        </Button>
        <Button className={'row-modifier'}
                disabled={selectedIndex === null}
                onClick={() => openEmployeeForm(selectedRow)}>
            Edit
        </Button>
        <Button className={'row-modifier'}
                disabled={selectedIndex === null}
                onClick={() => handleEmployeeDelete(selectedRow)}>
            Delete
        </Button>
        <ReactTable data={employees} columns={columns} defaultPageSize={10}
                    getTrProps={getTrProps}
        />
        {
            isEmployeeFormVisible &&
            <EmployeeForm id={id} handleSave={handleSave} handleClose={closeEmployeeForm}/>
        }
    </div>
);

EmployeeListView.propTypes = {
    selectedIndex: PropTypes.number,
    selectedRow: PropTypes.object,
    getTrProps: PropTypes.func,
    employees: PropTypes.array,
    id: PropTypes.number,
    handleSave: PropTypes.func,
    closeEmployeeForm: PropTypes.func,
    isEmployeeFormVisible: PropTypes.bool,
    openEmployeeForm: PropTypes.func,
    handleEmployeeDelete: PropTypes.func

};


const StyledEmployeeListView = styled(EmployeeListView)`
  width: 80%;
  margin: auto;
  > button {
      :disabled {
          opacity: .3;
          transform: none;
      }
  }
  > button:first-of-type {
    background-color: green;
    color: white;
  }  
  > button:nth-of-type(2) {
    background-color: darkgoldenrod;
    color: white;
    
  }  
  > button:nth-of-type(3) {
    background-color: darkred;
    color: white;
  }  
`


export default StyledEmployeeListView;
