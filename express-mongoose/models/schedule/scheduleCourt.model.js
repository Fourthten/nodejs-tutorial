const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    scheduleid: {
        type: String,
        required: true
    },
    placeid: {
        type: String,
        required: true
    },
    courtid: {
        type: String,
        required: true
    },
    courtdetailid: {
        type: String,
        required: true
    },
    ordertime: [Number]
}, { 
    _id: false,
    versionKey: false 
});

const scheduleCourt = mongoose.model('schedulecourt', scheduleSchema);

module.exports = scheduleCourt;