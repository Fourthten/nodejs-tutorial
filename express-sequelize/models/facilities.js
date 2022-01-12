'use strict';
module.exports = (sequelize, DataTypes) => {
  const facilities = sequelize.define('facilities', {
    facility_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    facility_name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  facilities.associate = function(models) {
    facilities.hasMany(models.access_facilities, {foreignKey: 'facility_id', sourceKey: 'facility_id'});
  };
  return facilities;
};