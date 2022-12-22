const { Item } = require("../../../models");


module.exports = class UpdateItemQuery {
    constructor(id,name,rate){
        this.details = {
            id,
            name,
            rate
        }
    }

    async get(){
        const item = await Item.findOne({
            where: {
                id: this.details.id
            }
        });

        item.name = this.details.name;
        item.rate = this.details.rate;

        return item.save();
    }
}   