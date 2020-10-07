var mongoose = require('mongoose');
var Employee = mongoose.Schema({
    employeeId: {
        type: Number,
    },
    name: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    address1: {
        type: String,
        trim: true
    },
    earnings: {
        type: String,
        trim: true
    },
    deduction: {
        type: String,
        trim: true
    },
    totalPay: {
        type: String,
        trim: true
    },
    qualification: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('employes', Employee);
