const { Receipt } = require("models");


module.exports = class CreateReceiptQuery {
    constructor(id, type, receiptDate, companyId, customerId, invoiceId, via, nature, amount){
        this.details = {
            id, type, receiptDate, companyId, customerId, invoiceId, via, nature, amount
        }
    }

    get(){
        return Receipt.create({...this.details})
    }
}   