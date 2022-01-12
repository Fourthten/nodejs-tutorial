'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('addresses', {
        address_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        place_id: {
          allowNull: false,
          references: {
            model: 'places',
            key: 'place_id'
          },
          type: Sequelize.INTEGER(11)
        },
        latitude: {
          type: Sequelize.STRING(20)
        },
        longitude: {
          type: Sequelize.STRING(20)
        },
        address: {
          type: Sequelize.STRING(150)
        },
        postal_code: {
          type: Sequelize.STRING(6)
        },
        district_id: {
          allowNull: false,
          references: {
            model: 'districts',
            key: 'district_id'
          },
          type: Sequelize.INTEGER(11)
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

    migrations.push(
      await queryInterface.bulkInsert('addresses', [{
        place_id: 1,
        latitude: '-7.803249',
        longitude: '110.3397395',
        address: 'Jl. Pakem - Kalasan, Bima Hackers Village',
        postal_code: '15451',
        district_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('addresses');
  }
};