'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('access_facilities', {
        accfacility_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        facility_id: {
          allowNull: false,
          references: {
            model: 'facilities',
            key: 'facility_id'
          },
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
      await queryInterface.bulkInsert('access_facilities', [{
        facility_id: 1,
        place_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_id: 2,
        place_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_id: 4,
        place_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_id: 6,
        place_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('access_facilities');
  }
};