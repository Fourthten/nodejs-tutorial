const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateTrans(data) {
    let errors = {};
    
    // isi data
    data.bookingname = !isEmpty(data.bookingname) ? data.bookingname : '';
    data.bookingphone = !isEmpty(data.bookingphone) ? data.bookingphone : '';
    data.courtname = !isEmpty(data.courtname) ? data.courtname : '';
    data.time = !isEmpty(data.time) ? data.time : [];
    
    // validasi data
    if (Validator.isEmpty(data.bookingname)) {
        errors.bookingname = "Kolom nama pemesan wajib di isi";
    }
    if (Validator.isEmpty(data.bookingphone)) {
        errors.bookingphone = "Kolom telepon pemesan wajib di isi";
    }
    if (Validator.isEmpty(data.courtname)) {
        errors.courtname = "Kolom nama lapangan wajib di isi";
    }
    if (data.time.length <= 0) {
        errors.time = "Waktu pemesanan wajib di pilih";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}