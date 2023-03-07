const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult} = require('lib');
const uuid = require('uuid');
const db = require('db/repository');
const CreateUploadMetaDataQuery = require('../../uploadMetaData/queries/create-upload-meta-query');
const R = require('ramda');
const { validate } = require('../validators/bulk-create-sales-validator');
const Result = require('folktale/result');
const ParseSalesDataService = require('../services/parse-sales-data-service');

const post = async (req) => {
    const { sales, type } = req.body;

    logInfo('Request to create sales',sales);

    const salesToCreate = sales.map((sale) => ({ ...sale, id: uuid.v4()}));

    const csvErrorArray = salesToCreate.map((each, index) => ({ ...each, index, reason: [] }));
    
    const response = await composeResult(
        async () => R.ifElse(
            () => csvErrorArray.filter((item) => item.reason.length > 0).length > 0,
            () => {
                const erroredEntries = csvErrorArray.filter((item) => item.reason.length > 0);
                const entriesWithIndexAndReasons = erroredEntries.map((item) => ({ index: item.index, reason: item.reason }));
                return Result.Ok({ csvErrorArray: entriesWithIndexAndReasons });
            },
            () => composeResult(
                () => db.create(new CreateUploadMetaDataQuery({ id: uuid.v4(), type: type, message: `${sales.length} rows inserted`, uploadedBy: req.decoded.id })),
                () => ParseSalesDataService.perform(salesToCreate, type)
            )()
        )(),
        () => validate(csvErrorArray)
    )();

    return respond(response,'Successfully Created sales', 'Failed to Create sales')
}


Route.withSecurity().noAuth().post('/sales',post).bind();
