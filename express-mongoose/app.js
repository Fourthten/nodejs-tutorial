const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
require('./db');

const app = express();

app.use(logger('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/api', require('./routes/index'));
app.use('/', require('./routes/api/copyright'));

app.set( 'port', ( process.env.PORT || 8080 ));
app.listen(process.env.PORT, () => console.log(`localhost:${process.env.PORT}`));