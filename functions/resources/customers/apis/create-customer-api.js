const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateCustomerQuery = require('../queries/create-customer-query');

const post = async (req) => {
    const { code, name , type, mobile, companyId, gstNumber }
     = req.body;

    logInfo('Request to create customer',name);

    const id = uuid.v4();

    const response = await composeResult(
        () => db.execute(new CreateCustomerQuery({ id, code, name , type, mobile, companyId, gstNumber } ))
    )();

    return respond(response,'Successfully Created Customer', 'Failed to create customer')
}

Route.withSecurity().noAuth().post('/customers',post).bind();

