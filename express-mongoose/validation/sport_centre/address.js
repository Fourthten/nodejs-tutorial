const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateAddress(data) {
    let errors = {};
    
    // isi data
    data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
    data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
    data.postal_code = !isEmpty(data.postal_code) ? data.postal_code : '';
    data.subdistrict = !isEmpty(data.subdistrict) ? data.subdistrict : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.province = !isEmpty(data.province) ? data.province : '';
    data.formatted_address = !isEmpty(data.formatted_address) ? data.formatted_address : '';
    
    // validasi data
    if (Validator.isEmpty(data.longitude)) {
        errors.longitude = "Koordinat longitude tidak ditemukan";
    }
    if (Validator.isEmpty(data.latitude)) {
        errors.latitude = "Koordinat latitude tidak ditemukan";
    }
    if (Validator.isEmpty(data.postal_code)) {
        errors.postal_code = "Kode pos tidak boleh kosong";
    }
    if (Validator.isEmpty(data.subdistrict)) {
        errors.subdistrict = "Kecamatan tidak boleh kosong";
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = "Kota/Kabupaten tidak boleh kosong";
    }
    if (Validator.isEmpty(data.province)) {
        errors.province = "Provinsi tidak boleh kosong";
    }
    if (Validator.isEmpty(data.formatted_address)) {
        errors.formatted_address = "Alamat tidak boleh kosong";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}