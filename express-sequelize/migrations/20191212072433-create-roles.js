'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('roles', {
        role_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(4)
        },
        role_name: {
          type: Sequelize.STRING(15)
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
      await queryInterface.bulkInsert('roles', [{
        role_name: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_name: 'Pemilik',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_name: 'Penyewa',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  }
};