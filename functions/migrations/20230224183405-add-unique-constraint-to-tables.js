
module.exports = {
  async up (queryInterface) {
      // await queryInterface.addConstraint('ledgers', {
      //     type: 'UNIQUE',
      //     fields: ['name'],
      //     name: 'ledgers_name_key'
      // });

      // await queryInterface.addConstraint('ledgers', {
      //     type: 'UNIQUE',
      //     fields: ['code'],
      //     name: 'ledgers_code_key'
      // });

    //   await queryInterface.addConstraint('customers', {
    //     type: 'UNIQUE',
    //     fields: ['code'],
    //     name: 'customers_code_key'
    // });
  },

  async down (queryInterface) {
    await queryInterface.removeConstraint('ledgers', 'ledgers_name_key');
    await queryInterface.removeConstraint('ledgers', 'ledgers_code_key');
    // await queryInterface.removeConstraint('customers', 'customers_code_key');
  }
};
