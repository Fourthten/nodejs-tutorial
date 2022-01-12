const express = require('express');
const scheduleCourt = express.Router();
const schedulesCourt = require('../../../services/schedule/schedule.service');
const middleware = require('../../../middleware/checkToken');

// buat jadwal lapangan olahraga
scheduleCourt.post('/schedule', middleware, schedulesCourt.create);
// temukan jadwal lapangan olahraga
scheduleCourt.get('/schedule', middleware, schedulesCourt.findSchedule);

module.exports = scheduleCourt;