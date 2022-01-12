const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRole(data) {
    let errors = {};

    // fill data
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.full_name = !isEmpty(data.full_name) ? data.full_name : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
    data.role_uuid = !isEmpty(data.role_uuid) ? data.role_uuid : '';
    
    // validation data
    if (Validator.isEmpty(data.email)) {
        errors.email = "Kolom email pengguna wajib di isi";
    }
    if (Validator.isEmpty(data.password) && !data.uuid) {
        errors.password = "Kolom kata sandi pengguna wajib di isi";
    }
    if (Validator.isEmpty(data.full_name)) {
        errors.full_name = "Kolom nama pengguna wajib di isi";
    }
    if (Validator.isEmpty(data.role_uuid)) {
        errors.role_uuid = "Kolom peran pengguna wajib di isi";
    }

    if (!Validator.isLength(data.email, {min: 0, max: 255})) {
        errors.email = "Maksimal email pengguna 255 karakter";
    }
    if (!Validator.isLength(data.full_name, {min: 0, max: 100})) {
        errors.full_name = "Maksimal nama pengguna 100 karakter";
    }
    if (!Validator.isLength(data.phone_number, {min: 0, max: 13})) {
        errors.phone_number = "Maksimal nomor pengguna 13 karakter";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}