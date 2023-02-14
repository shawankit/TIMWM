const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const R = require('ramda');
const GetJournalsQuery = require('../queries/get-jounals-query');


const get = async (req) => {

    const { search, offset, limit, filters } = req.query;


    logInfo('Request to fetch all journals',{});

    const parsedFilters = !R.isNil(filters) && !R.isEmpty(filters) && JSON.parse(filters); 
    const response = await db.find(new GetJournalsQuery(search, offset, limit, parsedFilters));
    
    return respond(response,'Successfully Fetched All journals', 'Failed to fetch journals')
}


Route.withSecurity().noAuth().get('/journals',get).bind();