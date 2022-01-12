const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courtorderSchema = new Schema({
    courtorderid: {
        type: String,
        required: true
    },
    courtid: {
        type: String,
        required: true
    },
    detailcourtid: {
        type: String,
        required: true
    },
    time: [Number],
    courtname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { 
    _id: false,
    versionKey: false 
});

const courtorder = mongoose.model('courtorder', courtorderSchema);

module.exports = courtorder;