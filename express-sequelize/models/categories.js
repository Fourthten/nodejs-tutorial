'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    category_name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  categories.associate = function(models) {
    categories.hasMany(models.places, {foreignKey: 'category_id', sourceKey: 'category_id'});
  };
  return categories;
};