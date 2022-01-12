const express = require('express');
const sportCentreAddress = express.Router();
const sportcourtAddress = require('../../../services/sport_centre/address.service');
const middleware = require('../../../middleware/checkToken');

// buat alamat lapangan olahraga
sportCentreAddress.post('/sportcentre/address', middleware, sportcourtAddress.create);
// cari lapangan olahraga terdekat
sportCentreAddress.get('/sportcentre/address/distance', middleware, sportcourtAddress.findDistance);

module.exports = sportCentreAddress;