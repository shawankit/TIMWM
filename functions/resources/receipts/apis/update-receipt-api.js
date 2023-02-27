const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateReceiptQuery = require('../queries/update-receipt-query');

const post = async (req) => {

    const { id } = req.params; 
    const {type, receiptDate, companyId, customerId, invoiceId, via, nature, amount }
     = req.body;

    logInfo('Request to update receipt',id);

    const response = await db.execute(new UpdateReceiptQuery(id, type, receiptDate, companyId, customerId, invoiceId, via, nature, amount));

    console.log('up', response);
    return respond(response,'Successfully Updated receipt', 'Failed to update receipt')
}

Route.withSecurity().noAuth().put('/receipts/:id',post).bind();

