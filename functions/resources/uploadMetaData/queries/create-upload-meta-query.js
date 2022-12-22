const { UploadMetaData } = require("./../../../models");


module.exports = class CreateUploadMetaDataQuery {
    constructor({id, type , message, uploadedBy}){
        this.details = {
            id, type , message, uploadedBy
        }
    }

    get(){
        return UploadMetaData.create({...this.details})
    }
}