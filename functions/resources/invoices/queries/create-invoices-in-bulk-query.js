const { Invoice } = require("../../../models");

module.exports = class CreateInvoiceInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    get() {
        const fieldsToUpdate = Object.keys(Invoice.getAttributes());
        const fieldsToExclude = ['id', 'createdAt']
        
        return Invoice.bulkCreate(this.details, {
            updateOnDuplicate: fieldsToUpdate.filter((field) => !fieldsToExclude.includes(field))
        });
    }
};
