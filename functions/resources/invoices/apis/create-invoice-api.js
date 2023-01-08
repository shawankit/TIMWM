const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateInvoiceQuery = require('../queries/create-invoice-query');
const GetAInvoiceQuery = require('../queries/get-a-invoice-query');
const CreateTransactionInBulkQuery = require('../../transactions/queries/create-transactions-in-bulk-query');

const post = async (req) => {
    const { 
        type, invoiceNumber, customerId, invoiceDate, companyId, labourCharges,
        claimAmount, taxableAmount, igst, cgst, sgst, cess, roundOff, tcs, totalValue,
        transactions 
    } = req.body;

    logInfo('Request to create invoices',{ customerId , totalValue, transactions, invoiceDate });

    const id = uuid.v4();

    const response = await composeResult(
        () => db.findOne(new GetAInvoiceQuery(id)),
        () => db.create(new CreateTransactionInBulkQuery(
            transactions.map((transaction) => ({ ...transaction, id: uuid.v4(), customerId, invoiceId: id }))
        )),
        () => db.execute(new CreateInvoiceQuery({
            id, type, invoiceNumber, customerId, invoiceDate, companyId, labourCharges, claimAmount, taxableAmount, igst, cgst, sgst, cess, roundOff, tcs, totalValue
        }))
    )();

    return respond(response,'Successfully Created invoices', 'Failed to create invoices');
}

Route.withSecurity().noAuth().post('/invoices',post).bind();

