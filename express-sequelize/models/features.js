'use strict';
module.exports = (sequelize, DataTypes) => {
  const features = sequelize.define('features', {
    feature_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    feature_name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  features.associate = function(models) {
    features.hasMany(models.accesses, {foreignKey: 'feature_id', sourceKey: 'feature_id'});
  };
  return features;
};