const express = require('express');
const apiCopyright = express.Router();

apiCopyright.get('/', function(req, res, next) { res.json({ message: "Welcome to Sport Management", error: "Sport Management API Created by Praxis Academy" })});

module.exports = apiCopyright;