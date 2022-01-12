'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedules = sequelize.define('schedules', {
    schedule_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: 'places',
      referencesKey: 'place_id'
    },
    open: DataTypes.DATE,
    close: DataTypes.DATE,
    day: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    freezeTableName: true
  });
  schedules.associate = function(models) {
    schedules.belongsTo(models.places, {foreignKey: 'place_id', target_key: 'place_id'});
  };
  return schedules;
};