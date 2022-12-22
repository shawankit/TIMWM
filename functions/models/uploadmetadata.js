'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UploadMetaData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UploadMetaData.belongsTo(models.User, { foreignKey: 'uploadedBy' });
    }
  }
  UploadMetaData.init({
    type: {
      type: DataTypes.ENUM,
      values: ['sales', 'purchase', 'receipts', 'payments']
    },
    message: DataTypes.TEXT,
    uploadedBy: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UploadMetaData',
    tableName: 'upload_meta_data',
    underscored: true
  });
  return UploadMetaData;
};