const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const R = require('ramda');
const GetReceiptsQuery = require('../queries/get-receipts-query');


const get = async (req) => {

    const { type, search, offset, limit } = req.query;


    logInfo('Request to fetch all receipts',{});

    const response = await db.find(new GetReceiptsQuery(type, search, offset, limit));
    
    return respond(response,'Successfully Fetched All receipts', 'Failed to fetch receipts')
}


Route.withSecurity().noAuth().get('/receipts',get).bind();