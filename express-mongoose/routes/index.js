const express = require('express');
const app = express();

// refresh token
app.use(require('./api/refreshToken'));
// user role
app.use(require('./api/source/role.route'));
// user register
app.use(require('./api/user/user.registration'));
// user login
app.use(require('./api/user/user.login'));
// user change password
app.use(require('./api/user/user.updatePassword'));
// user profile
app.use(require('./api/user/user.profile'));
// user chat
app.use(require('./api/chat/chat.message'));
// user chatroom
app.use(require('./api/chat/chat.chatroom'));
// sport centre facility
app.use(require('./api/source/facility.route'));
// sport centre
app.use(require('./api/sport_centre/sportCentre.place'));
// sport court
app.use(require('./api/sport_centre/sportCentre.court'));
// sport address
app.use(require('./api/sport_centre/sportCentre.address'));
// schedule order
app.use(require('./api/schedule/schedule.date'));
// transaction order
app.use(require('./api/transaction/transaction.customer'));

module.exports = app;