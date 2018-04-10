'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');
const verifyErrorCode = require('../lib/verify-error-code.js');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    try {

        let res = await request({
            method: 'POST',
            uri: `${args['server-protocol']}://${args['server-socket']}/jails/start`,
            json: true,
            timeout: null,
            body: jailConfig,
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
