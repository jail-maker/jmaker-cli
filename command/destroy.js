'use strict';

const request = require('request');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

exports.command = 'destroy';

exports.describe = 'destroy jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = await args => {

    let jailConfig = new JailConfig(args['jail-config']);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

    request({
        method: 'DELETE',
        uri: `${args['server-protocol']}://${args['server-socket']}/jails/${jailConfig.name}/destroy`,
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        logWebSocket.close();

    });


}
