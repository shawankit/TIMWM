'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    static associate(models) {
      Journal.hasMany(models.JournalLedger, {
        foreignKey: 'journalId',
        as: 'journalLedgers'
      });
    }
  }
  Journal.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    dated: DataTypes.DATEONLY,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Journal',
    tableName: 'journals',
    underscored: true
  });
  return Journal;
};