const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult} = require('lib');
const uuid = require('uuid');
const db = require('db/repository');
const R = require('ramda');
const { validate } = require('../validators/bulk-create-journals-validator');
const Result = require('folktale/result');
const ParseJounalsDataService = require('../services/parse-journals-data-service');


const post = async (req) => {
    const { journals, type } = req.body;

    logInfo('Request to create journals',journals);

    const journalsToCreate = journals.map((sale) => ({ ...sale, id: uuid.v4()}));

    const csvErrorArray = journalsToCreate.map((each, index) => ({ ...each, index, reason: [] }));

    const response = await composeResult(
        async () => R.ifElse(
            () => csvErrorArray.filter((item) => item.reason.length > 0).length > 0,
            () => {
                const erroredEntries = csvErrorArray.filter((item) => item.reason.length > 0);
                const entriesWithIndexAndReasons = erroredEntries.map((item) => ({ index: item.index, reason: item.reason }));
                return Result.Ok({ csvErrorArray: entriesWithIndexAndReasons });
            },
            () => ParseJounalsDataService.perform(journalsToCreate, type)
        )(),
        () => validate(csvErrorArray)
    )();

    return respond(response,'Successfully Created journals', 'Failed to Create journals')
}


Route.withSecurity().noAuth().post('/bulk/journals',post).bind();
