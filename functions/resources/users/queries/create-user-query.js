const { User } = require("./../../../models");


module.exports = class CreateUserQuery {
    constructor(userId,name,email,password,mobileNumber){
        this.details = {
            id : userId,
            name,
            email,
            password,
            mobileNumber
        }
    }

    get(){
        return User.create({...this.details})
    }
}