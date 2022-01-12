const express = require('express');
const Roleroute = express.Router();
const role = require('../../../controllers/role.controller');
const middleware = require('../../../middleware/checkToken');

// buat peran
Roleroute.post('/role', middleware, role.create);
// lihat semua peran
Roleroute.get('/role', middleware, role.findAll);
// lihat peran tertentu
Roleroute.get('/role/:roleId', middleware, role.findOne);
// ubah peran
Roleroute.put('/role/:roleId', middleware, role.update);
// hapus peran
Roleroute.delete('/role/:roleId', middleware, role.delete);

module.exports = Roleroute;