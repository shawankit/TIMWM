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

    const { type, search, offset, limit, date } = req.query;


    logInfo('Request to fetch all invoices',{});

    const response = await R.ifElse(
        () => R.isNil(date),
        () => db.find(new GetInvoicesQuery(type, search, offset, limit)),
        () => db.find(new GetInvoicesByDateQuery(date))
    )();
    
    return respond(response,'Successfully Fetched All invoices', 'Failed to fetch invoices')
}


Route.withSecurity().noAuth().get('/invoices',get).bind();