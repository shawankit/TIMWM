const { Invoice, Customer, Transaction, Company, Item } = require("../../../models");
const { Op } = require('sequelize');
module.exports = class GetInvoicesQuery {
    constructor(type, search, offset = 0, limit, filters){
        this.details = { type, search, offset, limit, filters };
    }

    get(){
        let condition = {
            type: this.details.type
        }
        if (this.details.search) {
            condition = {
                ...condition,
                [Op.or]: [
                    { invoiceNumber: { [Op.iLike]: `%${this.details.search}%` } }
                ]
            };
        }
        if(this.details.filters){
            const { customerIds, companyIds, dateRange } = this.details.filters;

            if(customerIds && customerIds.length){
                condition = {
                    ...condition,
                    customerId: customerIds
                }
            }

            if(companyIds && companyIds.length){
                condition = {
                    ...condition,
                    companyId: companyIds
                }
            }

            if(dateRange && dateRange.fromDate && dateRange.toDate){
                condition = {
                    ...condition,
                    invoiceDate: {
                        [Op.gte]: dateRange.fromDate,
                        [Op.lte]: dateRange.toDate
                    }
                };
            }
        }
        return Invoice.findAndCountAll({
            where: condition,
            include: [
                {
                    model: Customer,
                    as: 'customer'
                },
                {
                    model: Transaction,
                    as: 'transactions',
                    include: [
                        {
                            model: Item,
                            as: 'item'
                        }
                    ]
                },
                {
                    model: Company,
                    as: 'company'
                },
            ],
            offset: this.details.offset,
            limit: this.details.limit,
            order: [['createdAt', 'DESC']],
            distinct: true
        });
    }
}