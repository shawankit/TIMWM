const { Item } = require("../../../models");


module.exports = class CreateBulkItemQuery {
    constructor(rates){
        this.details = {
            rates
        }
    }

    get(){
        return Item.bulkCreate(this.details.rates, {
            updateOnDuplicate: ["name", 'rate'],
        });
    }
}   