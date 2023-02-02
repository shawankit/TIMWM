'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'transactions',
      'total',
      Sequelize.DOUBLE
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'transactions',
      'total'
    );
  }
};
