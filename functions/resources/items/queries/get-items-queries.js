const { Item } = require("../../../models");

module.exports = class GetItemsQuery {
    constructor(search, offset = 0, limit){
        this.details = {
            search, offset, limit
        }
    }

    get(){
        return Item.findAndCountAll({
            offset: this.details.offset,
            limit: this.details.limit,
            order: ['createdAt']
        });
    }
}