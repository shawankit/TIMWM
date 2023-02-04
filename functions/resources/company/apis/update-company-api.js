const Route = require('route');
const db = require('db/repository');
const { respond } = require('lib');
const { logInfo } = require('lib/functional/logger');
const UpdateCompanyQuery = require('../queries/update-company-query');

const put = async (req) => {
    const {
        cname, division
    } = req.body;

    const { id } = req.params;

    logInfo('Request to update company', {
        cname, division
    });

    const response = await db.execute(
        new UpdateCompanyQuery({
            id, cname, division
        })
    );

    return respond(response, 'Successfully update company!', 'Failed to update company!');
};

Route.withSecurity().noAuth().put('/companies/:id', put).bind();
