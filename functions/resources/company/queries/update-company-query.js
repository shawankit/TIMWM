const { Company } = require('models');

module.exports = class UpdateCompanyQuery {
    constructor({
        id, name
    }) {
        this.details = {
            id,
            name
        };
    }

    async get() {
        const company = await Company.findOne({
            where: {
                id: this.details.id
            }
        });

        company.name = this.details.name;

        return company.save();
    }
};
