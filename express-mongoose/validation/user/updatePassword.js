const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegister(data) {
    let errors = {};

    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (Validator.isEmpty(data.password)) {
        errors.password = "Kolom password wajib di isi";
    }
    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "Password minimal 6 karakter";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password harus cocok";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}