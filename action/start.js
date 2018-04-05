'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');

module.exports = async args => {

    let jailConfig = new JailConfig(args);

    let logRoot = `${args['log-protocol']}://${args['log-socket']}`;
    let logWebSocket = new LogWebSocket(logRoot, jailConfig.name);

    request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/jails/start`,
        json: true,
        timeout: null,
        body: jailConfig,
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));
            logWebSocket.close();

        }

    });

}
