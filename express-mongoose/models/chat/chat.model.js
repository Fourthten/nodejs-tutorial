const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        default: ''
    },
    status: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true,
        default: Date.now().valueOf()
    }
}, { 
    versionKey: false 
});

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;