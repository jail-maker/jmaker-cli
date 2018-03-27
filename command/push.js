'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const fs = require('fs');
const path = require('path');

exports.command = 'push';

exports.describe = 'push to repository';

exports.builder = yargs => {

    return yargs;

}

exports.handler = args => {

    let jailConfig = new JailConfig(args['jail-config']);
    let logWebSocket = new LogWebSocket(`${args['log-protocol']}://${args['log-socket']}`, jailConfig);

    // let tokenContent = fs.readFileSync(globals.tokenFile);
    // let tokenJson = JSON.parse(tokenContent);

    request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/images/push-to-repo`,
        json: true,
        timeout: null,
        body: {},
        // body: {
        //     image: configData.name,
        //     repository: configData.from,
        //     tokenJson: tokenJson,
        // },
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

        logWebSocket.close();

    });

}
