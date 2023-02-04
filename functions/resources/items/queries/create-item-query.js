const { Item } = require("../../../models");


module.exports = class CreateItemQuery {
    constructor(id,name,code,uom, rate, companyId){
        this.details = {
            id,name,code,uom, rate, companyId
        }
    }

    get(){
        return Item.create({...this.details})
    }
}   