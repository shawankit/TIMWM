const Route = require('route');
const db = require('db/repository');
const { respond } = require('lib');
const { logInfo } = require('lib/functional/logger');
const { adminAuth } = require('authorization.js');
const privileges = require('resources/roles/config/privileges');
const GetCompaniesQuery = require('resources/company/queries/get-companies-query');

const get = async (req) => {
    const { search, offset, limit, filters } = req.query;
    const queryFilters = filters !== '' && filters !== 'undefined' ? JSON.parse(filters) : "";
    logInfo('Request to get companies', { search, offset, limit, queryFilters });
    const response = await db.find(new GetCompaniesQuery(search, offset, limit, queryFilters));

    return respond(
        response,
        'Successfully retrieved companies!',
        'Failed to retrieve companies!'
    );
};

Route.withSecurity()
    .noAuth()
    .get('/companies', get)
    .bind();
