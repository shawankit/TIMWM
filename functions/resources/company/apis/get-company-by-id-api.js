const Route = require('route');
const db = require('db/repository');
const { respond } = require('lib');
const { logInfo } = require('lib/functional/logger');
// const { adminAuth } = require('authorization.js');
// const privileges = require('resources/roles/config/privileges');
const GetCompanayByIdQuery = require('../queries/get-company-by-id-query');

const get = async (req) => {
    const { companyId } = req.params;

    logInfo('Request to get candidate', {
        companyId
    });

    const response = await db.findOne(new GetCompanayByIdQuery(companyId));

    return respond(response, 'Successfully fetched company!', 'Failed to fetch company!');
};

Route.withSecurity().noAuth().get('/company/:companyId', get).bind();
