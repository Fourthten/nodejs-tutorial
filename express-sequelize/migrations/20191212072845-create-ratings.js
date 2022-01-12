'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let migrations = [];
    
    migrations.push(
      await queryInterface.createTable('ratings', {
        rating_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT(20)
        },
        user_id: {
          allowNull: false,
          references: {
            model: 'users',
            key: 'user_id'
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
        rating: {
          type: Sequelize.INTEGER(1)
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
      await queryInterface.bulkInsert('ratings', [{
        user_id: 3,
        place_id: 1,
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
    );

    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ratings');
  }
};