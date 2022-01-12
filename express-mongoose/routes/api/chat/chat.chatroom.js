const express = require('express');
const Chatroomroute = express.Router();
const chatroom = require('../../../services/chat/chatroom.service');
const middleware = require('../../../middleware/checkToken');

// lihat ruang obrolan
Chatroomroute.get('/chatroom', middleware, chatroom.findAll);

module.exports = Chatroomroute;