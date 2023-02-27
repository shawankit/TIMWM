const { Receipt } = require("../../../models");


module.exports = class UpdateReceiptQuery {
    constructor(id, type, receiptDate, companyId, customerId, invoiceId, via, nature, amount){
        this.details = {
            id, type, receiptDate, companyId, customerId, invoiceId, via, nature, amount
        }
    }

    async get(){
        const receipt = await Receipt.findOne({
            where: {
                id: this.details.id
            }
        });

        receipt.receiptDate = this.details.receiptDate;
        receipt.customerId = this.details.customerId;
        receipt.invoiceId = this.details.invoiceId;
        receipt.via = this.details.via;
        receipt.nature = this.details.nature;
        receipt.amount = this.details.amount;
        
      
        return receipt.save();
    }
}   