const Result = require('folktale/result');
const {
    notEmpty,
    isStringNumeric,
    optional
} = require('validation');
const moment = require('moment');

const isValidDate = (date) => moment(date, 'DD-MM-YYYY').isValid();

const validationMessages = {
    companyName: [
        [notEmpty, 'Company Name is Mandatory!']
    ],
    division: [
        [notEmpty, 'Division is Mandatory!']
    ],
    receiptDate: [
        [notEmpty, 'Receipt Date is Mandatory!'],
        [isValidDate, 'Receipt Date should be in date format (DD-MM-YYYY)']
    ],
    customerCode: [
        [notEmpty, 'Customer Code is Mandatory!']
    ],
    nature: [
        [notEmpty, 'Nature is Mandatory!'],
    ],
    via: [
        [notEmpty, 'VIA is Mandatory!'],
    ],
    amount: [
        [notEmpty, 'Amount is Mandatory!'],
        [isStringNumeric, 'Amount should be number!']
    ]
};

module.exports.validate = async (csvErrorArray) => {
    csvErrorArray.forEach((sales) => {
        Object.keys(sales).forEach((key) => {
            if (validationMessages[key]) {
                validationMessages[key].forEach(([validr, errMsg]) => {
                    if (!validr(sales[key])) {
                        sales.reason.push(errMsg);
                    }
                });
            }
        });
    });
    return Result.Ok(csvErrorArray);
};
