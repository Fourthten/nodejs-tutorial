'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transaction_details', {
      detailtrans_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      transaction_id: {
        allowNull: false,
        references: {
          model: 'transactions',
          key: 'transaction_id'
        },
        type: Sequelize.INTEGER(11)
      },
      field_id: {
        allowNull: false,
        references: {
          model: 'fields',
          key: 'field_id'
        },
        type: Sequelize.INTEGER(11)
      },
      price: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('transaction_details');
  }
};