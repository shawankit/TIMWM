const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAInvoiceQuery = require('../queries/get-a-invoice-query');
const CreateTransactionInBulkQuery = require('../../transactions/queries/create-transactions-in-bulk-query');
const CreateInvoiceInBulkQuery = require('../queries/create-invoices-in-bulk-query');
const DeleteTransactionsQuery = require('../../transactions/queries/delete-transactions-query');

const post = async (req) => {
    const { 
        type, invoiceNumber, customerId, invoiceDate, companyId, labourCharges,
        claimAmount, taxableAmount, igst, cgst, sgst, cess, roundOff, tcs, totalValue,
        transactions
    } = req.body;

    logInfo('Request to update invoices',{ customerId , transactions, invoiceDate });

    const { id } = req.params;

    const response = await composeResult(
        () => db.create(new CreateTransactionInBulkQuery(
            transactions.map((transaction) => ({ ...transaction, customerId, id: transaction.id ? transaction.id : uuid.v4(), invoiceId: id }))
        )),
        (invoiceData) => composeResult(
            async () => {
                const oldTransactions = invoiceData.transactions;
                const deleteTransaction = oldTransactions.filter((existingTransaction) => !transactions.find((transaction) => existingTransaction.id === transaction.id))
                const deleteIds = deleteTransaction.map((tr) => tr.id);
                return deleteIds.length > 0 ? db.execute(new DeleteTransactionsQuery(deleteIds)) : Result.Ok({})
            },
            () => db.execute(new CreateInvoiceInBulkQuery(
                [{
                    id, type, invoiceNumber, customerId, invoiceDate, companyId, labourCharges, claimAmount, taxableAmount, igst, cgst, sgst, cess, roundOff, tcs, totalValue
                }]
            ))
        )(),
        () => db.findOne(new GetAInvoiceQuery(id)),
    )();

    return respond(response,'Successfully Updated invoices', 'Failed to update invoices');
}

Route.withSecurity().noAuth().put('/invoices/:id',post).bind();

