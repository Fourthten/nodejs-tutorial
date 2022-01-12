const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courtDetailSchema = new Schema({
    court_detailname: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    versionKey: false
});

const courtDetail = mongoose.model('courtdetail', courtDetailSchema);

module.exports = courtDetail;