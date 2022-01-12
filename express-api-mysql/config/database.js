// Import module
require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];
 
// Create connection
const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: false
});
 
// Export connection
module.exports = db;