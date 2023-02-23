const { Journal, Ledger } = require("../../../models");

module.exports = class GetJournalsQuery {
    constructor(search, offset = 0, limit, filters){
        this.details = {
            search, offset, limit, filters
        }
    }

    get(){
        return Journal.findAndCountAll({
            include: [
                {
                    model: Ledger,
                    as: 'ledgers',
                }
            ],
            offset: this.details.offset,
            limit: this.details.limit,
            order: [['createdAt', 'DESC']],
            distinct: true
        });
    }
}