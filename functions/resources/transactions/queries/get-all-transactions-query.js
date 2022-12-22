const { Invoice, Customer, Transaction } = require("../../../models");

module.exports = class GetTransactionQuery {
    constructor(date){
        this.details = {}
    }

    get(){
        return Transaction.findAndCountAll({
            order: [['createdAt', 'DESC']]
        });
    }
}