const { JournalLedger } = require("../../../models");

module.exports = class CreateJournalLedgerInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    async get() {
        const fieldsToUpdate = Object.keys(JournalLedger.getAttributes());
        const fieldsToExclude = ['id', 'createdAt', 'journalId']

        return JournalLedger.bulkCreate(this.details);
    }
};
