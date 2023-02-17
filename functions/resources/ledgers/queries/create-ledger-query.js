const { Ledger } = require("models");


module.exports = class CreateLedgerQuery {
    constructor(id, name, code, groupId, balanceDate, balance){
        this.details = {
            id, name, code, groupId, balanceDate, balance
        }
    }

    get(){
        return Ledger.create({...this.details})
    }
}   