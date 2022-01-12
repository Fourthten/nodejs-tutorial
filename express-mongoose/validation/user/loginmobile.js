const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.device = !isEmpty(data.device) ? data.device : '';

    if (Validator.isEmpty(data.username)) {
        errors.username = "Kolom email atau nomor telepon wajib di isi";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Kolom password wajib di isi";
    }

    if (Validator.isEmpty(data.device)) {
        errors.device = "Perangkat tidak teridentifikasi";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};