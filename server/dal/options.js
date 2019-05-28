const db = require('../db');

const getOption = tableName => {
    return (id, done) => db.get().query(`
    SELECT id, name   
    FROM ${tableName} 
        `,
        id, (err, result) => {
            if (err) {
                return done(err);
            }
            done(null, result[0])
        });
};

module.exports = {
    getCodes: getOption('code'),
    getProfessions: getOption('profession'),
    getCities: getOption('city'),
    getBranches: getOption('branch')
};