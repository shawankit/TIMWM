const { Ledger } = require("../../../models");


module.exports = class UpdateLedgerQuery {
    constructor(id, name, code, groupId, balanceDate, balance){
        this.details = {
            id, name, code, groupId, balanceDate, balance
        }
    }

    async get(){
        const ledger = await Ledger.findOne({
            where: {
                id: this.details.id
            }
        });

        ledger.name = this.details.name;
        ledger.code = this.details.code;
        ledger.groupId = this.details.groupId;
        ledger.balanceDate = this.details.balanceDate;
        ledger.balance = this.details.balance;

        return ledger.save();
    }
}   