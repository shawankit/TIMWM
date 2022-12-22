const DeleteMobileOtpQuery = require('resources/mobile-auths/queries/delete-mobile-otp-query.js');
const GetMobileOTPQuery = require('resources/mobile-auths/queries/get-mobile-otp-query.js');
const PasswordHash = require('password-hash');
const Result = require('folktale/result');
const ValidationError = require('lib/validation-error');

const {
    composeResult, withArgs, logInfo, convertDbToJson
} = require('lib');
const db = require('db/repository');

const verify = (userOtp, givenOtp) => {
    console.log(userOtp, givenOtp)
    if (!userOtp) return Result.Error(new ValidationError(0, ['Invalid OTP']));
    if (Date.parse(userOtp.expiredAt) < Date.now()) { return Result.Error(new ValidationError(0, ['OTP has expired'])); }

    const success = PasswordHash.verify(givenOtp.toString(), userOtp.otpHash);

    if (success) return Result.Ok({});

    return Result.Error(new ValidationError(0, ['Invalid OTP']));
};

module.exports.verify = async (mobileNumber, givenOtp) => {
    logInfo('Requested to verify user otp', { mobileNumber, givenOtp });

    return composeResult(
        async () => {
            await db.execute(new DeleteMobileOtpQuery(mobileNumber));
            return Result.Ok({});
        },
        (userOtp) => verify(userOtp, givenOtp),
        (userOtp) => Result.Ok(convertDbToJson(userOtp)),
        () => db.findOne(new GetMobileOTPQuery(mobileNumber))
    )();
};
