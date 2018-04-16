'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const HttpError = require('../error/http-error.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);
    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    try {

        let res = await request({
            method: 'DELETE',
            uri: `${args['server-protocol']}://${args['server-socket']}/jails/${jailConfig.name}`,
        });

    } catch(e) {

        if(e.name == 'StatusCodeError') throw new HttpError({msg: e.response.body, code: e.statusCode });
        throw e;

    } finally {

        // logWebSocket.close();

    }

}
