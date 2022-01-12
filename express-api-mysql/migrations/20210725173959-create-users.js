'use strict';
const { v4: uuidv4, v5: uuidv5 } = require('uuid');
const bcrypt = require('bcrypt');
var cryptojs = require('crypto-js');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('users', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        password: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        full_name: {
          allowNull: false,
          type: Sequelize.STRING(100)
        },
        phone_number: {
          type: Sequelize.STRING(13)
        },
        address: {
          type: Sequelize.TEXT
        },
        photo_url: {
          type: Sequelize.TEXT
        },
        role_uuid: {
          allowNull: false,
          type: Sequelize.UUID
        },
        is_active: {
          allowNull: false,
          defaultValue: 1,
          type: Sequelize.BOOLEAN
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    );

    var crypto_pass = cryptojs.SHA256('admin2021' + process.env.SECRET_KEY).toString();
    var bcrypt_pass = bcrypt.hashSync(crypto_pass, 5);
    var role_uuid = uuidv5(process.env.SECRET_KEY, uuidv4());
    
    migrations.push(
      await queryInterface.bulkInsert('roles', [{
        uuid: role_uuid,
        code: 'admin',
        name: 'Administrator',
        description: 'This roles could access everything',
        is_active: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }], {})
    );

    migrations.push(
      await queryInterface.bulkInsert('users', [{
        uuid: uuidv5(process.env.SECRET_KEY, uuidv4()),
        email: 'admin@admin.co.id',
        password: bcrypt_pass,
        full_name: 'Administrator',
        phone_number: '-',
        address: null,
        photo_url: null,
        role_uuid: role_uuid,
        is_active: 1,
        createdAt : new Date(),
        updatedAt : new Date()
      }], {})
    );
    
    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};