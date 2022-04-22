const { Employee } = require('../../models/employee');

let employee = {};

employee.employeeList = async (req, res) => {
    try {
        res.json({
            data: {
                employee: await Employee.find(),
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
employee.showEmployee = async (req, res) => {
    try {
        res.json({
            data: {
                employee: await Employee.findById(req.params.id)
            },
            message: "Successfully retrievied!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
employee.createEmployee = async (req, res) => {
    const newEmployee = new Employee({
        ...req.body
    })
    try {
        const employee = await newEmployee.save();
        res.json({
            data: {
                employee
            },
            message: "Employee was added successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
employee.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: { ...req.body } },
            { new: true }
        );
        res.json({
            data: {
                employee
            },
            message: "Employee was ted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}
employee.removeEmployee = async (req, res) => {
    try {
        res.json({
            data: {
                employee: await Employee.findByIdAndDelete(req.params.id),
            },
            message: "Employee was deleted successfully!",
            error: false,
        })
    } catch (err) {
        res.status(500).json({
            message: "There was a server side error!",
            error: true
        })
    }
}


module.exports = employee;