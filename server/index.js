const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
let employees = require('./data/employees.json');


app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();

});

app
    .get('/api/employees', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(employees, null, 2));
    })

    .get('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        let employee = employees.find(employee => employee.id === id);
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(employee, null, 2));
    })

    .delete('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        employees = employees.filter(employee => employee.id !== id);
        res.status(200);
        res.json({message: 'Successfully deleted!'});
    })

    .post('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        let employee = employees.find(employee => employee.id === id);
        if (employee) {
            res.status(400);
            res.json({message: `Employee with: ${id} already exists`})
        } else {
            employees = [...employees, req.body];
            res.status(200);
            res.json({message: 'Successfully inserted!'});
        }
    })

    .put('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        let employee = employees.find(employee => employee.id === id);
        if (employee) {
            employees = employees.map(e => {
                if (e.id !== id) return e;
                return req.body;
            });
            res.status(200);
            res.json({message: `Successfully updated!`});
        } else {
            res.status(400);
            res.json({message: `'Employee id: ${id} doesn't exists'`})
        }
    });

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))