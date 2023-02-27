const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const db = require('db/repository');
const DeleteReceiptQuery = require('../queries/delete-receipt-query');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete receipt',{});

    const response = await db.find(new DeleteReceiptQuery(id));

    return respond(response,'Successfully Deleted receipt', 'Failed to delete receipt')
}


Route.withSecurity().noAuth().delete('/receipts/:id',get).bind();
