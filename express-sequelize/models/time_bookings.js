'use strict';
module.exports = (sequelize, DataTypes) => {
  const time_bookings = sequelize.define('time_bookings', {
    time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    detailtrans_id: {
      type: DataTypes.INTEGER,
      references: 'transaction_details',
      referencesKey: 'detailtrans_id'
    },
    time_booking: DataTypes.DATE
  }, {
    freezeTableName: true
  });
  time_bookings.associate = function(models) {
    time_bookings.belongsTo(models.transaction_details, {foreignKey: 'detailtrans_id', target_key: 'detailtrans_id'});
  };
  return time_bookings;
};