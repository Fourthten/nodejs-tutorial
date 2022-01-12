'use strict';
module.exports = (sequelize, DataTypes) => {
  const fields = sequelize.define('fields', {
    field_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: 'places',
      referencesKey: 'place_id'
    },
    field_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE
  }, {
    freezeTableName: true
  });
  fields.associate = function(models) {
    fields.belongsTo(models.places, {foreignKey: 'place_id', target_key: 'place_id'});
    fields.hasMany(models.field_photos, {foreignKey: 'field_id', sourceKey: 'field_id'});
    fields.hasMany(models.schedule_bookings, {foreignKey: 'field_id', sourceKey: 'field_id'});
    fields.hasMany(models.transaction_details, {foreignKey: 'field_id', sourceKey: 'field_id'});
  };
  return fields;
};