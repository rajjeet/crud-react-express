const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mockApi = require('./dal/employee')
const db = require('./db');

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
        mockApi.getAllEmployees((err, employees) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.status(200);
            res.send(JSON.stringify(employees, null, 2));
        });
    })

    .get('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        mockApi.findEmployee(id, (err, employee) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify(employee, null, 2));
        })
    })

    .delete('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        mockApi.deleteEmployee(id, err => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.status(200);
            res.json({message: 'Successfully deleted!'});
        });
    })

    .post('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        mockApi.findEmployee(id, (err, employee) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            if (employee) {
                res.status(400);
                res.json({message: `Employee with: ${id} already exists`})
            } else {
                mockApi.insertEmployee(req.body, err => {
                    if (err) {
                        res.status(500);
                        res.json(err);
                    }
                    res.status(200);
                    res.json({message: 'Successfully inserted!'});
                });
            }
        })

    })

    .put('/api/employees/:id', (req, res) => {
        let id = parseInt(req.params.id);
        mockApi.findEmployee(id, (err, employee) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            if (employee) {
                mockApi.updateEmployee(req.body, err => {
                    if (err) {
                        res.status(500);
                        res.json(err);
                    }
                    res.status(200);
                    res.json({message: `Successfully updated!`});
                });
            } else {
                res.status(400);
                res.json({message: `'Employee id: ${id} doesn't exists'`})
            }
        })
    });

db.connect(err => {
    if (err) {
        console.log('Unable to connect to MySQL')
        process.exit(1)
    } else {
        app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))
    }
});
