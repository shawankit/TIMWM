const { MobileAuth } = require('models');

module.exports = class GetMobileOtpQuery {
    constructor(mobileNumber) {
        this.details = {
            mobileNumber
        };
    }

    get() {
        return MobileAuth.findOne({
            where: { mobileNumber: this.details.mobileNumber },
            order: [['createdAt', 'DESC']]
        });
    }
};
