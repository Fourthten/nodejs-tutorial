const express = require('express');
const userProfile = express.Router();
const userServices = require('../../../services/user/user.service');
const middleware = require('../../../middleware/checkToken');

// temukan transaksi berdasarkan userid
userProfile.get('/user', middleware, userServices.FindbyId);

module.exports = userProfile;