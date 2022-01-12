const express = require('express');
const apiCopyright = express.Router();

apiCopyright.get('/', function(req, res, next) { res.json({ message: "Welcome to Express API", error: "Express API Created by Me" })});

module.exports = apiCopyright;