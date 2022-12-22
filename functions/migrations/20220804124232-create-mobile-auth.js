'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mobile_auths', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      mobileNumber: {
        type: Sequelize.STRING,
        field: 'mobile_number'
      },
      otpHash: {
        type: Sequelize.STRING,
        field: 'otp_hash'
      },
      expiredAt: {
        type: Sequelize.DATE,
        field: 'expired_at'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mobile_auths');
  }
};