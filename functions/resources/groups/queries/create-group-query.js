const { Group } = require("models");


module.exports = class CreateGroupQuery {
    constructor(id, name){
        this.details = {
            id, name
        }
    }

    get(){
        return Group.create({...this.details})
    }
}   