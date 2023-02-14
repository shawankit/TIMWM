const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAJounalQuery = require('../queries/get-a-journal-query');
const DeleteJournalLedgersQuery = require('../queries/delete-journal-ledgers-query');
const DeleteJournalQuery = require('../queries/delete-journal-query');

const post = async (req) => {
    const { } = req.body;

    logInfo('Request to delete journals',{ });

    const { id } = req.params;

    const response = await composeResult(
        () => db.execute(new DeleteJournalQuery(id)),
        (journalData) => composeResult(
            async () => {
                const ledgers = journalData.ledgers;
                const deleteIds = ledgers.map((tr) => tr.JournalLedger.id);
                return deleteIds.length > 0 ? db.execute(new DeleteJournalLedgersQuery(deleteIds)) : Result.Ok({})
            },
        )(),
        () => db.findOne(new GetAJounalQuery(id)),
    )();

    return respond(response,'Successfully Deleted journals', 'Failed to delete journals');
}

Route.withSecurity().noAuth().delete('/journals/:id',post).bind();

