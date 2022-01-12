const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sportCentreSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    category: [String],
    sportcentre_name: {
        type: String,
        required: true
    },
    address: {
        coordinate: {
            type: [Number], index: '2dsphere', default: [0,0]
        },
        location: {
            lat: { type: Number, default: 0 },
            lng: { type: Number, default: 0 }
        },
        postal_code: {
            type: String,
            default: ''
        },
        village: {
            type: String,
            default: ''
        },
        subdistrict: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        province: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: 'Indonesia'
        },
        formatted_address: {
            type: String,
            default: ''
        }
    },
    sport_court: [],
    facility: [String],
    schedule: {
        day0: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        day1: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        day2: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        day3: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        day4: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        day5: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        day6: {
            open: { type: Number, default: 3600000 },
            close: { type: Number, default: 54000000 },
            status: { type: Boolean, default: true }
        },
        holiday: [Number]
    },
    photo_url: {
        type: String,
        default: ''
    },
    rating: {
        type: [],
        default: [{
            total: 0
        }]
    },
    like: [String],
    status: {
        type: Boolean,
        required: true,
        default: false
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

const sportCentre = mongoose.model('sportcentre', sportCentreSchema);

module.exports = sportCentre;