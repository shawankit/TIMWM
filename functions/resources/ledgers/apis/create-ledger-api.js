const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateLedgerQuery = require('../queries/create-ledger-query');

const post = async (req) => {
    const { name, code, groupId, balanceDate, balance}
     = req.body;

    logInfo('Request to create ledgers',name);

    const id = uuid.v4();

    const response = await db.execute(new CreateLedgerQuery(id, name, code, groupId, balanceDate, balance));

    return respond(response,'Successfully Created ledgers', 'Failed to create ledgers')
}

Route.withSecurity().noAuth().post('/ledgers',post).bind();

