const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const R = require('ramda');
const GetInvoicesByDateQuery = require('../queries/get-invoices-by-date-query ');
const GetInvoicesQuery = require('../queries/get-invoices-query');


const get = async (req) => {

    const { type, search, offset, limit, filters } = req.query;


    logInfo('Request to fetch all invoices',{});

    const parsedFilters = !R.isNil(filters) && !R.isEmpty(filters) && JSON.parse(filters); 
    const response = await db.find(new GetInvoicesQuery(type, search, offset, limit, parsedFilters));
    
    return respond(response,'Successfully Fetched All invoices', 'Failed to fetch invoices')
}


Route.withSecurity().noAuth().get('/invoices',get).bind();