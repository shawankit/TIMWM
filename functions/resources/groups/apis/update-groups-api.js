const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateGroupQuery = require('../queries/update-groups-query');

const post = async (req) => {

    const { id } = req.params; 
    const { name  }
     = req.body;

    logInfo('Request to update groups',id);

    const response = await db.execute(new UpdateGroupQuery(id, name));

    return respond(response,'Successfully Updated groups', 'Failed to update groups')
}

Route.withSecurity().noAuth().put('/groups/:id',post).bind();

