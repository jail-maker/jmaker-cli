'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');
const HttpError = require('../error/http-error.js');

module.exports = async args => {

    let list = [];

    try {

        let res = await request({
            method: 'GET',
            uri: `${args['server-protocol']}://${args['server-socket']}/images`,
            json: true,
        });

        for(let item of res.items) {

            list.push(item.name);

        }

    } catch(e) {

        if(e.name == 'StatusCodeError') throw new HttpError({msg: e.response.body, code: e.statusCode });
        throw e;

    }

    return list;

}
