'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      type:{
        type: Sequelize.ENUM,
        values: ['customer', 'vendor']
      },
      code: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      mobile: {
        type: Sequelize.STRING
      },
      due: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      gstNumber: {
        type: Sequelize.STRING,
        field: 'gst_number'
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
    await queryInterface.dropTable('customers');
  }
};