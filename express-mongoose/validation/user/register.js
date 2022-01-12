const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegister(data) {
    let errors = {};

    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.birthdate = !isEmpty(data.birthdate) ? data.birthdate : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (Validator.isEmpty(data.fullname)) {
        errors.fullname = "Kolom nama wajib di isi";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Kolom email wajib di isi";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email harus valid";
    }
    
    if (Validator.isEmpty(data.birthdate)) {
        errors.birthdate = "Kolom tanggal lahir wajib di isi";
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Kolom nomor telepon wajib di isi";
    } else if (!Validator.isMobilePhone(data.phone, 'id-ID', {strictMode: true})) {
        errors.phone = "Nomor telepon harus valid";
    }

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
        errors.password2 = "Password harus sama";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}