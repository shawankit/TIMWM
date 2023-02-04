const { Company } = require('models');

module.exports = class DeleteCompanyQuery {
    constructor(companyId) {
        this.details = {
            companyId
        };
    }

    get() {
        return Company.destroy({
            where: {
                id: this.details.companyId
            }
        });
    }
};
