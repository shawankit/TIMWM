const { MobileAuth } = require('models');

module.exports = class DeleteMobileOtpQuery {
    constructor(mobileNumber) {
        this.details = {
            mobileNumber
        };
    }

    get() {
        return MobileAuth.destroy({
            where: { mobileNumber: this.details.mobileNumber }
        });
    }
};
