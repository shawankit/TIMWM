'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Customer, {
        foreignKey: 'companyId',
        as: 'customers'
      })
      Company.hasMany(models.Invoice, {
        foreignKey: 'companyId',
        as: 'invoices'
      })
      Company.hasMany(models.Receipt, {
        foreignKey: 'companyId',
        as: 'receipts'
      })
    }
  }
  Company.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    division: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    underscored: true
  });
  return Company;
};