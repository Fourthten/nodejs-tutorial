'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];
    
    migrations.push(
      await queryInterface.createTable('facilities', {
        facility_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        facility_name: {
          type: Sequelize.STRING(20)
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
      await queryInterface.bulkInsert('facilities', [{
        facility_name: 'Wifi',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_name: 'Kantin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_name: 'CCTV',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_name: 'Toilet',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_name: 'Area Merokok',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        facility_name: 'Area Pengisian Daya',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('facilities');
  }
};