const { Receipt } = require('models');

module.exports = class CreateReceiptsInBulkQuery {
    constructor({ receipts }) {
        this.details = receipts;
    }

    get() {
        return Receipt.bulkCreate(this.details)
    }
};
