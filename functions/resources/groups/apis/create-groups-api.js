const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateGroupQuery = require('../queries/create-group-query');

const post = async (req) => {
    const { name }
     = req.body;

    logInfo('Request to create groups',name);

    const id = uuid.v4();

    const response = await db.execute(new CreateGroupQuery(id, name));

    return respond(response,'Successfully Created groups', 'Failed to create groups')
}

Route.withSecurity().noAuth().post('/groups',post).bind();

