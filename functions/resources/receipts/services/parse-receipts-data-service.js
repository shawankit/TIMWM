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
    let customersMap = {};
    let companiesMap = {};
    receipts.forEach((data, index) => {
        const { companyName, division, customerCode, nature, invoiceNumber, customerName } = data;
        
        let rowError = false;
        if(!customerCodeIdMap[customerCode]){
            if(typeof nature == 'string' && nature.toLowerCase() === 'adjust'){
                receipts[index].reason.push(`Add as Advance but for Adjust, customer code (${customerCode}) with invoice number should exist in system`);
                error = true;
                rowError = true;
            }
            if(typeof nature == 'string' && nature.toLowerCase() == 'advance'){
                customersMap[customerCode] = { customerId: uuid.v4(), customerName, companyName, division };
            }
        }

        if(!companyNameDivisionIdMap[`${companyName}::${division}`]){
            if(!rowError  && typeof nature == 'string' && nature.toLowerCase() === 'adjust'){
                receipts[index].reason.push(`Add as Advance but for Adjust, division(${division}) and company(${companyName}) with invoice number should exist in system`);
                error = true;
                rowError = true;
            }

            if(typeof nature == 'string' && nature.toLowerCase() == 'advance'){
                companiesMap[`${companyName}::${division}`] = { companyId: uuid.v4(), companyName, division };
            }
        }

        if( typeof nature != 'string' || (typeof nature == 'string' && !(['advance', 'adjust'].includes(nature.toLowerCase()) ))){
            receipts[index].reason.push(`Nature should be either ADVANCE or ADJUST`);
            error = true;
        }

        if(typeof nature == 'string' && nature.toLowerCase() == 'adjust'){
            if(!rowError  && invoiceNumber !== '' && !invoiceNumberIdMap[invoiceNumber]){
                receipts[index].reason.push(`${invoiceNumber}(Invoice Number) does not exist! Pleae add ${invoiceType} invoice ${invoiceNumber} or you can add receipt as advance`);
                error = true;
            }
            if(invoiceNumber == ''){
                receipts[index].reason.push(`(Invoice Number) is Mandatory For Nature ADJUST`);
                error = true;
            }
        }
    });

    let receiptsTobeCreated = [];
    let customersToBeCreated = [];
    let companyToBeCreated = [];
    if(!error){
        
        companyToBeCreated =  Object.entries(companiesMap).map(([key, value]) => {
            const { companyId, companyName, division } = value;
            companyNameDivisionIdMap[key] = companyId;

            return {
                id: companyId,
                name: companyName,
                division
            }
        });

        customersToBeCreated =  Object.entries(customersMap).map(([customerCode, value]) => {
            const {customerId, customerName, companyName, division } = value;
            customerCodeIdMap[customerCode] = customerId;

            return {
                id: customerId,
                type: invoiceType == 'sales' ? 'customer' : 'vendor',
                code: customerCode,
                name:  customerName,
                companyId: companyNameDivisionIdMap[`${companyName}::${division}`],
            }
        });

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
        customers: customersToBeCreated,
        companies: companyToBeCreated,
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