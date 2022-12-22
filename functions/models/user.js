'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UploadMetaData, { foreignKey: 'uploadedBy' });
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password : DataTypes.STRING
  }, {
    sequelize,
    tableName: 'users',
    underscored: true,
    modelName: 'User',
  });
  return User;
};