let mysql = require('mysql')
let dbconfig = require('./dbconfig').config;

let state = {
    pool: null
};

const connect = done => {
    state.pool = mysql.createPool(dbconfig);
    done();
};

const get = () => state.pool;

module.exports = {
    connect,
    get
};


