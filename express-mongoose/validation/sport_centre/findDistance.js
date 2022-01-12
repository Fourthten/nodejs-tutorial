const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateClosestdistance(data) {
    let errors = {};
    
    // isi data
    data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
    data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
    
    // validasi data
    if (Validator.isEmpty(data.longitude)) {
        errors.longitude = "Koordinat longitude tidak ditemukan";
    }
    if (Validator.isEmpty(data.latitude)) {
        errors.latitude = "Koordinat latitude tidak ditemukan";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}