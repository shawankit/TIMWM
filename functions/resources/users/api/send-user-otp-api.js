const route = require('route');
const { composeResult, respond, logInfo } = require('lib');
const db = require('db/repository');
const R = require('ramda');
const ValidationError = require('lib/validation-error');
const GetUserDetailsQuery = require('resources/users/queries/get-user-query');
const GenerateAndSentOTPService = require('resources/users/services/generate-and-send-otp-service');

const Result = require('folktale/result');

const post = async (req) => {
    const {
        mobileNumber
    } = req.body;
    logInfo('Request to send mobile verification OTP', { mobileNumber });
    const response = await composeResult(
        (user) => GenerateAndSentOTPService.perform(user, [{ name: 'sms', to: `${user.mobileNumber}` }]),
        (user) => R.ifElse(
            () => user,
            () => Result.Ok(user),
            () => Result.Error(new ValidationError(400, "Mobile Number is not registered")),
        )(),
        () => db.findOne(new GetUserDetailsQuery(mobileNumber)),
    )();
    return respond(response, 'Successfully sent OTP!', 'Failed to send OTP!');
};
route.withOutSecurity().noAuth().post('/auth/mobile/sendOTP', post).bind();
