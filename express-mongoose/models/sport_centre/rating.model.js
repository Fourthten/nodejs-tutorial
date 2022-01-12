const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    userid: {
        type: String
    },
    rat_val: {
        type: Number
    }
}, { 
    _id: false,
    versionKey: false 
});

const rating = mongoose.model('rating', ratingSchema);

module.exports = rating;