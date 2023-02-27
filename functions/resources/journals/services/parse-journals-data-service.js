const { logInfo } = require('lib/functional/logger');
const { composeResult } = require('lib');
const uuid = require('uuid');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const GetLedgersQuery = require('../../ledgers/queries/get-ledgers-query');
const CreateJournalInBulkQuery = require('../queries/create-journal-in-bulk-query');
const CreateLedgerInBulkQuery = require('../../ledgers/queries/create-ledger-in-bulk-query');
const CreateJournalLedgerInBulkQuery = require('../queries/create-journal-ledger-in-bulk-query');

const get0IfEmpty = (value) => value === "" ? 0 : value;

const processData = async (journals) => {
    const journals = [];
    let journalLedgers = [];
    journals.forEach(data => {
        const { ledgerCode, ledgerName, dated, dr, cr, description } = data;
        if((ledgerCode || "").toLowerCase() === 'next'){
            journals.push({
                journalLedgers
            })
            journalLedgers = [];
        }
        journalLedgers.push({
            ledgerCode,
            ledgerName,
            dated,
            description,
            type: dr != "" ? 'debit' : 'credit',
            amount: dr != "" ? dr : (get0IfEmpty(cr)),
        });
    });

    journals.push({
        journalLedgers
    })
    
    return Result.Ok(journals);
}

module.exports.perform = async (journals) => {
    logInfo('parse journals data service ', journals);

    return composeResult(
        (ledgers) => composeResult(
            (journals) => {
                const ledgerCodeMap = ledgers.rows.reduce((result, curent) => ({ ...result, [curent.code]: curent.id }), {});
                
                const journalsToCreate = [];
                const ledgerToCreate = [];
                const jlToCreate = [];
                journals.forEach((journal) => {
                    const journalId = uuid.v4();
                    const journalLedgers = journal.journalLedgers;
                    if(journalLedgers.length > 0){
                        let dated, description;
                        journalLedgers.forEach((jL, i) => {
                            if( i == 0 ){
                                dated = jL.dated;
                                description = jL.description;
                            }

                            const ledgerId = ledgerCodeMap[jL.ledgerCode] || uuid.v4();
                            if(!ledgerCodeMap[jL.ledgerName]){
                                ledgerToCreate.push({
                                    id: ledgerId,
                                    name: jL.ledgerName,
                                    code: jL.ledgerCode
                                });
                            }
                            jlToCreate.push(({
                                id: uuid.v4(),
                                ledgerId,
                                journalId,
                                type: jL.type,
                                amount: jL.amount
                            }))
                        });

                        journalsToCreate.push({
                            id: journalId,
                            dated,
                            description
                        })
                    }
                });

                return composeResult(
                    () => db.create(new CreateJournalLedgerInBulkQuery(invoices)),
                    () => db.create(new CreateLedgerInBulkQuery(ledgerToCreate)),
                    () => db.create(new CreateJournalInBulkQuery(journalsToCreate))
                )();

            },
            () => processData(journals),
        )(),
        () => db.find(new GetLedgersQuery())
    )()
}