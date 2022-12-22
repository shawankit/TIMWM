const { Customer } = require("../../../models");

module.exports = class GetCustomersQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Customer.findAndCountAll({
            order: [['createdAt', 'DESC']]
        });
    }
}