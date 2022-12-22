const Route = require('route');
const db = require('db/repository');
const { respond, uuid } = require('lib');
const { logInfo } = require('lib/functional/logger');
const { adminAuth } = require('authorization.js');
const privileges = require('resources/roles/config/privileges');
const CreateCompanyQuery = require('../queries/create-company-query');

const post = async (req) => {
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

    const id = uuid.v4();

    logInfo('Request to create company', {
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
        new CreateCompanyQuery({
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
        'Successfully created company!',
        'Failed to create company!'
    );
};

Route.withSecurity().authorize(adminAuth(privileges.organizationManagement)).post('/company', post).bind();
