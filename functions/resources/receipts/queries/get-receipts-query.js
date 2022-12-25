const { Receipt, Customer, Invoice, Company } = require("../../../models");

module.exports = class GetReceiptsQuery {
    constructor(type, search, offset = 0, limit){
        this.details = { type, search, offset, limit };
    }

    get(){
        return Receipt.findAndCountAll({
            where: {
                type: this.details.type
            },
            include: [
                {
                    model: Customer,
                    as: 'customer'
                },
                {
                    model: Invoice,
                    as: 'invoice'
                },
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