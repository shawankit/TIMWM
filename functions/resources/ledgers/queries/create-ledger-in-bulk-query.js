const { Ledger } = require("../../../models");

module.exports = class CreateLedgerInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    async get() {
        const fieldsToUpdate = Object.keys(Ledger.getAttributes());
        const fieldsToExclude = ['id', 'createdAt'];

        return Ledger.bulkCreate(this.details, {
            updateOnDuplicate: fieldsToUpdate.filter((field) => !fieldsToExclude.includes(field))
        });
    }
};
