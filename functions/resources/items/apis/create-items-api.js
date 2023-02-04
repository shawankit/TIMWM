const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateItemQuery = require('../queries/create-item-query');

const post = async (req) => {
    const { name , code, uom,rate, companyId }
     = req.body;

    logInfo('Request to create items',name);

    const id = uuid.v4();

    const response = await db.execute(new CreateItemQuery(id,name,code,uom,rate, companyId));

    return respond(response,'Successfully Created items', 'Failed to create items')
}

Route.withSecurity().noAuth().post('/items',post).bind();

