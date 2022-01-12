const express = require('express');
const userRegistration = express.Router();
const register = require('../../../services/user/register.service');
const registerotp = require('../../../services/user/otp.service');

// Registrasi pengguna
userRegistration.post('/user/register', register.register);
// Verifikasi OTP email dan telepon
userRegistration.post('/user/registerotp', registerotp.send);
// Cek verifikasi OTP
userRegistration.post('/user/checkregisterotp', registerotp.checkVerification);

module.exports = userRegistration;