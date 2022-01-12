'use strict';
module.exports = (sequelize, DataTypes) => {
  const districts = sequelize.define('districts', {
    district_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: 'cities',
      referencesKey: 'city_id'
    },
    district_name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  districts.associate = function(models) {
    districts.belongsTo(models.cities, {foreignKey: 'city_id', target_key: 'city_id'});
    districts.hasMany(models.addresses, {foreignKey: 'district_id', sourceKey: 'district_id'});
  };
  return districts;
};