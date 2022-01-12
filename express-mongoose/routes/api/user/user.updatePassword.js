const express = require('express');
const userUpdate = express.Router();
const middleware = require('../../../middleware/checkToken');

userUpdate.put('/user/profile/password', middleware, require('../../../services/user/updatePassword.service'));

module.exports = userUpdate;