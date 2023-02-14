'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ledger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ledger.belongsToMany(models.Journal, {
        through: models.JournalLedger,
        foreignKey: 'ledgerId',
        as: 'journals'
      });
    }
  }
  Ledger.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.TEXT,
    code: DataTypes.STRING,
    group: {
      type: DataTypes.ENUM,
      values: ['sundary_debtor', 'sundary_creditor']
    },
    balanceDate: DataTypes.DATE,
    balance: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Ledger',
    tableName: 'ledgers',
    underscored: true
  });
  return Ledger;
};