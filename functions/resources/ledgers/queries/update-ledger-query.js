const { Ledger } = require("../../../models");


module.exports = class UpdateLedgerQuery {
    constructor(id, name, code, group, balanceDate, balance){
        this.details = {
            id, name, code, group, balanceDate, balance
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
        ledger.group = this.details.group;
        ledger.balanceDate = this.details.balanceDate;
        ledger.balance = this.details.balance;

        return ledger.save();
    }
}   