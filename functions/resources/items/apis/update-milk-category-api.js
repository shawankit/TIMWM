const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateItemQuery = require('../queries/update-milk-category-query');

const post = async (req) => {

    const { id } = req.params; 
    const { name , rate, taxable, gstRate}
     = req.body;

    logInfo('Request to update milk category',name);

    const response = await db.execute(new UpdateItemQuery(id,name,rate, taxable, gstRate));

    return respond(response,'Successfully Updated Milk Category', 'Failed to update Milk Category')
}

Route.withOutSecurity().noAuth().put('/milk-category/:id',post).bind();

