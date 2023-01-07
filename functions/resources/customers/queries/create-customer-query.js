const { Customer } = require("./../../../models");


module.exports = class CreateCustomerQuery {
    constructor({ id, code, name , type, mobile, companyId, gstNumber }){
        this.details = {
            id, code, name , type, mobile, companyId, gstNumber 
        }
    }

    get(){
        return Customer.create({...this.details})
    }
}   