const express = require('express');
const transCust = express.Router();
const transServices = require('../../../services/transaction/transaction.service');
const middleware = require('../../../middleware/checkToken');

// buat transaksi
transCust.post('/transaction', middleware, transServices.create);
// temukan transaksi berdasarkan userid
transCust.get('/transactionbyuser', middleware, transServices.findbyuserId);

module.exports = transCust;