'use strict';
module.exports = (sequelize, DataTypes) => {
  const chatrooms = sequelize.define('chatrooms', {
    chatroom_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstuser: {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'user_id'
    },
    seconduser: {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'user_id'
    }
  }, {
    freezeTableName: true
  });
  chatrooms.associate = function(models) {
    chatrooms.belongsTo(models.users, {foreignKey: 'firstuser', target_key: 'user_id'});
    chatrooms.belongsTo(models.users, {foreignKey: 'seconduser', target_key: 'user_id'});
    chatrooms.hasMany(models.chats, {foreignKey: 'chatroom_id', sourceKey: 'chatroom_id'});
  };
  return chatrooms;
};