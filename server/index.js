const express = require('express')
const cors = require('cors')
const app = express()
let employees = require('./data/employees.json');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.get('/api/employees', cors(corsOptions), (req, res, next) => {
  console.log('/api/employees');
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(employees, null, 2));
})

app.delete('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  let id = parseInt(req.params.id);
  console.log(`/api/employees/${id}`);
  employees = employees.filter(employee => employee.id !== id);
  res.status(200);
  res.json({message: 'Successfully deleted!'});
});

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))