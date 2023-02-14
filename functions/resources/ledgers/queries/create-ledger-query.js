const { Ledger } = require("models");


module.exports = class CreateLedgerQuery {
    constructor(id, name, code, group, balanceDate, balance){
        this.details = {
            id, name, code, group, balanceDate, balance
        }
    }

    get(){
        return Ledger.create({...this.details})
    }
}   