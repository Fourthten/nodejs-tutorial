const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: '43200'
    }
}, { 
    versionKey: false 
});

const resetPassword = mongoose.model('reset_password', resetPasswordSchema);

module.exports = resetPassword;