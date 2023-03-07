const Result = require('folktale/result');
const {
    notEmpty,
} = require('validation');
const moment = require('moment');
const R = require('ramda');
const uuid = require('uuid');

const isValidDate = (date) => moment(date, 'DD-MM-YYYY').isValid();

const validationMessages = {
    ledgerCode: [
        [notEmpty, 'Ledger Code is Mandatory!']
    ],
    ledgerName: [
        [notEmpty, 'Ledger Name is Mandatory!']
    ],
    dated: [
        [notEmpty, 'Date is Mandatory!'],
        [isValidDate, 'Date should be in format (DD-MM-YYYY)']
    ]
};

module.exports.validate = async (csvErrorArray) => {
    let journalId = uuid();
    csvErrorArray.forEach((journal, index) => {
        if((journal.ledgerCode || "").toLowerCase() == 'next'){
            journal.journalId = journalId;
            journal.ledgerCode = "next";
            journal.index = index;
            journalId = uuid();
            return;
        }

        ['ledgerCode', 'ledgerName', 'dated'].forEach((key) => {
            validationMessages[key].forEach(([validr, errMsg]) => {
                if (!validr(journal[key])) {
                    journal.reason.push(errMsg);
                }
            });
        });
        if(journal.dr && journal.cr){
            journal.reason.push('Both Dr and Cr are filled. Either Dr or Cr should be filled!');
        }
        if((journal.dr == '' && journal.cr == '')){
            journal.reason.push('Both are empty. Either Dr or Cr should be filled!');
        }
        journal.journalId = journalId;
        journal.index = index;
    });

    if(csvErrorArray.filter((item) => item.reason.length > 0).length  ==  0){
        csvErrorArray.push({ ledgerCode: 'next', journalId: journalId, index: csvErrorArray.length, reason: [] });
        const journals = R.groupBy(R.prop('journalId'), csvErrorArray);
        Object.keys(journals).forEach((journalId) => {
            const ledgers = journals[journalId];
            const jounalLedgers = ledgers.filter((l) => l.ledgerCode != 'next').map((l) => ({
                type: l.dr ? 'debit' : 'credit',
                amount: l.dr ? l.dr  : (l.cr != '' ? l.cr : 0),
                ledgerId: l.ledgerId
            }));

            const sumData = jounalLedgers.reduce((result, l) => {
                if(l.type == 'debit'){
                    result.sumDr += isNaN(parseFloat(l.amount)) ? 0 : parseFloat(l.amount);
                }
                if(l.type == 'credit'){
                    result.sumCr += isNaN(parseFloat(l.amount)) ? 0 : parseFloat(l.amount);
                }
                return result;
            }, { sumDr: 0, sumCr: 0 });
    
           if(sumData.sumDr != sumData.sumCr){
                const nextRow = ledgers.find((l) => l.ledgerCode == 'next');
                nextRow.reason.push(`For Journal with ledgers (From Row ${ledgers[0].index + 1} to ${ledgers[ledgers.length - 2].index + 1}), Sum of Dr and Cr should be equal!`);
           }
        });
    }
   

    return Result.Ok(csvErrorArray);
};
