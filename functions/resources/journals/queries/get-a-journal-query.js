const { Journal, Ledger } = require("../../../models");

module.exports = class GetAJounalQuery {
    constructor(id){
        this.details = {id}
    }

    get(){
        return Journal.findOne({
            where: this.details,
            include: [
                {
                    model: Ledger,
                    as: 'ledgers',
                }
            ]
        });
    }
}