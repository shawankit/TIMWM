const {
    Company
} = require('models');

module.exports = class GetCompanyByIdQuery {
    constructor(id) {
        this.id = id;
    }

    get() {
        return Company.findOne({
            where: { id: this.id }
        });
    }
};
