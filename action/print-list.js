'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');
const verifyErrorCode = require('../lib/verify-error-code.js');
const HttpError = require('../error/http-error.js');

module.exports = async args => {

    try {

        let list = [];

        if(args['all']) {

            let res = await request({
                method: 'GET',
                uri: `${args['server-protocol']}://${args['server-socket']}/images`,
                json: true,
            });

            for(let item of res.items) {

                list.push(item.name);

            }

        } else {

            let res = await request({
                method: 'GET',
                uri: `${args['server-protocol']}://${args['server-socket']}/jails`,
                json: true,
            });

            for(let item of res) {

                list.push(item.name);

            }

        }

        console.log(list);

    } catch(e) {

        if(e.name == 'StatusCodeError') {

            if(verifyErrorCode(e.statusCode))
                throw new HttpError({msg: e.response.body, code: e.statusCode });

        } else throw e;

    }

}
