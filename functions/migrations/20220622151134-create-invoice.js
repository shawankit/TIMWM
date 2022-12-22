'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      type:{
        type: Sequelize.ENUM,
        values: ['sales', 'purchase']
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        field: 'invoice_number',
      },
      customerId: {
        type: Sequelize.UUID,
        field: 'customer_id',
        references: {
            model: {
                tableName: 'customers'
            },
            key: 'id'
        }
      },
      invoiceDate: {
        type:  Sequelize.DATE,
        field: 'invoice_date'
      },
      labourCharges:  {
        type: Sequelize.DOUBLE,
        field: 'labour_charges'
      },
      claimAmount:  {
        type: Sequelize.DOUBLE,
        field: 'claim_amount'
      },
      taxableAmount:  {
        type: Sequelize.DOUBLE,
        field: 'taxable_amount'
      },
      igst:  {
        type: Sequelize.DOUBLE,
      },
      cgst:  {
        type: Sequelize.DOUBLE,
      },
      sgst:  {
        type: Sequelize.DOUBLE,
      },
      cess:  {
        type: Sequelize.DOUBLE,
      },
      roundOff:  {
        type: Sequelize.DOUBLE,
        field: 'round_off'
      },
      tcs:  {
        type: Sequelize.DOUBLE,
      },
      totalValue:  {
        type: Sequelize.DOUBLE,
        field: 'total_value'
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
    await queryInterface.dropTable('invoices');
  }
};