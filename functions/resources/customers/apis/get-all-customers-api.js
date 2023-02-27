const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const R = require('ramda');
const db = require('db/repository');
const GetCustomersQuery = require('../queries/get-customers-queries');


const get = async (req) => {

    const { type, search, offset, limit, filters } = req.query;

    logInfo('Request to fetch all customers',{});

    const parsedFilters = !R.isNil(filters) && !R.isEmpty(filters) && JSON.parse(filters); 
    const response = await db.find(new GetCustomersQuery(type, search, offset, limit, parsedFilters));

    return respond(response,'Successfully Fetched All customers', 'Failed to fetch customers')
}


Route.withSecurity().noAuth().get('/customers',get).bind();
