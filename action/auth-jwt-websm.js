'use strict';

const prequest = require('request-promise-native');
const inquirer = require('inquirer');
const fs = require('fs');
const fsextra = require('fs-extra');
const JailConfig = require('../lib/jail-config.js');

const findCacheDir = require('find-cache-dir');

module.exports = async (config) => {

    let jailConfig = new JailConfig(args);

    let {name, password} = await inquirer.prompt([
        {name: 'name', message: 'name: ', type: 'input'},
        {name: 'password', message: 'password: ', type: 'password'}
    ]);

    let res = await prequest({
        uri: `${config['auth-server-protocol']}://${config['auth-server-socket']}`,
        method: 'GET',
        'auth': {
            'user': name,
            'pass': password,
            'sendImmediately': false,
        },
        json: true,
        body: {
            repository: config['repository-socket'],
        }
    });

    let tokenPath = findCacheDir({name: 'token.json'})
    fsextra.ensureFileSync(tokenPath);
    fs.writeFileSync(tokenPath, JSON.stringify(res));

}
