'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

exports.command = 'create';

exports.describe = 'create jail on server';

exports.builder = yargs => {

    return yargs;

}

exports.handler = args => {

    let jailConfig = new JailConfig(args['jail-config']);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

    request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/jails/create`,
        json: true,
        timeout: null,
        body: jailConfig,
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        logWebSocket.close();

    });


}
