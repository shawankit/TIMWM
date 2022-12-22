const { Company } = require('models');

module.exports = class CreateCompanyQuery {
    constructor({
        id, name
    }) {
        this.details = {
            id,
            name
        };
    }

    get() {
        return Company.create(this.details);
    }
};
