const dalEmployees = require('../dal/employee')

const getAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    dalEmployees.getAllEmployees((err, employees) => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.status(200);
        res.send(JSON.stringify(employees, null, 2));
    });
};

const findById = (req, res) => {
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
};

const deleteById = (req, res) => {
    let id = parseInt(req.params.id);
    dalEmployees.deleteEmployee(id, err => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.status(200);
        res.json({message: 'Successfully deleted!'});
    });
};

const insertSingle = (req, res) => {
    dalEmployees.insertEmployee(req.body, err => {
        if (err) {
            res.status(500);
            res.json(err);
        }
        res.status(200);
        res.json({message: 'Successfully inserted!'});
    });
};

const updateSingle = (req, res) => {
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
};

module.exports = {
    getAll,
    findById,
    deleteById,
    insertSingle,
    updateSingle
};