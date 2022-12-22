const { Item } = require("../../../models");

module.exports = class GetItemsQuery {
    constructor(customerId){
        this.details = {customerId}
    }

    get(){
        return Item.findAndCountAll({
            order: ['createdAt']
        });
    }
}