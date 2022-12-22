const uuid = require('uuid');
const Random = require('random-number');
const PasswordHash = require('password-hash');
const moment = require('moment');
const {
    composeResult, whenResult, logInfo, logError
} = require('lib');
const config = require('config/config');
const db = require('db/repository');
const CreateMobileOtpQuery = require('resources/mobile-auths/queries/create-mobile-otp-query');
const Result = require('folktale/result');
const axios = require('axios');

const useMockOtp = (mobileNumber) => config.env === 'dev'
    || config.env === 'test'
    || config.env === 'qa'
    || mobileNumber === '1111111111'
    || mobileNumber === '2817611384';

const generateOtp = async (mobileNumber) => {
    logInfo('Requested to generate otp', {
        mobileNumber
    });
    const id = uuid.v4();

    let otp = 1111;
    // if (!useMockOtp(mobileNumber)) {
    //     otp = Random.generator({
    //         min: 1000,
    //         max: 9999,
    //         integer: true
    //     })();
    // }

    const hashedOTP = PasswordHash.generate(otp.toString());

    const expiredAt = moment()
        .add(30, 'minutes')
        .format('YYYY-MM-DD HH:mm');

    return composeResult(
        () => Result.Ok(otp),
        () => db.execute(new CreateMobileOtpQuery(id, mobileNumber, hashedOTP, expiredAt))
    )();
};

const sendSms = async (otp, user) => {
    if (!useMockOtp(user.mobileNumber)) {
        try {
            const response = await axios.post('https://add-ur-link/send-sms', {
                mobile_number: `91${user.mobileNumber}`,
                // eslint-disable-next-line max-len
                sms_payload: `${otp} is your verification OTP for CanEngage. The code will be valid for 30 min. Do not share this OTP with anyone.`,
                template_id: '1107165753427915681'
            });
            logInfo('Send Otp Response', response);
        } catch (error) {
            logError('Send Otp Error', error);
        }
    }
    return Result.Ok('');
};

module.exports.perform = async (user, modes) => {
    logInfo('Requested to perform send generate and send otp', {
        user,
        modes
    });
    const otpResult = await generateOtp(user.mobileNumber);

    return whenResult(
        () => Result.Ok(user),
        () => Result.Error('Failed to generate the OTP')
    )(otpResult);
};
