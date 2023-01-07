const { Customer, Company } = require("../../../models");

module.exports = class GetCustomersQuery {
    constructor(type, search, offset = 0, limit, filters){
        this.details = { type, search, offset, limit, filters }
    }

    get(){
        return Customer.findAndCountAll({
            where: {
                type: this.details.type
            },
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