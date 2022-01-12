'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction_details = sequelize.define('transaction_details', {
    detailtrans_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      references: 'transactions',
      referencesKey: 'transaction_id'
    },
    field_id: {
      type: DataTypes.INTEGER,
      references: 'fields',
      referencesKey: 'field_id'
    },
    price: DataTypes.DOUBLE
  }, {
    freezeTableName: true
  });
  transaction_details.associate = function(models) {
    transaction_details.belongsTo(models.transactions, {foreignKey: 'transaction_id', target_key: 'transaction_id'});
    transaction_details.belongsTo(models.fields, {foreignKey: 'field_id', target_key: 'field_id'});
    transaction_details.hasMany(models.time_bookings, {foreignKey: 'detailtrans_id', sourceKey: 'detailtrans_id'});
  };
  return transaction_details;
};