const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const db = require('db/repository');
const GetLedgersQuery = require('../queries/get-ledgers-query');


const get = async (req) => {

    const { search, offset, limit } = req.query;

    logInfo('Request to fetch all ledgers',{});

    const response = await db.find(new GetLedgersQuery( search, offset, limit));

    return respond(response,'Successfully Fetched All ledgers', 'Failed to fetch ledgers')
}


Route.withSecurity().noAuth().get('/ledgers',get).bind();
