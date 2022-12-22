const route = require('route');
const {
    composeResult, respond, logInfo, convertDbToJson, uuid
} = require('lib');
const db = require('db/repository');
const R = require('ramda');
const VerifyOTPValidation = require('resources/mobile-auths/validators/verify-otp-validation');
const GetUserDetailsQuery = require('resources/users/queries/get-user-query');
const VerifyUserOTPService = require('resources/users/services/verify-user-otp-service');

const Result = require('folktale/result');
const { generate } = require('../services/generate-token-service');


const generateToken = async (result) => composeResult(
    (generatedToken) => Result.Ok({
        ...result, token: generatedToken
    }),
    () => generate(result)
)();

const login = async (details) => {
    const { mobileNumber, otp } = details;

    return composeResult(
        (user) => generateToken(user),
        (user) => Result.Ok(convertDbToJson(user)),
        (user) => R.ifElse(
            () => user,
            () => Result.Ok(user),
            () => Result.Error('Invalid OTP!')
        )(),
        () => db.findOne(new GetUserDetailsQuery(mobileNumber)),
        VerifyUserOTPService.verify
    )(mobileNumber, otp);
};

const post = async (req) => {
    const { mobileNumber, otp } = req.body;
    logInfo('Request to verify user OTP', { mobileNumber, otp });
    const response = await composeResult(
        () => login({
            mobileNumber,
            otp
        }),
        VerifyOTPValidation.validate
    )({ mobileNumber, otp });
    return respond(
        response,
        'Successfully created session!',
        'Failed to create the session!'
    );
};
route.withOutSecurity().noAuth().post('/auth/mobile/user', post).bind();
