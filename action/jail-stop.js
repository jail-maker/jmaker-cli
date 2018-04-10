'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');

module.exports = args => {

    let jailConfig = new JailConfig(args);
    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    try {

        let res = await request({
            method: 'DELETE',
            uri: `${args['server-protocol']}://${args['server-socket']}/jails/${jailConfig.name}/stop`,
        });

        let code = res.statusCode;
        if(verifyErrorCode(code))
            reject(new HttpError({msg: body, code: code}));

    } catch(e) {

        throw e;

    } finally {

        logWebSocket.close();

    }

}
