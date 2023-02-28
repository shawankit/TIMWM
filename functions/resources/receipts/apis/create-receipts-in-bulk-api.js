const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult} = require('lib');
const uuid = require('uuid');
const db = require('db/repository');
const CreateUploadMetaDataQuery = require('../../uploadMetaData/queries/create-upload-meta-query');
const R = require('ramda');
const { validate } = require('../validators/bulk-create-receipts-validator');
const Result = require('folktale/result');
const ParseReceiptsDataService = require('../services/parse-receipts-data-service');
const CreateReceiptsInBulkQuery = require('../queries/create-receipts-query');
const CreateCustomerInBulkQuery = require('../../customers/queries/create-customers-in-bulk-query');
const CreateCompanyInBulkQuery = require('../../company/queries/create-company-in-bulk-query');

const post = async (req) => {
    const { receipts, type } = req.body;
    logInfo('Request to create receipts',receipts);

    const receiptsToCreate = receipts.map((sale) => ({ ...sale, id: uuid.v4()}));

    const csvErrorArray = receiptsToCreate.map((each, index) => ({ ...each, index, reason: [] }));
    const response = await composeResult(
        async (data) => R.ifElse(
            () => csvErrorArray.filter((item) => item.reason.length > 0).length > 0,
            () => {
                const erroredEntries = csvErrorArray.filter((item) => item.reason.length > 0);
                const entriesWithIndexAndReasons = erroredEntries.map((item) => ({ index: item.index, reason: item.reason }));
                return Result.Ok({ csvErrorArray: entriesWithIndexAndReasons });
            },
            () => composeResult(
                () => db.create(new CreateUploadMetaDataQuery({ id: uuid.v4(), type: type, message: `${receipts.length} rows inserted`, uploadedBy: req.decoded.id })),
                () => db.execute(new CreateReceiptsInBulkQuery({ receipts: data.receiptsTobeCreated })),
                async () => data.customers.length > 0 ? db.create(new CreateCustomerInBulkQuery(data.customers)) : Result.Ok(''),
                async () => data.companies.length > 0 ? db.create(new CreateCompanyInBulkQuery(data.companies)) : Result.Ok('')
            )()
        )(),
        () => ParseReceiptsDataService.perform(csvErrorArray, type),
        () => validate(csvErrorArray)
    )();

    return respond(response,'Successfully Created Receipts ', 'Failed to Create Receipts')
}


Route.withSecurity().noAuth().post('/bulk/receipts',post).bind();
