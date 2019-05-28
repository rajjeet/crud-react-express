const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAll);
router.get('/:id', employeeController.findById);
router.delete('/:id', employeeController.deleteById);
router.post('/', employeeController.insertSingle);
router.put('/:id', employeeController.updateSingle);

module.exports = router;