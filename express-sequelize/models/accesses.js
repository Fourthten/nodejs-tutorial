'use strict';
module.exports = (sequelize, DataTypes) => {
  const accesses = sequelize.define('accesses', {
    access_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: 'roles',
      referencesKey: 'role_id'
    },
    feature_id: {
      type: DataTypes.INTEGER,
      references: 'features',
      referencesKey: 'feature_id'
    }
  }, {
    freezeTableName: true
  });
  accesses.associate = function(models) {
    accesses.belongsTo(models.roles, {foreignKey: 'role_id', target_key: 'role_id', as: 'roles'});
    accesses.belongsTo(models.features, {foreignKey: 'feature_id', target_key: 'feature_id', as: 'features'});
  };
  return accesses;
};