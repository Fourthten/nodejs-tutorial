'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transactions', {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      transaction_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20)
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id'
        },
        type: Sequelize.INTEGER(11)
      },
      booking_name: {
        type: Sequelize.STRING(30)
      },
      booking_phone: {
        type: Sequelize.STRING(13)
      },
      booking_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      note: {
        type: Sequelize.STRING(255)
      },
      duration: {
        type: Sequelize.INTEGER(2)
      },
      price_total: {
        type: Sequelize.DOUBLE
      },
      midtrans_id: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(25)
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
    return queryInterface.dropTable('transactions');
  }
};