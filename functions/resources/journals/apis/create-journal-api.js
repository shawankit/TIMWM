const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateJournalQuery = require('../queries/create-journal-query');
const CreateJournalLedgerInBulkQuery = require('../queries/create-journal-ledger-in-bulk-query');

const post = async (req) => {
    const { 
        jounalLedgers 
    } = req.body;

    logInfo('Request to create journals',{ });

    const journalId = uuid.v4();

    const response = await composeResult(
        () => db.findOne(new GetAJounalQuery(id)),
        () => db.create(new CreateJournalLedgerInBulkQuery(
            jounalLedgers.map((jounalLedger) => ({ ...jounalLedger, id: uuid.v4(), journalId }))
        )),
        () => db.execute(new CreateJournalQuery(journalId))
    )();

    return respond(response,'Successfully Created journals', 'Failed to create journals');
}

Route.withSecurity().noAuth().post('/journals',post).bind();

