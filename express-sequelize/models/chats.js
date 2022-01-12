'use strict';
module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    chat_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'user_id'
    },
    chatroom_id: {
      type: DataTypes.INTEGER,
      references: 'chatrooms',
      referencesKey: 'chatroom_id'
    },
    message: DataTypes.STRING,
    time: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  chats.associate = function(models) {
    chats.belongsTo(models.users, {foreignKey: 'user_id', target_key: 'user_id'});
    chats.belongsTo(models.chatrooms, {foreignKey: 'chatroom_id', target_key: 'chatroom_id'});
  };
  return chats;
};