const { Group } = require("../../../models");

module.exports = class GetGroupQuery {
    constructor(search, offset = 0, limit){
        this.details = {
            search, offset, limit
        }
    }

    get(){
        return Group.findAndCountAll({
            offset: this.details.offset,
            limit: this.details.limit,
            order: ['createdAt']
        });
    }
}