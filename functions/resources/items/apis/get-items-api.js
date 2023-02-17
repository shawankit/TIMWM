const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const db = require('db/repository');
const GetItemsQuery = require('../queries/get-items-queries');


const get = async (req) => {

    const { search, offset, limit } = req.query;

    logInfo('Request to fetch all items',{});

    const response = await db.find(new GetItemsQuery(search, offset, limit));

    return respond(response,'Successfully Fetched All items', 'Failed to fetch items')
}


Route.withSecurity().noAuth().get('/items',get).bind();
