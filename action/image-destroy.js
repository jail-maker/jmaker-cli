'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const chalk = require('chalk');
const HttpError = require('../error/http-error.js');

/**
 * throws HttpError(code = 404)
 */

module.exports = async args => {

    let jailConfig = new JailConfig(args);
    let name = args['name'] !== undefined ? args['name'] : jailConfig.name;

    try {

        let res = await request({
            method: 'DELETE',
            uri: `${args['server-protocol']}://${args['server-socket']}/images/${name}`,
        });

    } catch(e) {

        if(e.name == 'StatusCodeError') throw new HttpError({msg: e.response.body, code: e.statusCode });
        throw e;

    }

}
