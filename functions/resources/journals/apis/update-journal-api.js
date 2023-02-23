const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAJounalQuery = require('../queries/get-a-journal-query');
const DeleteJournalLedgersQuery = require('../queries/delete-journal-ledgers-query');
const CreateJournalLedgerInBulkQuery = require('../queries/create-journal-ledger-in-bulk-query');
const UpdateJournalQuery = require('../queries/update-journal-query');

const post = async (req) => {
    const { 
        jounalLedgers , dated, description 
    } = req.body;

    logInfo('Request to update journals',{ });

    const { id } = req.params;

    const response = await composeResult(
        () => db.create(new CreateJournalLedgerInBulkQuery(
            jounalLedgers.map((jounalLedger) => ({ ...jounalLedger, id: jounalLedger.id ? jounalLedger.id : uuid.v4(), journalId: id }))
        )),
        (journalData) => composeResult(
            async () => {
                const oldledgers = journalData.ledgers;
                const deleteLedger = oldledgers.filter((existingLedger) => !jounalLedgers.find((jounalLedger) => existingLedger.JournalLedger.id === jounalLedger.id))
                const deleteIds = deleteLedger.map((tr) => tr.JournalLedger.id);
                return deleteIds.length > 0 ? db.execute(new DeleteJournalLedgersQuery(deleteIds)) : Result.Ok({})
            },
            () => db.execute(new UpdateJournalQuery(id, dated, description ))
        )(),
        () => db.findOne(new GetAJounalQuery(id)),
    )();

    return respond(response,'Successfully Updated journals', 'Failed to update journals');
}

Route.withSecurity().noAuth().put('/journals/:id',post).bind();

