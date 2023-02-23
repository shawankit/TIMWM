const { Journal } = require("../../../models");


module.exports = class UpdateJournalQuery {
    constructor(id, dated, description){
        this.details = {
            id, dated, description
        }
    }

    async get(){
        const ledger = await Journal.findOne({
            where: {
                id: this.details.id
            }
        });

        ledger.dated = this.details.dated;
        ledger.description = this.details.description;
        return ledger.save();
    }
}   