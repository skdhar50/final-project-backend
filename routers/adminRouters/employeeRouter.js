const router = require("express").Router();
const { employeeList, showEmployee, createEmployee, updateEmployee, removeEmployee } = require("../../controllers/adminControllers/employeeController");
const { addEmployeeValidator, validationHandler, updateEmployeeValidator } = require("../../middlewares/validator/validator");

router.get('/', employeeList);
router.post('/', addEmployeeValidator, validationHandler, createEmployee);
router.get('/:id', showEmployee);
router.put('/:id', updateEmployeeValidator, validationHandler, updateEmployee);
router.delete('/:id', removeEmployee)

module.exports = router;
