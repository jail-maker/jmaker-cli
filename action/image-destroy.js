'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const chalk = require('chalk');

/**
 * throws StatusCodeError(code = 404)
 */

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let res = await request({
        method: 'DELETE',
        uri: `${args['server-protocol']}://${args['server-socket']}/images/${jailConfig.name}`,
    });

    let code = res.statusCode;
    let body = res.body;
    if(verifyErrorCode(code))
        throw new HttpError({msg: body, code: code});

}
