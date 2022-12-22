const { Sales } = require('models');

module.exports = class CreateSalesInBulkQuery {
    constructor({ sales }) {
        this.details = sales;
    }

    get() {
        return Sales.bulkCreate(this.details)
    }
};
