'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    transaction_number: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: 'users',
      referencesKey: 'user_id'
    },
    booking_name: DataTypes.STRING,
    booking_phone: DataTypes.STRING,
    booking_date: DataTypes.DATE,
    note: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    price_total: DataTypes.DOUBLE,
    midtrans_id: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });
  transactions.associate = function(models) {
    transactions.belongsTo(models.users, {foreignKey: 'user_id', target_key: 'user_id'});
    transactions.hasMany(models.transaction_details, {foreignKey: 'transaction_id', sourceKey: 'transaction_id'});
  };
  return transactions;
};