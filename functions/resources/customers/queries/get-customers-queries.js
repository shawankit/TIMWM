const { Customer } = require("../../../models");

module.exports = class GetCustomersQuery {
    constructor(type){
        this.details = { type }
    }

    get(){
        return Customer.findAndCountAll({
            where: {
                type: this.details.type
            },
            order: [['createdAt', 'DESC']]
        });
    }
}