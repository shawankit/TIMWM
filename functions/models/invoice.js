'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });
      Invoice.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });
      Invoice.hasMany(models.Transaction, {
        foreignKey: 'invoiceId',
        as: 'transactions'
      });
    }
  }
  Invoice.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    type:{
      type: DataTypes.ENUM,
      values: ['sales', 'purchase']
    },
    invoiceNumber: DataTypes.STRING,
    customerId: DataTypes.UUID,
    invoiceDate: DataTypes.DATE,
    companyId: DataTypes.UUID,
    labourCharges: DataTypes.DOUBLE,
    claimAmount: DataTypes.DOUBLE,
    taxableAmount: DataTypes.DOUBLE,
    igst: DataTypes.DOUBLE,
    cgst: DataTypes.DOUBLE,
    sgst: DataTypes.DOUBLE,
    cess: DataTypes.DOUBLE,
    roundOff: DataTypes.DOUBLE,
    tcs: DataTypes.DOUBLE,
    totalValue: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoices',
    underscored: true
  });
  return Invoice;
};