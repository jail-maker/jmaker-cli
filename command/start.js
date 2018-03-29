'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

exports.command = 'start';

exports.describe = 'start jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = args => {

    let jailConfig = new JailConfig(args);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

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
