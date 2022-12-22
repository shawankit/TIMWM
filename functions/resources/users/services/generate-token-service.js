const { logInfo } = require('lib/functional/logger');
const token = require('lib/token');
const config = require('config/config');

module.exports.generate = async (user) => {
    logInfo('generate token', { user });

    return token.generate({
        id: user.id
    });
};
