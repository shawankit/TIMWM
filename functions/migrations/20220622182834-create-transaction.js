'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
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
      itemId: {
        type: Sequelize.UUID,
        field: 'item_id',
        references: {
            model: {
                tableName: 'items'
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
      quantity: {
        type: Sequelize.DOUBLE
      },
      rate: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};