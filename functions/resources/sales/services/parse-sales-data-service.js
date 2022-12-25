const { logInfo } = require('lib/functional/logger');
const { composeResult } = require('lib');
const uuid = require('uuid');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const GetAllDataService = require('./get-all-data-service');
const CreateCompanyInBulkQuery = require('../../company/queries/create-company-in-bulk-query');
const CreateCustomerInBulkQuery = require('../../customers/queries/create-customers-in-bulk-query');
const CreateInvoiceInBulkQuery = require('../../invoices/queries/create-invoices-in-bulk-query');
const CreateItemInBulkQuery = require('../../items/queries/create-Items-in-bulk-query');
const CreateTransactionInBulkQuery = require('../../transactions/queries/create-transactions-in-bulk-query');

const get0IfEmpty = (value) => value === "" ? 0 : value;

const processData = async (sales, type) => {
    const companyNameMap = {};
    sales.forEach(data => {
        const { companyName, division, customerCode, invoiceNumber } = data;
        if(!companyNameMap[companyName]){
            companyNameMap[companyName] = {};
        }

        const divisionMap =  companyNameMap[companyName];
        if(!divisionMap[division]){
            divisionMap[division] = {}
        }

        const customerMap =  divisionMap[division];
        if(!customerMap[customerCode]){
            customerMap[customerCode] = {
                invoiceMap: {},
                name: data.customerName,
                gstNumber: data.gstNumber
            }
        }

        const customer =  customerMap[customerCode];
        if(!customer.invoiceMap[invoiceNumber]){
            customer.invoiceMap[invoiceNumber] = {
                items: [],
                type,
                invoiceDate: data.invoiceDate,
                labourCharges: get0IfEmpty(data.labourCharges),
                claimAmount: get0IfEmpty(data.claimAmount),
                taxableAmount: get0IfEmpty(data.taxableAmount),
                igst: get0IfEmpty(data.igst),
                cgst: get0IfEmpty(data.cgst),
                sgst: get0IfEmpty(data.sgst),
                cess: get0IfEmpty(data.cess),
                roundOff: get0IfEmpty(data.roundOff),
                tcs: get0IfEmpty(data.tcs),
                totalValue: get0IfEmpty(data.totalValue)
            }
        }

        const invoice =  customer.invoiceMap[invoiceNumber];
        invoice.items.push({
            code: data.itemCode,
            name: data.itemName,
            quantity: get0IfEmpty(data.quantity),
            uom: data.uom,
            rate: get0IfEmpty(data.rate)
        });
    });
    
    return Result.Ok(companyNameMap);
}

module.exports.perform = async (sales, type) => {
    logInfo('parse sales data service ', sales);

    return composeResult(
        (dataMap) => composeResult(
            (allDbMap) => {
                const { companyNameDivisionIdMap, itemCodeIdMap, customerCodeIdMap, invoiceNumberIdMap, transactionIdMap } = allDbMap;
                const companies = [];
                const customers = [];
                const invoices = [];
                const items = [];
                const transactions = [];

                const localItemMap = {};

                Object.keys(dataMap).forEach((companyName) => {
                    const divisionMap = dataMap[companyName];
                    Object.keys(divisionMap).forEach((division) => {
                        const existingCompanyId = companyNameDivisionIdMap[`${companyName}::${division}`];
                        const companyId =  existingCompanyId ? existingCompanyId : uuid.v4();
                        companies.push({
                            id: companyId,
                            name: companyName,
                            division
                        });

                        const customersMap = divisionMap[division];
                        Object.keys(customersMap).forEach((customerCode) => {
                            const existingCustomerId = customerCodeIdMap[customerCode];
                            const customer = customersMap[customerCode];
                            const customerId = existingCustomerId ? existingCustomerId : uuid.v4();
                            customers.push({
                                id: customerId,
                                type: type == 'sales' ? 'customer' : 'vendor',
                                code: customerCode,
                                name: customer.name,
                                gstNumber: customer.gstNumber,
                                companyId
                            });

                            const { invoiceMap } = customer;
                            Object.keys(invoiceMap).forEach((invoiceNumber) => {
                                const existingInvoiceId = invoiceNumberIdMap[invoiceNumber];
                                const invoice = invoiceMap[invoiceNumber];
                                const invoiceId = existingInvoiceId ? existingInvoiceId : uuid.v4();
                                
                                invoices.push({
                                    id: invoiceId,
                                    invoiceNumber,
                                    type: invoice.type,
                                    invoiceDate: invoice.invoiceDate,
                                    companyId,
                                    customerId,
                                    labourCharges: invoice.labourCharges,
                                    claimAmount: invoice.claimAmount,
                                    taxableAmount: invoice.taxableAmount,
                                    igst: invoice.igst,
                                    cgst: invoice.cgst,
                                    sgst: invoice.sgst,
                                    cess: invoice.cess,
                                    roundOff: invoice.roundOff,
                                    tcs: invoice.tcs,
                                    totalValue: invoice.totalValue
                                });

                                invoice.items.forEach((item) => {
                                    if(localItemMap[item.code] === undefined){
                                        localItemMap[item.code] = items.length;
                                        const initialItemId = itemCodeIdMap[item.code] ? itemCodeIdMap[item.code] : uuid.v4();

                                        items.push({
                                            id : initialItemId,
                                            code: item.code,
                                            name: item.name,
                                            uom: item.uom,
                                            rate: item.rate,
                                            companyId
                                        })
                                    }
                                    const itemId = items[localItemMap[item.code]].id;

                                    const existingTransactionId = transactionIdMap[`${invoiceId}::${itemId}`];
                                    const transactionId = existingTransactionId ? existingTransactionId : uuid.v4();
                                    transactions.push({
                                        id: transactionId,
                                        quantity: item.quantity,
                                        rate: item.rate,
                                        itemId,
                                        invoiceId,
                                        customerId
                                    });
                                });
                            });

                        });
                    });
                });

                console.log('companies', companies);
                console.log('customers', customers);
                console.log('invoices', invoices);
                console.log('items', items);
                console.log('transactions', transactions);

                return composeResult(
                    () => db.create(new CreateTransactionInBulkQuery(transactions)),
                    () => db.create(new CreateItemInBulkQuery(items)),
                    () => db.create(new CreateInvoiceInBulkQuery(invoices)),
                    () => db.create(new CreateCustomerInBulkQuery(customers)),
                    () => db.create(new CreateCompanyInBulkQuery(companies))
                )();
            },
            () => GetAllDataService.perform(type)
        )(),
        () => processData(sales, type)
    )()
}