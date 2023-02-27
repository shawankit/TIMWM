const { Journal } = require("../../../models");

module.exports = class CreateJournalInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    async get() {
        const fieldsToUpdate = Object.keys(Journal.getAttributes());
        const fieldsToExclude = ['id', 'createdAt'];

        return Journal.bulkCreate(this.details, {
            updateOnDuplicate: fieldsToUpdate.filter((field) => !fieldsToExclude.includes(field))
        });
    }
};
