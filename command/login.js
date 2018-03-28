'use strict';

const prequest = require('request-promise-native');
const inquirer = require('inquirer');
const fs = require('fs');
const fsextra = require('fs-extra');
const chalk = require('chalk');
const JailConfig = require('../lib/jail-config.js');
const LogWebSocket = require('../lib/log-web-socket.js');

exports.command = 'login';

exports.describe = 'aquire token';

exports.builder = yargs => {

    return yargs
        .option('repository', {
            alias: 'rep',
        });

}

exports.handler = async args => {

    let jailConfig = new JailConfig(args['jail-config']);

    let {name, password} = await inquirer.prompt([
        {prefix: '', name: 'name', message: 'name: ', type: 'input'},
        {prefix: '', name: 'password', message: 'password: ', type: 'password'}
    ]);

    let res = await prequest({
        uri: `${args['auth-server-protocol']}://${args['auth-server-socket']}`,
        method: 'GET',
        'auth': {
            'user': name,
            'pass': password,
            'sendImmediately': false,
        },
        json: true,
        body: {
            image: jailConfig.name,
            repository: args['repository'] !== undefined ? args['repository'] : jailConfig.from,
        }
    });

    fsextra.ensureFileSync(args['token-file']);
    fs.writeFileSync(args['token-file'], JSON.stringify(res));

}
