const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Transaction.belongsTo(models.Invoice, {
        foreignKey: 'invoiceId'
      });
      Transaction.belongsTo(models.Item, {
          foreignKey: 'itemId',
          as: 'item'
      });

    }
  }
  Transaction.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    customerId: DataTypes.UUID,
    itemId: DataTypes.UUID,
    invoiceId: DataTypes.UUID,
    rate: DataTypes.DOUBLE,
    quantity: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    underscored: true
  });
  return Transaction;
};