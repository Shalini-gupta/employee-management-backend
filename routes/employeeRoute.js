const router = require('express').Router()
const employeeController = require('../controllers/employeeController');

router.get('/listEmployee', employeeController.listEmployee);
router.post('/addEmployee', employeeController.addEmployee);
router.post('/updateEmployee', employeeController.updateEmployee);
router.get('/getEmployee/:id', employeeController.getEmployee);
router.get('/deleteEmployee/:id', employeeController.deleteEmployee);
router.post('/searchEmployee', employeeController.searchEmployee);

module.exports = router;