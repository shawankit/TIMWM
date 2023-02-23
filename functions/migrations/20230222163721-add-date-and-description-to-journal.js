'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'journals',
      'dated',
      Sequelize.DATEONLY
    );

    await queryInterface.addColumn(
      'journals',
      'description',
      Sequelize.TEXT
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'dated',
      'total'
    );

    await queryInterface.removeColumn(
      'journals',
      'description'
    );
  }
};
