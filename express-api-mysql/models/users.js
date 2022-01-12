'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.TEXT
    },
    full_name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    phone_number: {
      type: DataTypes.STRING(13)
    },
    address: DataTypes.TEXT,
    photo_url: DataTypes.TEXT,
    role_uuid: {
      allowNull: false,
      type: DataTypes.INTEGER(4)
    },
    is_active: DataTypes.BOOLEAN
  }, {
    freezeTableName: true
  });
  users.associate = function(models) {
    users.belongsTo(models.roles, {foreignKey: 'role_uuid', target_key: 'role_uuid', as: 'roles'});
  };
  return users;
};