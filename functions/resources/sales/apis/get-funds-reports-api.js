const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const R = require('ramda')
const GetDateFundsReportQuery = require('../queries/get-date-fund-report-query');
const GetMonthFundsReportQuery = require('../queries/get-month-fund-report-query');


const get = async (req) => {
    const {  reportType, date, month, year } = req.query;

    logInfo('Request to fetch fund reports',{  reportType });

    const response = await R.ifElse(
        R.equals('date'),
        () => db.find(new GetDateFundsReportQuery(date)),
        () => db.find(new GetMonthFundsReportQuery(month, year))
    )(reportType) ;

    return respond(response,'Successfully Fetched fund reports', 'Failed to fetch fund reports')
}


Route.withSecurity().noAuth().get('/fund-reports',get).bind();