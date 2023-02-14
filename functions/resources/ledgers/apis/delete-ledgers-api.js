const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteLedgerQuery = require('../queries/delete-ledgers-query');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete ledger',{});

    const response = await db.find(new DeleteLedgerQuery(id));

    return respond(response,'Successfully Deleted ledger', 'Failed to delete ledger')
}


Route.withSecurity().noAuth().delete('/ledgers/:id',get).bind();
