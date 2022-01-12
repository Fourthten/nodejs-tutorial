const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderScheduleSchema = new Schema({
    date: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    schedule: [],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, { 
    versionKey: false 
});

const orderSchedule = mongoose.model('orderschedule', orderScheduleSchema);

module.exports = orderSchedule;