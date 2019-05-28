const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const db = require('./db');
const indexRouter = require('./routes/index')
const employeeRouter = require('./routes/employees')

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/api', indexRouter);

db.connect(err => {
    if (err) {
        console.log('Unable to connect to MySQL')
        process.exit(1)
    } else {
        app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))
    }
});
