const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetCustomersQuery = require('../queries/get-customers-queries');


const get = async (req) => {

    const { type, search, offset, limit, filters } = req.query;

    logInfo('Request to fetch all customers',{});

    const response = await db.find(new GetCustomersQuery(type, search, offset, limit, filters));

    return respond(response,'Successfully Fetched All customers', 'Failed to fetch customers')
}


Route.withSecurity().noAuth().get('/customers',get).bind();
