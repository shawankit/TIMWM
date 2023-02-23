const { Journal } = require("../../../models");


module.exports = class CreateJournalQuery {
    constructor(id, dated, description ){
        this.details = {
            id, dated, description 
        }
    }

    get(){
        return Journal.create({...this.details})
    }
}   