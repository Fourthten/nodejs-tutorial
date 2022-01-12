'use strict';
module.exports = (sequelize, DataTypes) => {
  const provinces = sequelize.define('provinces', {
    province_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    province_name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  provinces.associate = function(models) {
    provinces.hasMany(models.cities, {foreignKey: 'province_id', sourceKey: 'province_id'});
  };
  return provinces;
};