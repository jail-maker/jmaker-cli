'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');

exports.command = 'stop';

exports.describe = 'stop jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = args => {

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
