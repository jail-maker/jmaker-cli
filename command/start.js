'use strict';

const request = require('request-promise-native');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const chalk = require('chalk');

exports.command = 'start';

exports.describe = 'start jail';

exports.builder = yargs => {

    return yargs;

}

exports.handler = async args => {

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

    } catch(e) {
    
    
    }

    // let code = res.statusCode;

    // if (code !== 200) {

    //     console.log(chalk.red(`${code} ${body}`));

    //     logWebSocket.close();

    // }

}
