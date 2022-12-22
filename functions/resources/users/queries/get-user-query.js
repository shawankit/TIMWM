
const {
    User
} = require('models');

module.exports = class GetUserDetailsQuery {
    constructor(mobileNumber) {
        this.details = { mobileNumber };
    }

    get() {
        return User.findOne({
            where: {
                mobileNumber: this.details.mobileNumber
            }
        });
    }
};
