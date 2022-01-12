'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];
    
    migrations.push(
      await queryInterface.createTable('categories', {
        category_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(4)
        },
        category_name: {
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
      await queryInterface.bulkInsert('categories', [{
        category_name: 'Futsal',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        category_name: 'Bulu Tangkis',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        category_name: 'Bola Basket',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        category_name: 'Tenis Meja',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};