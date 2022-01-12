const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateFacility(data) {
    let errors = {};

    // isi data
    data.facility_name = !isEmpty(data.facility_name) ? data.facility_name : '';
    
    // validasi data
    if (Validator.isEmpty(data.facility_name)) {
        errors.facility_name = "Kolom nama fasilitas wajib di isi";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}