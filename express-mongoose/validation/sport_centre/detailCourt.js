const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateDetailcourt(data) {
    let errors = {};
    
    // isi data
    data.court_detailname = !isEmpty(data.court_detailname) ? data.court_detailname : '';
    
    // validasi data
    if (Validator.isEmpty(data.court_detailname)) {
        errors.court_detailname = "Kolom nama lapangan wajib di isi";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}