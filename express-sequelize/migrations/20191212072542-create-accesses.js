'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('accesses', {
        access_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        role_id: {
          allowNull: false,
          references: {
            model: 'roles',
            key: 'role_id'
          },
          type: Sequelize.INTEGER(4)
        },
        feature_id: {
          allowNull: false,
          references: {
            model: 'features',
            key: 'feature_id'
          },
          type: Sequelize.INTEGER(4)
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
      await queryInterface.bulkInsert('accesses', [{
        role_id: 1,
        feature_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        role_id: 1,
        feature_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accesses');
  }
};