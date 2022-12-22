const { Item } = require("../../../models");


module.exports = class CreateItemQuery {
    constructor(id,name,rate,taxable, gstRate){
        this.details = {
            id,
            name,
            rate
        }
    }

    get(){
        return Item.create({...this.details})
    }
}   