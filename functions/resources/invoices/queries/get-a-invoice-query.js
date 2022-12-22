const { Invoice, Customer, Item, Transaction } = require("../../../models");

module.exports = class GetAInvoiceQuery {
    constructor(id){
        this.details = {id}
    }

    get(){
        return Invoice.findOne({
            where: this.details,
            include: [
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
                    model: Customer,
                    as: 'customer'
                }
            ]
        });
    }
}