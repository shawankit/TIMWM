const { Receipt, Customer, Invoice, Company } = require("../../../models");
const { Op } = require('sequelize');
module.exports = class GetReceiptsQuery {
    constructor(type, search, offset = 0, limit, filters){
        this.details = { type, search, offset, limit, filters };
    }

    get(){
        let condition = {
            type: this.details.type
        }
        let customerCondidtion = {};
        if (this.details.search) {
            customerCondidtion.where = {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${this.details.search}%` } },
                    { code: { [Op.iLike]: `%${this.details.search}%` } }
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
                    receiptDate: {
                        [Op.gte]: dateRange.fromDate,
                        [Op.lte]: dateRange.toDate
                    }
                };
            }
        }
        return Receipt.findAndCountAll({
            where: condition,
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    ...customerCondidtion
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