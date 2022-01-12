const express = require('express');
const sportCentreCourt = express.Router();
const sportcourt = require('../../../services/sport_centre/court.service');
const sportdetailCourt = require('../../../services/sport_centre/detailCourt.service');
const middleware = require('../../../middleware/checkToken');

// buat lapangan
sportCentreCourt.post('/sportcentre/court/:placeId', middleware, sportcourt.create);
// lihat lapangan
sportCentreCourt.get('/sportcentre/court/:placeId', middleware, sportcourt.findAll);
// buat detail lapangan
sportCentreCourt.post('/sportcentre/detailcourt', middleware, sportdetailCourt.create);
// lihat detail lapangan
sportCentreCourt.get('/sportcentre/detailcourt', middleware, sportdetailCourt.findAll);
// lihat detail lapangan beserta jenis
sportCentreCourt.get('/sportcentre/alldetailcourt', middleware, sportdetailCourt.findAllname);
// lihat detail lapangan beserta jenis berdasarkan kategori
sportCentreCourt.get('/sportcentre/alldetcourtbycat', middleware, sportdetailCourt.findAllnamebyCat);

module.exports = sportCentreCourt;