const express = require('express');
const Facilityroute = express.Router();
const facility = require('../../../controllers/facility.controller');
const middleware = require('../../../middleware/checkToken');

// buat fasilitas
Facilityroute.post('/facility', middleware, facility.create);
// lihat semua fasilitas
Facilityroute.get('/facilityall', middleware, facility.findAll);
// lihat fasilitas aktif
Facilityroute.get('/facility', middleware, facility.findUsed);
// lihat fasilitas tertentu
Facilityroute.get('/facility/:facilityId', middleware, facility.findOne);
// ubah fasilitas
Facilityroute.put('/facility/:facilityId', middleware, facility.update);
// hapus fasilitas
Facilityroute.delete('/facility/:facilityId', middleware, facility.delete);

module.exports = Facilityroute;