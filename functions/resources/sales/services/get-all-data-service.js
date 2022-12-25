const { logInfo } = require('lib/functional/logger');
const { composeResult } = require('lib');
const Result = require('folktale/result');
const db = require('db/repository');
const GetCompaniesQuery = require('../../company/queries/get-companies-query');
const GetCustomersQuery = require('../../customers/queries/get-customers-queries');
const GetItemsQuery = require('../../items/queries/get-items-queries');
const GetInvoicesQuery = require('../../invoices/queries/get-invoices-query');
const GetTransactionQuery = require('../../transactions/queries/get-all-transactions-query');


const getCompanyNameIdMap = (companies) => companies.reduce((result, company) => ({ ...result, [`${company.name}::${company.division}`]: company.id }), {});

const getItemsCodeIdMap = (items) => items.reduce((result, item) => ({ ...result, [item.code]: item.id }), {});

const getCustomerCodeIdMap = (customers) => customers.reduce((result, customer) => ({ ...result, [customer.code]: customer.id }), {});

const getInvoiceNumberIdMap = (invoices) => invoices.reduce((result, invoice) => ({ ...result, [invoice.invoiceNumber]: invoice.id }), {});
const getTransactionInvoiceIdMap = (invoices) => invoices.reduce((result, transaction) => ({ ...result, [`${transaction.invoiceId}::${transaction.itemId}`]: transaction.id }), {});

module.exports.perform = (type) => {
    logInfo('Request to get datas service');
    const customerType = type == 'sales' ? 'customer' : 'vendor'
    return composeResult(
        (companies) => composeResult(
            (customers) => composeResult(
                (items) => composeResult(
                    (invoices) => composeResult(
                        async (transactions) => {
                            const data = {
                                companyNameDivisionIdMap: getCompanyNameIdMap(companies.rows),
                                itemCodeIdMap: getItemsCodeIdMap(items.rows),
                                customerCodeIdMap: getCustomerCodeIdMap(customers.rows),
                                invoiceNumberIdMap: getInvoiceNumberIdMap(invoices.rows),
                                transactionIdMap: getTransactionInvoiceIdMap(transactions.rows)
                            };
    
                            return Result.Ok(data);
                        },
                        () => db.execute(new GetTransactionQuery())
                    )(),
                    () => db.execute(new GetInvoicesQuery(type))
                )(),
                () => db.findOne(new GetItemsQuery()),
            )(),
            () => db.find(new GetCustomersQuery(customerType)),
        )(),
        () => db.find(new GetCompaniesQuery()),
    )();
};
