'use strict';
module.exports = (sequelize, DataTypes) => {
  const access_facilities = sequelize.define('access_facilities', {
    accfacility_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    facility_id: {
      type: DataTypes.INTEGER,
      references: 'facilities',
      referencesKey: 'facility_id'
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: 'places',
      referencesKey: 'place_id'
    }
  }, {
    freezeTableName: true
  });
  access_facilities.associate = function(models) {
    access_facilities.belongsTo(models.facilities, {foreignKey: 'facility_id', target_key: 'facility_id'});
    access_facilities.belongsTo(models.places, {foreignKey: 'place_id', target_key: 'place_id'});
  };
  return access_facilities;
};