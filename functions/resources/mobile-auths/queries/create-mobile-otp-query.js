const { MobileAuth } = require('models');

module.exports = class CreateMobileOtpQuery {
    constructor(id, mobileNumber, otpHash, expiredAt) {
        this.details = {
            id,
            mobileNumber,
            otpHash,
            expiredAt
        };
    }

    get() {
        const {
            id, mobileNumber, otpHash, expiredAt
        } = this.details;
        return MobileAuth.create({
            id,
            mobileNumber,
            otpHash,
            expiredAt
        });
    }
};
