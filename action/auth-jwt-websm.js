'use strict';

const prequest = require('request-promise-native');
const inquirer = require('inquirer');
const fs = require('fs');
const fsextra = require('fs-extra');
const JailConfig = require('../lib/jail-config.js');

const findCacheDir = require('find-cache-dir');

const HttpError = require('../error/http-error.js');

module.exports = async (config) => {

    let jailConfig = new JailConfig(config);

    let {name, password} = await inquirer.prompt([
        {name: 'name', message: 'name: ', type: 'input'},
        {name: 'password', message: 'password: ', type: 'password'}
    ]);

    try {

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

    } catch(e) {

        if(e.name = 'StatusCodeError') {

            throw new HttpError({msg: 'authorization required', code: 401})

        }

        throw error;
    }


    let tokenPath = findCacheDir({name: 'token.json'})
    fsextra.ensureFileSync(tokenPath);
    fs.writeFileSync(tokenPath, JSON.stringify(res));

}
