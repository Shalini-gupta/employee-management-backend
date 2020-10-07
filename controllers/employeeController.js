const Employee = require('../models/employeeModel');
const counterModel = require('../models/counterModel');
const response = require('../utils/response');

const listEmployee = async (req, res) => {
    try {
        response.log("Request for list employee is=============>", req.params)
        let result = await Employee.find({});
        response.responseHandlerWithData(res, 200, "Employee list found successfully", result)
    } catch (error) {
        response.log("listEmployee error is ==========>", error)
        response.responseHandlerWithData(res, 500, "Internal Server Error")
    }
}

const addEmployee = async (req, res) => {
    try {
        response.log('Request for add employee request is===============>', req.body)
        req.checkBody('name', 'Please enter the name').notEmpty();
        req.checkBody('address', 'Please enter the address').notEmpty();
        const errors = req.validationErrors()
        if (errors) {
            let error = errors[0].msg;
            response.log("Field is missing")
            return response.responseHandlerWithMessage(res, 400, error);
        }
        let checkEmployee = await Employee.findOne({ name: req.body.name })
        if (checkEmployee) {
            response.responseHandlerWithMessage(res, 405, "Employee name already exists");
            return
        }
        let Obj = new Employee({
            employeeId: await getNextSequenceValue("employeeId"),
            name: req.body.name,
            address: req.body.address,
            address1: req.body.address1,
            earnings: req.body.earnings,
            deduction: req.body.deduction,
            totalPay: req.body.totalPay,
            qualification: req.body.qualification,
        })
        let data = await Obj.save()
        response.responseHandlerWithData(res, 200, "Employee has been added sucessfully", data);
    } catch (error) {
        response.log("addEmployee error is ==========>", error)
        return response.responseHandlerWithData(res, 500, "Internal Server Error");
    }
}

const updateEmployee = async (req, res) => {
    try {
        response.log("Request for edit employee is=============>", req.body)
        req.checkBody('id', 'Please enter the id').notEmpty();
        req.checkBody('name', 'Please enter the name').notEmpty();
        req.checkBody('address', 'Please enter the address').notEmpty();
        const errors = req.validationErrors()
        if (errors) {
            let error = errors[0].msg;
            response.log("Field is missing")
            return response.responseHandlerWithMessage(res, 400, error);
        }
        await Employee.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true });
        response.responseHandlerWithData(res, 200, "Employee has been updated successfully")
    } catch (error) {
        console.log('---------------------------updateEmployee-------------------', error)
        return response.responseHandlerWithData(res, 500, "Internal Server Error");
    }
}

const getEmployee = async (req, res) => {
    try {
        response.log("Request for get employee is=============>", req.params)
        let result = await Employee.findOne({ _id: req.params.id });
        response.responseHandlerWithData(res, 200, "Employee detail found successfully", result)
    } catch (error) {
        response.log("getEmployee error is ==========>", error)
        response.responseHandlerWithData(res, 500, "Internal Server Error")
    }
}

const deleteEmployee = async (req, res) => {
    try {
        response.log("Request for delete employee is=============>", req.params.employeeId)
        await Employee.findByIdAndRemove({ _id: req.params.id });
        response.responseHandlerWithData(res, 200, "Employee has been deleted successfully")
    } catch (error) {
        response.log("deleteEmployee error is ==========>", error)
        response.responseHandlerWithData(res, 500, "Internal Server Error")
    }
}

const searchEmployee = async (req, res) => {
    try {
        response.log("Request for search employee is=============>", req.body)
        let result = await Employee.find({ employeeId: { $gte: req.body.fromEmpId, $lte: req.body.toEmpId } });
        response.responseHandlerWithData(res, 200, "Employee list found successfully", result)
    } catch (error) {
        response.log("searchemployee error is ==========>", error)
        response.responseHandlerWithData(res, 500, "Internal Server Error")
    }
}

async function getNextSequenceValue(sequenceName) {
    let sequenceDocument = await counterModel.findOne(
        { _id: sequenceName },
    );
    let data = sequenceDocument.sequenceValue + 1
    let newData = await counterModel.findByIdAndUpdate({ _id: sequenceDocument._id }, { $set: { sequenceValue: data } }, { new: true })
    return newData.sequenceValue;
}

module.exports = {
    listEmployee,
    addEmployee,
    updateEmployee,
    getEmployee,
    deleteEmployee,
    searchEmployee
}