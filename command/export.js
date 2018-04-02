'use strict';

const request = require('request');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');
const fs = require('fs');
const path = require('path');

exports.command = 'export';

exports.describe = 'export from server';

exports.builder = yargs => {

    return yargs
        .option('repository-socket', {
            alias: ['rep', 'r'],
        }).option('name', {
            demandOption: true,
        });

}

exports.handler = async args => {

    // let jailConfig = new JailConfig(args);

    // let repository = args['repository'] !== undefined ? args['repository'] : args['repository-socket'];

    // let body = {
    //     image: args['name'],
    //     repository: repository,
    // };

    // if(args['token-file' !== undefined]) {

    //     let tokenContent = fs.readFileSync(args['token-file']);
    //     let tokenJson = JSON.parse(tokenContent);
    //     body['token-json'] = tokenJson;

    // }

    // request({
    //     method: 'POST',
    //     uri: `${args['server-protocol']}://${args['server-socket']}/images/push-to-repo`,
    //     json: true,
    //     timeout: null,
    //     body: body,
    // }, (error, response, body) => {

    //     let code = response.statusCode;

    //     if (code !== 200) {

    //         console.log(chalk.red(`${code} ${body}`));

    //     }

    // });

}
