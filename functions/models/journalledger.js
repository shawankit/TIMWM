'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JournalLedger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JournalLedger.belongsTo(models.Journal, {
        foreignKey: 'journalId'
      });
      JournalLedger.belongsTo(models.Ledger, {
          foreignKey: 'ledgerId',
          as: 'ledger'
      });
    }
  }
  JournalLedger.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    journalId: DataTypes.UUID,
    ledgerId: DataTypes.UUID,
    type: {
      type: DataTypes.ENUM,
      values: ['debit', 'credit']
    },
    amount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'JournalLedger',
    tableName: 'journal_ledgers',
    underscored: true
  });
  return JournalLedger;
};