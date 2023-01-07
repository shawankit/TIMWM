const { Customer } = require("../../../models");


module.exports = class UpdateCustomerQuery {
    constructor(id,{ code, name , type, mobile, companyId, gstNumber }){
        this.details = {
            id, code, name , type, mobile, companyId, gstNumber
        }
    }

    async get(){
        const customer = await Customer.findOne({
            where: {
                id: this.details.id
            }
        });

        customer.name = this.details.name;
        customer.name = this.details.name;
        customer.companyId = this.details.companyId;
        customer.mobile = this.details.mobile;
        customer.gstNumber = this.details.gstNumber;

        return customer.save();
    }
}   