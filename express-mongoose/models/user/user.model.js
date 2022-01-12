const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthdate: {
        type: Number,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo_url: {
        type: String,
        default: ''
    },
    api_token: {
        type: String,
    },
    device: {
        iat: {
            type: Number
        },
        deviceid: {
            type: String
        }
    },
    role_id: {
        type: String,
        required: true,
        default: 'customer'
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { 
    versionKey: false 
});

const user = mongoose.model('user', userSchema);

module.exports = user;