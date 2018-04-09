'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');

module.exports = args => {

    let jailConfig = new JailConfig(args);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig.name);

    request({
        method: 'DELETE',
        uri: `${args['server-protocol']}://${args['server-socket']}/jails/${jailConfig.name}/stop`,
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        logWebSocket.close();

    });

}
