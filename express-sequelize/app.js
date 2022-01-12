const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

require('dotenv').config();
const sequelize = require('./db');

const featuresRouter = require('./routes/features');
const rolesRouter = require('./routes/roles');
const accessesRouter = require('./routes/accesses');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');
const placesRouter = require('./routes/places');

const PORT = process.env.PORT || 8000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/features', featuresRouter);
app.use('/roles', rolesRouter);
app.use('/accesses', accessesRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/places', placesRouter);

sequelize.authenticate()
    .then(() => console.log('Sukses koneksi ke mysql'))
    .catch(err => console.error('Gagal koneksi ke mysql', err));

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));