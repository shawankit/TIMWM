'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
      Customer.hasMany(models.Invoice, {
        foreignKey: 'customerId',
        as: 'invoices'
      })
    }
  }
  Customer.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    type:{
      type: DataTypes.ENUM,
      values: ['customer', 'vendor']
    },
    code: DataTypes.TEXT,
    name: DataTypes.TEXT,
    mobile: DataTypes.STRING,
    due: DataTypes.DOUBLE,
    gstNumber: DataTypes.STRING,
    companyId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    underscored: true
  });
  return Customer;
};