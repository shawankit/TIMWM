const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteItemQuery = require('../queries/delete-item-query');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete item',{});

    const response = await db.find(new DeleteItemQuery(id));

    return respond(response,'Successfully Deleted item', 'Failed to delete item')
}


Route.withSecurity().noAuth().delete('/items/:id',get).bind();
