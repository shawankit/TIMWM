const { Customer } = require("../../../models");

module.exports = class CreateCustomerInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    get() {
        return Customer.bulkCreate(this.details, {
            updateOnDuplicate: ['name', 'gstNumber', 'mobile', 'due']
        });
    }
};
