'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('time_bookings', {
      time_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      detailtrans_id: {
        allowNull: false,
        references: {
          model: 'transaction_details',
          key: 'detailtrans_id'
        },
        type: Sequelize.INTEGER(11)
      },
      time_booking: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('time_bookings');
  }
};