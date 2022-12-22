const { validate, notEmpty, numeric } = require('validation');

const rule = {
    mobileNumber: [
        [notEmpty, 'Mobile Numbser is Mandatory!']
    ],
    otp: [[notEmpty, 'Otp should not be empty!']]
};

module.exports.validate = async (data) => validate(rule, data);
