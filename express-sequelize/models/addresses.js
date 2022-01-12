'use strict';
module.exports = (sequelize, DataTypes) => {
  const addresses = sequelize.define('addresses', {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: 'places',
      referencesKey: 'place_id'
    },
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    address: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    district_id: {
      type: DataTypes.INTEGER,
      references: 'districts',
      referencesKey: 'district_id'
    }
  }, {
    freezeTableName: true
  });
  addresses.associate = function(models) {
    addresses.belongsTo(models.places, {foreignKey: 'place_id', target_key: 'place_id'});
    addresses.belongsTo(models.districts, {foreignKey: 'district_id', target_key: 'district_id'});
  };
  return addresses;
};