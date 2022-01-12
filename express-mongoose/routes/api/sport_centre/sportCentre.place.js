const express = require('express');
const sportCentrePlace = express.Router();
const sportcentre = require('../../../services/sport_centre/place.service');
const sportcentrelikes = require('../../../services/sport_centre/placeLikes.service')
const middleware = require('../../../middleware/checkToken');

// buat gedung olahraga
sportCentrePlace.post('/sportcentre/place', middleware, sportcentre.create);
// lihat gedung olahraga
sportCentrePlace.get('/sportcentre/place', middleware, sportcentre.findAll);
// lihat hanya satu gedung olahraga
sportCentrePlace.get('/sportcentre/place/:placeId', middleware, sportcentre.findOne);
// lihat gedung olahraga berdasarkan kategori
sportCentrePlace.get('/sportcentre/place_cat', middleware, sportcentre.findbyCategory);
// lihat gedung olahraga berdasarkan user
sportCentrePlace.get('/sportcentre/place_user', middleware, sportcentre.findbyUser);
// cari semua gedung olahraga berdasarkan kolom penelusuran
sportCentrePlace.get('/sportcentre/place_search', middleware, sportcentre.searchAll);
// cari semua gedung olahraga berdasarkan kategori dan kolom penelusuran
sportCentrePlace.get('/sportcentre/place_srccat', middleware, sportcentre.searchbyCategory);
// Menyukai tempat
sportCentrePlace.post('/sportcentre/like_place', middleware, sportcentrelikes.likePlace);

module.exports = sportCentrePlace;