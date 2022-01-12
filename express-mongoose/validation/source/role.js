const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRole(data) {
    let errors = {};

    // isi data
    data.role_name = !isEmpty(data.role_name) ? data.role_name : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    
    // validasi data
    if (Validator.isEmpty(data.role_name)) {
        errors.role_name = "Kolom nama peran wajib di isi";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Kolom deskripsi peran wajib di isi";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}