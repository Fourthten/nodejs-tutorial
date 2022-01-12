'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];

    migrations.push(
      await queryInterface.createTable('places', {
        place_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER(11)
        },
        user_id: {
          allowNull: false,
          references: {
            model: 'users',
            key: 'user_id'
          },
          type: Sequelize.INTEGER(11)
        },
        category_id: {
          allowNull: false,
          references: {
            model: 'categories',
            key: 'category_id'
          },
          type: Sequelize.INTEGER(4)
        },
        place_name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        photo_url: {
          type: Sequelize.STRING(255)
        },
        qty_field: {
          type: Sequelize.INTEGER(4)
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
      await queryInterface.bulkInsert('places', [{
        user_id: 2,
        category_id: 1,
        place_name: 'Lapangan Bima Hacker Village',
        photo_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyGB25oo8GO9f6E8lDw6wGxiO9KxjhNzsqnUkgVOhEq_wKzdVw',
        qty_field: 3,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('places');
  }
};