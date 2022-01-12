'use strict';
module.exports = (sequelize, DataTypes) => {
  const places = sequelize.define('places', {
    place_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'user_id'
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: 'categories',
      referencesKey: 'category_id'
    },
    place_name: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    address: DataTypes.STRING,
    qty_field: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    freezeTableName: true
  });
  places.associate = function(models) {
    places.belongsTo(models.users, {foreignKey: 'user_id', target_key: 'user_id'});
    places.belongsTo(models.categories, {foreignKey: 'category_id', target_key: 'category_id'});
    places.hasMany(models.ratings, {foreignKey: 'place_id', sourceKey: 'place_id'});
    places.hasMany(models.fields, {foreignKey: 'place_id', sourceKey: 'place_id'});
    places.hasMany(models.addresses, {foreignKey: 'place_id', sourceKey: 'place_id'});
    places.hasMany(models.schedules, {foreignKey: 'place_id', sourceKey: 'place_id'});
    places.hasMany(models.access_facilities, {foreignKey: 'place_id', sourceKey: 'place_id'});
  };
  return places;
};