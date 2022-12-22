'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('upload_meta_data', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      type: {
        type: Sequelize.ENUM,
        values: ['sales', 'purchase', 'receipts', 'payments']
      },
      message: {
        type: Sequelize.TEXT
      },
      uploadedBy: {
        type: Sequelize.UUID,
        field: 'uploaded_by'
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
    await queryInterface.dropTable('upload_meta_data');
  }
};