const { Item } = require("../../../models");


module.exports = class UpdateItemQuery {
    constructor(id,name,code,uom,rate, companyId){
        this.details = {
            id,name,code,uom,rate, companyId
        }
    }

    async get(){
        const item = await Item.findOne({
            where: {
                id: this.details.id
            }
        });

        item.name = this.details.name;
        item.code = this.details.code;
        item.rate = this.details.rate;
        item.uom = this.details.uom;
        item.companyId = this.details.companyId;

        return item.save();
    }
}   