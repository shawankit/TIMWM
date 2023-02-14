const { Ledger } = require("../../../models");

module.exports = class GetLedgersQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Ledger.findAndCountAll({
            order: ['createdAt']
        });
    }
}