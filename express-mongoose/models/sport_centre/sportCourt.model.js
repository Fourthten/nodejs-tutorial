const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courtSchema = new Schema({
    court_name: {
        type: String,
        required: true 
    },
    court_cat: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    photo_url: [String],
    court: []
}, { 
    versionKey: false 
});

const court = mongoose.model('court', courtSchema);

module.exports = court;