const Route = require('route');
const db = require('db/repository');
const { respond } = require('lib');
const { logInfo } = require('lib/functional/logger');
const CreateCompanyQuery = require('../queries/create-company-query');
const uuid = require('uuid');

const post = async (req) => {
    const {
        name, division
    } = req.body;

    const id = uuid.v4();

    logInfo('Request to create company', {
        name, division
    });

    const response = await db.execute(
        new CreateCompanyQuery({
            id, name, division
        })
    );

    return respond(response, 'Successfully created company!', 'Failed to create company!');
};

Route.withSecurity().noAuth().post('/companies', post).bind();
