const { Transaction } = require("../../../models");

module.exports = class CreateTransactionInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    async get() {
        const fieldsToUpdate = Object.keys(Transaction.getAttributes());
        const fieldsToExclude = ['id', 'createdAt']

        return Transaction.bulkCreate(this.details, {
            updateOnDuplicate: fieldsToUpdate.filter((field) => !fieldsToExclude.includes(field))
        });
    }
};
