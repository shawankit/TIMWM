const { Company } = require("../../../models");

module.exports = class CreateCompanyInBulkQuery {
    constructor(list) {
        this.details = list;
    }

    get() {
        return Company.bulkCreate(this.details, {
            updateOnDuplicate: ['name', 'division']
        });
    }
};
