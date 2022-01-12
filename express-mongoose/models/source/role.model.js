const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    role_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
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

const role = mongoose.model('role', roleSchema);

module.exports = role;