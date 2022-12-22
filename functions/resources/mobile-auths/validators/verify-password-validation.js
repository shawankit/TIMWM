const { validate, notEmpty, numeric } = require('validation');

const rule = {
    mobileNumber: [
        [notEmpty, 'Mobile Numbser is Mandatory!']
    ],
    password: [[notEmpty, 'Password should not be empty!']],
    countryCode: [
        [notEmpty, 'countryCode is Mandatory!'],
        [numeric, 'countryCode should be number'],
        [(code) => code >= 1, 'countryCode must be valid']
    ]
};

module.exports.validate = async (data) => validate(rule, data);
