'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chatrooms', {
      chatroom_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      firstuser: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        type: Sequelize.INTEGER(11)
      },
      seconduser: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chatrooms');
  }
};