const express = require('express');
const app = express();

// refresh token
// app.use(require('./api/extended/refreshToken'));
app.use(require('./api/user/user.login')); /* Login */
app.use(require('./api/source/role.route')); /* Role */
app.use(require('./api/source/user.route')); /* User */

module.exports = app;