'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('features', {
        feature_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(4)
        },
        feature_name: {
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
      await queryInterface.bulkInsert('features', [{
        feature_name: 'Profil',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        feature_name: 'Tempat',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        feature_name: 'Pemesanan',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('features');
  }
};