const express = require('express')
const cors = require('cors')
const app = express()
let employees = require('./data/employees.json');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.get('/api/employees', cors(corsOptions), (req, res) => {
  console.log('/api/employees');
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(employees, null, 2));
})

app.delete('/api/employees/:id', cors(corsOptions), (req, res) => {
  console.log(`/api/employees/${req.params.id}`);
  employees = employees.filter(employee => employee.id === req.params.id);
  res.status(200);
  res.json({message: 'Successfully deleted!'});
});

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))