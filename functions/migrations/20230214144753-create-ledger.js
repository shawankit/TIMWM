'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ledgers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.TEXT
      },
      code: {
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.UUID,
        field: 'group_id',
        references: {
          model: {
              tableName: 'groups'
            },
            key: 'id'
        }
      },
      balanceDate: {
        type: Sequelize.DATE,
        field: 'balance_date'
      },
      balance: {
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
    await queryInterface.dropTable('ledgers');
  }
};