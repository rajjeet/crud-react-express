let employees = require('./data/employees.json');

const findEmployee = id => employees.find(employee => employee.id === id);

const insertEmployee = employee => employees = [...employees, employee];

const updateEmployee = employee => {
    employees = employees.map(e => {
        if (e.id !== employee.id) return e;
        return employee;
    });
};

const deleteEmployee = id => employees = employees.filter(employee => employee.id !== id);

const getAllEmployees = () => employees;

module.exports = {
    findEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees
}
