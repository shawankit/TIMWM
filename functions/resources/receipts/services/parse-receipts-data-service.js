const { logInfo } = require('lib/functional/logger');
const { composeResult } = require('lib');
const uuid = require('uuid');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const GetAllDataService = require('./../../sales/services/get-all-data-service');
const moment = require('moment');

const get0IfEmpty = (value) => value === "" ? 0 : value;

const processData = async (receipts, type, allDbMap, invoiceType) => {
    const { companyNameDivisionIdMap, customerCodeIdMap, invoiceNumberIdMap } = allDbMap;
    let error = false;
    const customerType = type == 'receipts' ? 'Customer' : 'Vendor'
    receipts.forEach((data, index) => {
        const { companyName, division, customerCode, nature, invoiceNumber } = data;
        
        if(!customerCodeIdMap[customerCode]){
            receipts[index].reason.push(`${customerCode}(${customerType} Code) does not exist! Pleae add ${invoiceType} invoice for ${customerCode}`);
            error = true;
        }

        if(!companyNameDivisionIdMap[`${companyName}::${division}`]){
            receipts[index].reason.push(`${companyName} and ${division}(Company and Division) does not exist! Pleae add ${invoiceType} invoice for ${companyName} and ${division}`);
            error = true;
        }

        if( typeof nature != 'string' || (typeof nature == 'string' && !(['advance', 'adjust'].includes(nature.toLowerCase()) ))){
            receipts[index].reason.push(`Nature should be either ADVANCE or ADJUST`);
            error = true;
        }

        if(nature.toLowerCase() == 'adjust'){
            if(invoiceNumber !== '' && !invoiceNumberIdMap[invoiceNumber]){
                receipts[index].reason.push(`${invoiceNumber}(Invoice Number) does not exist! Pleae add ${invoiceType} invoice ${invoiceNumber}`);
                error = true;
            }
            if(invoiceNumber == ''){
                receipts[index].reason.push(`(Invoice Number) is Mandatory For Nature ADJUST`);
                error = true;
            }
        }
    });

    let receiptsTobeCreated = [];
    if(!error){
        receiptsTobeCreated = receipts.map((data, index) => {
            const { companyName, division, customerCode, nature, invoiceNumber, amount, via, receiptDate } = data;
            
            return {
                id: uuid.v4(),
                companyId: companyNameDivisionIdMap[`${companyName}::${division}`],
                customerId: customerCodeIdMap[customerCode],
                nature: nature.toLowerCase(),
                invoiceId: nature.toLowerCase() == 'adjust' ? invoiceNumberIdMap[invoiceNumber] : null,
                amount,
                type,
                via,
                receiptDate: moment(receiptDate, 'DD-MM-YYYY').format('YYYY-MM-DD')
            }
        });
    }
    
    return Result.Ok({
        receiptsTobeCreated,
        error 
    });
}

module.exports.perform = async (receipts, type) => {
    logInfo('parse receipts data service ', type);

    const invoiceType = type == 'receipts' ? 'sales' : 'purchase' 
    return composeResult(
        (allDbData) => processData(receipts, type, allDbData, invoiceType),
        () => GetAllDataService.perform(invoiceType)
    )()
}