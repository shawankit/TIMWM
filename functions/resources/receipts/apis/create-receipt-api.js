const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateReceiptQuery = require('../queries/create-receipt-query');

const post = async (req) => {
    const { type, receiptDate, companyId, customerId, invoiceId, via, nature, amount}
     = req.body;

    logInfo('Request to create receipts',type);

    const id = uuid.v4();

    const response = await db.execute(new CreateReceiptQuery(id,  type, receiptDate, companyId, customerId, invoiceId, via, nature, amount));

    return respond(response,'Successfully Created receipts', 'Failed to create receipts')
}

Route.withSecurity().noAuth().post('/receipts',post).bind();

