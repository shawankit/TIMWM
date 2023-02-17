const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteGroupQuery = require('../queries/delete-groups-query');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete groups',{});

    const response = await db.find(new DeleteGroupQuery(id));

    return respond(response,'Successfully Deleted groups', 'Failed to delete groups')
}


Route.withSecurity().noAuth().delete('/groups/:id',get).bind();
