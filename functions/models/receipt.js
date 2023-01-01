'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receipt extends Model {
    static associate(models) {
      Receipt.belongsTo(models.Invoice, {
        foreignKey: 'invoiceId',
        as: 'invoice'
      });
      Receipt.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });
      Receipt.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });
    }
  }
  Receipt.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    type:{
      type: DataTypes.ENUM,
      values: ['receipts', 'payments']
    },
    receiptDate: DataTypes.DATE,
    companyId: DataTypes.UUID,
    customerId: DataTypes.UUID,
    invoiceId: DataTypes.UUID,
    via: DataTypes.TEXT,
    nature: {
      type: DataTypes.ENUM,
      values: ['advance', 'adjust']
    },
    amount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Receipt',
    tableName: 'receipts',
    underscored: true
  });
  return Receipt;
};