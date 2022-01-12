const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
    let errors = {};

    // fill data
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // validation data
    if (Validator.isEmpty(data.email)) {
        errors.email = "Kolom email wajib di isi";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Kolom password wajib di isi";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};