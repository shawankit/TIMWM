const { Ledger, Group } = require("../../../models");

module.exports = class GetLedgersQuery {
    constructor(search, offset, limit, filters){
        this.details = {
            search, offset, limit, filters
        }
    }

    get(){
        return Ledger.findAndCountAll({
            include: [
                {
                    model: Group,
                    as: 'group',
                }
            ],
            offset: this.details.offset,
            limit: this.details.limit,
            order: ['createdAt']
        });
    }
}