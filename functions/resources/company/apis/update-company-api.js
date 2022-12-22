const Route = require('route');
const db = require('db/repository');
const { respond } = require('lib');
const { logInfo } = require('lib/functional/logger');
const { adminAuth } = require('authorization.js');
const privileges = require('resources/roles/config/privileges');
const UpdateCompanyQuery = require('../queries/update-company-query');

const put = async (req) => {
    const {
        companyName,
        brandName,
        address,
        country,
        state,
        logo,
        defaultCurrency,
        financialYearStartDate,
        financialYearEndDate,
        pan,
        tan,
        sendGridApiKey,
        sendGridEmail
    } = req.body;

    const { id } = req.params;

    logInfo('Request to update company', {
        companyName,
        brandName,
        address,
        country,
        state,
        logo,
        defaultCurrency,
        financialYearStartDate,
        financialYearEndDate,
        pan,
        tan,
        sendGridApiKey,
        sendGridEmail
    });

    const response = await db.execute(
        new UpdateCompanyQuery({
            id,
            companyName,
            brandName,
            address,
            country,
            state,
            logo,
            defaultCurrency,
            financialYearStartDate,
            financialYearEndDate,
            pan,
            tan,
            sendGridApiKey,
            sendGridEmail
        })
    );

    return respond(
        response,
        'Successfully update company!',
        'Failed to update company!'
    );
};

Route.withSecurity().authorize(adminAuth(privileges.organizationManagement)).put('/company/:id', put).bind();
