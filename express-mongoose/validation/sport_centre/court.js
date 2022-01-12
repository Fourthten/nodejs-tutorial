const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateCourt(data) {
    let errors = {};
    
    // isi data
    data.court_name = !isEmpty(data.court_name) ? data.court_name : '';
    data.court_cat = !isEmpty(data.court_cat) ? data.court_cat : '';
    data.price = !isEmpty(data.price) ? data.price : 0;
    
    // validasi data
    if (Validator.isEmpty(data.court_name)) {
        errors.court_name = "Kolom nama jenis lapangan wajib di isi";
    }
    if (Validator.isEmpty(data.court_cat)) {
        errors.court_cat = "Kolom kategori lapangan wajib di isi";
    }
    if (data.price <= 0) {
        errors.price = "Kolom harga wajib di isi";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}