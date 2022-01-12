'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('roles', {
        uuid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        code: {
          allowNull: false,
          type: Sequelize.STRING(15)
        },
        name: {
          type: Sequelize.STRING(25)
        },
        description: {
          type: Sequelize.TEXT
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

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('roles');
  }
};