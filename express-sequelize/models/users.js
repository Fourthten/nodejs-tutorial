'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.TEXT,
    birthdate: DataTypes.DATE,
    photo_url: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    role_id: {
      type: DataTypes.INTEGER,
      references: 'roles',
      referencesKey: 'role_id'
    },
    status: DataTypes.BOOLEAN
  }, {
    freezeTableName: true
  });
  users.associate = function(models) {
    users.belongsTo(models.roles, {foreignKey: 'role_id', target_key: 'role_id', as: 'roles'});
    users.hasMany(models.places, {foreignKey: 'user_id', sourceKey: 'user_id'});
    users.hasMany(models.ratings, {foreignKey: 'user_id', sourceKey: 'user_id'});
    users.hasMany(models.transactions, {foreignKey: 'user_id', sourceKey: 'user_id'});
    users.hasMany(models.chats, {foreignKey: 'user_id', sourceKey: 'user_id'});
    users.hasMany(models.chatrooms, {foreignKey: 'firstuser', sourceKey: 'user_id'});
    users.hasMany(models.chatrooms, {foreignKey: 'seconduser', sourceKey: 'user_id'});
  };
  return users;
};