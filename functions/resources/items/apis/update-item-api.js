const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateItemQuery = require('../queries/update-item-query');

const post = async (req) => {

    const { id } = req.params; 
    const {  name , code, uom, rate, companyId }
     = req.body;

    logInfo('Request to update item',id);

    const response = await db.execute(new UpdateItemQuery(id, name , code, uom, rate, companyId));

    return respond(response,'Successfully Updated item', 'Failed to update item')
}

Route.withSecurity().noAuth().put('/items/:id',post).bind();

