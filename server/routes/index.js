const express = require('express');
const router = express.Router();
const employeeRouter = require('./employees');
const optionsRouter = require('./options')

router.use('/employees', employeeRouter);
router.use('/options', optionsRouter);

router.get('/', (req, res) => res.status(200).json({message: 'Connected'}));

module.exports = router;