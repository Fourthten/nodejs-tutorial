const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transSchema = new Schema({
    midtransid: {
        type: String,
        default: ''
    },
    customer: {
        userid: {
            type: String,
            required: true
        },
        booking_name: {
            type: String,
            required: true
        },
        booking_phone: {
            type: String,
            required: true
        },
        note: {
            type: String,
            default: ''
        },
    },
    owner: {
        userid: {
            type: String,
            required: true
        },
        placeid: {
            type: String,
            required: true
        },
    },
    court: [],
    booking_date: {
        type: Number,
        required: true
    },
    price_total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true,
        default: new Date().valueOf()
    },
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

const transaction = mongoose.model('transaction', transSchema);

module.exports = transaction;