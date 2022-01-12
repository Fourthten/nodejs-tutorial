const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validatePlace(data) {
    let errors = {};
    
    // isi data
    data.sportcentre_name = !isEmpty(data.sportcentre_name) ? data.sportcentre_name : '';
    data.facility = !isEmpty(data.facility) ? data.facility : [];
    
    // validasi data
    if (Validator.isEmpty(data.sportcentre_name)) {
        errors.sportcentre_name = "Kolom nama tempat wajib di isi";
    }
    if (data.facility.length <= 0) {
        errors.facility = "Fasilitas wajib di pilih";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}