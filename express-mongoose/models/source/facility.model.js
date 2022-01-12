const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    facility_name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
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

const facility = mongoose.model('facility', facilitySchema);

module.exports = facility;