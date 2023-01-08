const { Item } = require("../../../models");

module.exports = class GetItemsQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Item.findAndCountAll({
            order: ['createdAt']
        });
    }
}