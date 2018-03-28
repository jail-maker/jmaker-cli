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

    return yargs
        .option('repository', {
            alias: 'rep',
        });

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args);

    let tokenContent = fs.readFileSync(args['token-file']);
    let tokenJson = JSON.parse(tokenContent);

    request({
        method: 'POST',
        uri: `${args['server-protocol']}://${args['server-socket']}/images/push-to-repo`,
        json: true,
        timeout: null,
        body: {
            image: jailConfig.name,
            repository: args['repository'] !== undefined ? args['repository'] : args['repository-socket'],
            tokenJson: tokenJson,
        },
    }, (error, response, body) => {

        let code = response.statusCode;

        if (code !== 200) {

            console.log(chalk.red(`${code} ${body}`));

        }

    });

}
