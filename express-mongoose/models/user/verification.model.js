const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const verificationSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    verify_code: {
        type: String,
        required: true
    },
    expired: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { 
    versionKey: false 
});

const verify = mongoose.model('verification', verificationSchema);

module.exports = verify;