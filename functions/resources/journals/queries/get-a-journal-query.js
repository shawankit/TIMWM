const { Journal, JournalLedger } = require("../../../models");

module.exports = class GetAJounalQuery {
    constructor(id){
        this.details = {id}
    }

    get(){
        return Journal.findOne({
            where: this.details,
            include: [
                {
                    model: JournalLedger,
                    as: 'journalLedgers',
                }
            ]
        });
    }
}