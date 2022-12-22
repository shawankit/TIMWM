'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MobileAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MobileAuth.init({
    id: { type: DataTypes.UUID, primaryKey: true },
    mobileNumber: DataTypes.STRING,
    otpHash: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MobileAuth',
    tableName: 'mobile_auths',
    underscored: true
  });
  return MobileAuth;
};