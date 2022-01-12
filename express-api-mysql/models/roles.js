'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING(15),
      trim: true,
    },
    name: {
      type: DataTypes.STRING(25)
    },
    description: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN
  }, {
    freezeTableName: true
  });
  roles.associate = function(models) {
    roles.hasMany(models.users, {foreignKey: 'role_uuid', sourceKey: 'uuid'});
  };
  return roles;
};