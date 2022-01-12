'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role_name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  roles.associate = function(models) {
    roles.hasMany(models.accesses, {foreignKey: 'role_id', sourceKey: 'role_id'});
    roles.hasMany(models.users, {foreignKey: 'role_id', sourceKey: 'role_id'});
  };
  return roles;
};