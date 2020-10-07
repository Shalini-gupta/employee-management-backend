var mongoose = require('mongoose');
var Counters = mongoose.Schema({
    _id: {
        type: String,
        trim: true
    },
    sequenceValue: {
        type: Number,
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('counters', Counters);
