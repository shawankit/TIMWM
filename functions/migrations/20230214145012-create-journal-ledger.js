'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('journal_ledgers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      journalId: {
        type: Sequelize.UUID,
        field: 'journal_id',
        references: {
          model: {
              tableName: 'journals'
            },
            key: 'id'
        }
      },
      ledgerId: {
        type: Sequelize.UUID,
        field: 'ledger_id',
        references: {
          model: {
              tableName: 'ledgers'
            },
            key: 'id'
        }
      },
      type: {
        type: Sequelize.ENUM,
        values: ['debit', 'credit']
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
    await queryInterface.dropTable('journal_ledgers');
  }
};