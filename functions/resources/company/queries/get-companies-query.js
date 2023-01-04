const { Company, User, Role, UserRole } = require('models');
const { Op } = require('sequelize');

module.exports = class GetCompaniesQuery {
    constructor(search, offset = 0, limit, filters) {
        this.search = search;
        this.offset = offset;
        this.limit = limit;
        this.filters = filters
    }

    async get() {
        let condition = {};
        if (this.search) {
            condition = {
                ...condition,
                name: { [Op.iLike]: `%${this.search}%` }
            };
        }
        return Company.findAndCountAll({
            order: [['createdAt', 'DESC']],
            offset: this.offset,
            limit: this.limit
        });
    }
};
