const db = require('../db');

const findEmployee = (id, done) => db.get().query(`
    SELECT e.id, e.name, c.name as code, p.name as profession, ci.name as city, b.name as branch, assigned     
    FROM employee e 
        LEFT JOIN code c on e.codeId = c.id
        LEFT JOIN profession p on e.professionId = p.id
        LEFT JOIN city ci on e.cityId = ci.id
        LEFT JOIN branch b on e.branchId = b.id
    WHERE e.id = ?`,
    id, (err, result) => {
        if (err) {
            console.log("ERROR TIME", err)
            return done(err);
        }
        done(null, result[0])
    });

const insertEmployee = (employee, done) => db.get().query("INSERT INTO employee (name) VALUES (?)", employee.name, err => {
    if (err) return done(err);
    done(null);
});

const updateEmployee = (employee, done) => db.get().query("UPDATE employee SET name = ? WHERE id = ?", [employee.name, employee.id], err => {
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
