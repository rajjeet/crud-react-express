const db = require('../db');

const findEmployee = (id, done) => db.get().query(`
    SELECT e.id, e.name, c.id as code, p.id as profession, ci.id as city, b.id as branch, assigned     
    FROM employee e 
        LEFT JOIN code c on e.codeId = c.id
        LEFT JOIN profession p on e.professionId = p.id
        LEFT JOIN city ci on e.cityId = ci.id
        LEFT JOIN branch b on e.branchId = b.id
    WHERE e.id = ?`,
    id, (err, result) => {
        if (err) {
            return done(err);
        }
        done(null, result[0])
    });

const insertEmployee = (employee, done) => db.get().query(`
    INSERT INTO employee (
    name, codeId, professionId, cityId, branchId, assigned
    ) VALUES (?, ?, ?, ?, ?, ?)
    `, [employee.name, employee.code, employee.profession, employee.city, employee.branch, employee.assigned],
    err => {
        if (err) return done(err);
        done(null);
    });


const updateEmployee = (employee, done) => db.get().query(`
    UPDATE employee 
    SET 
        name = ?,
        codeId = ?,
        professionId = ?,
        cityId = ?,
        branchId = ?,
        assigned = ?     
    WHERE id = ?`
    , [employee.name, employee.code, employee.profession, employee.city, employee.branch, employee.assigned, employee.id],
    err => {
        if (err) return done(err);
        done(null);
    });

const deleteEmployee = (id, done) => db.get().query("DELETE FROM employee WHERE id = ?", id, err => {
    if (err) return done(err)
    done();
});

const getAllEmployees = done => db.get().query(`
    SELECT e.id, e.name, c.name as code, p.name as profession, ci.name as city, b.name as branch, assigned     
    FROM employee e 
        LEFT JOIN code c on e.codeId = c.id
        LEFT JOIN profession p on e.professionId = p.id
        LEFT JOIN city ci on e.cityId = ci.id
        LEFT JOIN branch b on e.branchId = b.id
    ORDER BY e.id    
`, (err, result) => {
    if (err) return done(err);
    done(null, result);
});

module.exports = {
    findEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees
}
