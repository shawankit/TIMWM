const { Company } = require('models');

module.exports = class UpdateCompanyQuery {
    constructor({
        id, name, division
    }) {
        this.details = {
            id,
            name,
            division
        };
    }

    async get() {
        const company = await Company.findOne({
            where: {
                id: this.details.id
            }
        });

        company.name = this.details.name;
        company.division = this.details.division;

        return company.save();
    }
};
