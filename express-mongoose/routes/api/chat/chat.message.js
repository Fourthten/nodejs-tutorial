const express = require('express');
const Chatroute = express.Router();
const chat = require('../../../services/chat/chat.service');
const middleware = require('../../../middleware/checkToken');

// buat pesan
Chatroute.post('/chat', middleware, chat.create);
// lihat pesan
Chatroute.get('/chat/:chatId', middleware, chat.findAll);

module.exports = Chatroute;