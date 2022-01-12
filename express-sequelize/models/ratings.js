'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    rating_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'user_id'
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: 'places',
      referencesKey: 'place_id'
    },
    rating: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  ratings.associate = function(models) {
    ratings.belongsTo(models.users, {foreignKey: 'user_id', target_key: 'user_id'});
    ratings.belongsTo(models.places, {foreignKey: 'place_id', target_key: 'place_id'});
  };
  return ratings;
};