'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const chalk = require('chalk');
const HttpError = require('../error/http-error.js');

/**
 * throws HttpError(code = 404)
 */

module.exports = async args => {

    let name = args.name;

    try {

        let res = await request.delete({
            uri: `${args['server-protocol']}://${args['server-socket']}/containers/${name}`,
        });

    } catch(error) {

        if (error.name == 'StatusCodeError') {

            throw new HttpError({
                msg: error.response.body,
                code: error.statusCode
            });

        }
        throw e;

    }

}
