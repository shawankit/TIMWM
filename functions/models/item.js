const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.hasMany(models.Transaction, {
        foreignKey: 'itemId',
      });
    }
  }
  Item.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    code: DataTypes.TEXT,
    name: DataTypes.STRING,
    rate: DataTypes.DOUBLE,
    uom: DataTypes.STRING,
    companyId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    underscored: true
  });
  return Item;
};