'use strict';
module.exports = (sequelize, DataTypes) => {
  const field_photos = sequelize.define('field_photos', {
    photo_id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    field_id: {
      type: DataTypes.INTEGER,
      references: 'fields',
      referencesKey: 'field_id'
    },
    url: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  field_photos.associate = function(models) {
    field_photos.belongsTo(models.fields, {foreignKey: 'field_id', target_key: 'field_id'});
  };
  return field_photos;
};