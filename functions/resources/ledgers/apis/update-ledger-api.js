const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateLedgerQuery = require('../queries/update-ledger-query');

const post = async (req) => {

    const { id } = req.params; 
    const { name, code, group, balanceDate, balance }
     = req.body;

    logInfo('Request to update ledger',id);

    const response = await db.execute(new UpdateLedgerQuery(id, name, code, group, balanceDate, balance));

    return respond(response,'Successfully Updated ledger', 'Failed to update ledger')
}

Route.withSecurity().noAuth().put('/ledgers/:id',post).bind();

