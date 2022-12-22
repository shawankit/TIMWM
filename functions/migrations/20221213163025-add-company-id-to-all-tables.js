'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const dataTypeObj = { 
      type: Sequelize.UUID,
      references: {
          model: {
              tableName: 'companies'
          },
          key: 'id'
      }
    };

    await queryInterface.addColumn(
      'customers',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'invoices',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'items',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'upload_meta_data',
      'company_id',
      dataTypeObj
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'customers',
      'company_id'
    );
    await queryInterface.removeColumn(
      'invoices',
      'company_id'
    );
    await queryInterface.removeColumn(
      'items',
      'company_id'
    );
    await queryInterface.removeColumn(
      'upload_meta_data',
      'company_id'
    );
  }
};
