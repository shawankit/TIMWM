const { Group } = require("../../../models");


module.exports = class UpdateGroupQuery {
    constructor(id, name){
        this.details = {
            id, name
        }
    }

    async get(){
        const ledger = await Group.findOne({
            where: {
                id: this.details.id
            }
        });

        ledger.name = this.details.name;

        return ledger.save();
    }
}   