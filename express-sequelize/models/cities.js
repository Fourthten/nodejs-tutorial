'use strict';
module.exports = (sequelize, DataTypes) => {
  const cities = sequelize.define('cities', {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    province_id: {
      type: DataTypes.INTEGER,
      references: 'provinces',
      referencesKey: 'province_id'
    },
    city_name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  cities.associate = function(models) {
    cities.belongsTo(models.provinces, {foreignKey: 'province_id', target_key: 'province_id'});
    cities.hasMany(models.districts, {foreignKey: 'city_id', sourceKey: 'city_id'});
  };
  return cities;
};