const { Customer, Company } = require("../../../models");
const { Op } = require('sequelize');

module.exports = class GetCustomersQuery {
    constructor(type, search, offset = 0, limit, filters){
        this.details = { type, search, offset, limit, filters }
    }

    get(){

        let condition = {
            type: this.details.type
        }

        if (this.details.search) {
            condition = {
                ...condition,
                name: { [Op.iLike]: `%${this.details.search}%` }
            };
        }

        if(this.details.filters){
            const { companyIds } = this.details.filters;

            if(companyIds && companyIds.length){
                condition = {
                    ...condition,
                    companyId: companyIds
                }
            }
        }
        return Customer.findAndCountAll({
            where: condition,
            include: [
                {
                    model: Company,
                    as: 'company'
                }
            ],
            offset: this.details.offset,
            limit: this.details.limit,
            order: [['createdAt', 'DESC']],
            distinct: true
        });
    }
}