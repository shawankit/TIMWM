const { Invoice, Customer, Transaction, Company } = require("../../../models");

module.exports = class GetInvoicesQuery {
    constructor(type, search, offset = 0, limit){
        this.details = { type, search, offset, limit };
    }

    get(){
        return Invoice.findAndCountAll({
            where: {
                type: this.details.type
            },
            include: [
                {
                    model: Customer,
                    as: 'customer'
                },
                {
                    model: Transaction,
                    as: 'transactions'
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