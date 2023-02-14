'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    static associate(models) {
      Journal.belongsToMany(models.Ledger, {
        through: models.JournalLedger,
        foreignKey: 'journalId',
        as: 'ledgers'
      });
    }
  }
  Journal.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
  }, {
    sequelize,
    modelName: 'Journal',
    tableName: 'journals',
    underscored: true
  });
  return Journal;
};