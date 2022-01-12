const express = require('express');
const userLogin = express.Router();
const thislogin = require('../../../services/user/login.service');

// login web
userLogin.post('/login', thislogin.login);
// login mobile
// userLogin.post('/user/loginmobile', thislogin.loginmobile);

module.exports = userLogin;