'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chats', {
      chat_id: {
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
      chatroom_id: {
        allowNull: false,
        references: {
          model: 'chatrooms',
          key: 'chatroom_id'
        },
        type: Sequelize.INTEGER(11)
      },
      message: {
        type: Sequelize.STRING(255)
      },
      time: {
        type: Sequelize.DATE
      },
      status: {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chats');
  }
};