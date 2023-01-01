'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('receipts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      type:{
        type: Sequelize.ENUM,
        values: ['receipts', 'payments']
      },
      receiptDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'receipt_date'
      },
      companyId: {
        type: Sequelize.UUID,
        field: 'company_id',
        references: {
          model: {
              tableName: 'companies'
          },
          key: 'id'
        }
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
      invoiceId: {
        type: Sequelize.UUID,
        field: 'invoice_id',
        references: {
            model: {
                tableName: 'invoices'
            },
            key: 'id'
        }
      },
      via: {
        type: Sequelize.TEXT
      },
      nature: {
        type: Sequelize.ENUM,
        values: ['advance', 'adjust']
      },
      amount: {
        type: Sequelize.DOUBLE
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
  async down(queryInterface) {
    await queryInterface.dropTable('receipts');
  }
};