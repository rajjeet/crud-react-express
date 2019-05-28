const express = require('express');
const router = express.Router();
const dalEmployees = require('../dal/employee')

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    dalEmployees.getAllEmployees((err, employees) => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.status(200);
        res.send(JSON.stringify(employees, null, 2));
    });
});

router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    dalEmployees.findEmployee(id, (err, employee) => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(employee, null, 2));
    })
});


router.delete('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    dalEmployees.deleteEmployee(id, err => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.status(200);
        res.json({message: 'Successfully deleted!'});
    });
});

router.post('/', (req, res) => {
    console.log(req.body)
        dalEmployees.insertEmployee(req.body, err => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            res.status(200);
            res.json({message: 'Successfully inserted!'});
        });
    }
);

router.put('/:id', (req, res) => {
    let id = parseInt(req.params.id);
    dalEmployees.findEmployee(id, (err, employee) => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        if (employee) {
            dalEmployees.updateEmployee(req.body, err => {
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

module.exports = router;