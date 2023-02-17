const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const db = require('db/repository');
const GetGroupQuery = require('../queries/get-groups-query');


const get = async (req) => {

    const { search, offset, limit } = req.query;

    logInfo('Request to fetch all groups',{});

    const response = await db.find(new GetGroupQuery(search, offset, limit));

    return respond(response,'Successfully Fetched All groups', 'Failed to fetch groups')
}


Route.withSecurity().noAuth().get('/groups',get).bind();
