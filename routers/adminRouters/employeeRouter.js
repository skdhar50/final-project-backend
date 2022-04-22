const router = require("express").Router();
const { employeeList, showEmployee, createEmployee, updateEmployee, removeEmployee } = require("../../controllers/adminControllers/employeeController");

router.get('/', employeeList);
router.post('/',createEmployee);
router.get('/:id', showEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', removeEmployee)

module.exports = router;
