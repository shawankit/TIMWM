module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.changeColumn('receipts', 'receipt_date', {
          allowNull: true,
          type: Sequelize.DATEONLY
      });
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn('receipts', 'receipt_date', {
          allowNull: true,
          type: Sequelize.DATE
      });
  }
};
