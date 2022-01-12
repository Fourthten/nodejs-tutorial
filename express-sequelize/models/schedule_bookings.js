'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedule_bookings = sequelize.define('schedule_bookings', {
    bookdate_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    field_id: {
      type: DataTypes.INTEGER,
      references: 'fields',
      referencesKey: 'field_id'
    },
    book_time: DataTypes.DATE
  }, {
    freezeTableName: true
  });
  schedule_bookings.associate = function(models) {
    schedule_bookings.belongsTo(models.fields, {foreignKey: 'field_id', target_key: 'field_id'});
  };
  return schedule_bookings;
};