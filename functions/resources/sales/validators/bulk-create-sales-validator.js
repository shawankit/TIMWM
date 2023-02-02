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
    customerName: [
        [notEmpty, 'Customer Name is Mandatory!'],
    ],
    customerCode: [
        [notEmpty, 'Customer Code is Mandatory!']
    ],
    invoiceDate: [
        [notEmpty, 'Invoice Date is Mandatory!'],
        [isValidDate, 'Invoice Date should be in date format (DD-MM-YYYY)']
    ],
    invoiceNumber: [
        [notEmpty, 'Invoice Number is Mandatory!'],
    ],
    quantity: [
        [notEmpty, 'Quantity is Mandatory!'],
        [isStringNumeric, 'Quantity should be numberic']
    ],
    itemCode: [
        [notEmpty, 'Item Code is Mandatory!']
    ],
    itemName: [
        [notEmpty, 'Item Name is Mandatory!']
    ],
    itemValue: [
        [notEmpty, 'Item Value is Mandatory!'],
        [isStringNumeric, 'Item Value should be numberic']
    ],
    labourCharges: [
        [optional(isStringNumeric), 'Labour Charges should be number!']
    ],
    claimAmount: [
        [optional(isStringNumeric), 'Claim Amount should be number!']
    ],
    taxableAmount: [
        [optional(isStringNumeric), 'Taxable Amount should be number!']
    ],
    igst: [
        [optional(isStringNumeric), 'IGST should be number!']
    ],
    cgst: [
        [optional(isStringNumeric), 'CGST should be number!']
    ],
    sgst: [
        [optional(isStringNumeric), 'SGST should be number!']
    ],
    cess: [
        [optional(isStringNumeric), 'CESS should be number!']
    ],
    roundOff: [
        [optional(isStringNumeric), 'Round Off should be number!']
    ],
    tcs: [
        [optional(isStringNumeric), 'TCS should be number!']
    ],
    totalValue: [
        [optional(isStringNumeric), 'Total Value should be number!']
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
