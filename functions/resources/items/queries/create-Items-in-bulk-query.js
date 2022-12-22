const { Item } = require("../../../models");

module.exports = class CreateItemInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    get() {
        const fieldsToUpdate = Object.keys(Item.getAttributes());
        const fieldsToExclude = ['id', 'createdAt']
        
        return Item.bulkCreate(this.details, {
            updateOnDuplicate: fieldsToUpdate.filter((field) => !fieldsToExclude.includes(field))
        });
    }
};
