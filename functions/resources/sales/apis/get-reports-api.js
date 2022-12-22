const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetSalesReportQuery = require('../queries/get-sales-reports-by-division-query');


const get = async (req) => {
    const { id } = req.params;

    logInfo('Request to fetch all reports',{});

    const response = await db.find(new GetSalesReportQuery());

    return respond(response,'Successfully Fetched reports', 'Failed to fetch reports')
}


Route.withSecurity().noAuth().get('/reports',get).bind();