const { Invoice } = require("./../../../models");


module.exports = class CreateInvoiceQuery {
    constructor({ 
        id, type, invoiceNumber, customerId, invoiceDate, companyId, labourCharges, claimAmount, taxableAmount, igst, cgst, sgst, cess, roundOff, tcs, totalValue
    }){
        this.details = {
            id, type, invoiceNumber, customerId, invoiceDate, companyId, labourCharges, claimAmount, taxableAmount, igst, cgst, sgst, cess, roundOff, tcs, totalValue
        }
    }

    get(){
        return  Invoice.create({...this.details});
    }
}   