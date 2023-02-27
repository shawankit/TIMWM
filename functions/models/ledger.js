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
      Ledger.hasMany(models.JournalLedger, {
        foreignKey: 'ledgerId',
        as: 'journalLedgers'
      });
      Ledger.belongsTo(models.Group, {
        foreignKey: 'groupId',
        as: 'group'
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
    groupId: DataTypes.UUID,
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