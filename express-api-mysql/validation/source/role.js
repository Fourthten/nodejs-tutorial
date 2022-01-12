const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRole(data) {
    let errors = {};

    // fill data
    data.code = !isEmpty(data.code) ? data.code : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    
    // validation data
    if (Validator.isEmpty(data.code)) {
        errors.code = "Kolom kode peran wajib di isi";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Kolom nama peran wajib di isi";
    }

    if (!Validator.isLength(data.code, {min: 0, max: 15})) {
        errors.code = "Maksimal kode peran 15 karakter";
    }
    if (!Validator.isLength(data.name, {min: 0, max: 25})) {
        errors.name = "Maksimal nama peran 25 karakter";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}