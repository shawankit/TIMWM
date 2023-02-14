const { Journal } = require("../../../models");


module.exports = class CreateJournalQuery {
    constructor(id){
        this.details = {
            id
        }
    }

    get(){
        return Journal.create({...this.details})
    }
}   