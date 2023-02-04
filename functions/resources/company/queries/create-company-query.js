const { Company } = require('models');

module.exports = class CreateCompanyQuery {
    constructor({
        id, name, division
    }) {
        this.details = {
            id,
            name,
            division
        };
    }

    get() {
        return Company.create(this.details);
    }
};
