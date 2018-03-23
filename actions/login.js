'use strict';

const prequest = require('request-promise-native');
const configData = require('../libs/config-data.js');
const globals = require('../libs/globals.js');
const base64url = require('base64url');
const passwordPrompt = require('password-prompt');
const inquirer = require('inquirer');
const fs = require('fs');

module.exports = async _ => {

    let {name, password} = await inquirer.prompt([
        {prefix: '', name: 'name', message: 'name: ', type: 'input'},
        {prefix: '', name: 'password', message: 'password: ', type: 'password'}
    ]);

    let res = await prequest({
        uri: `http://${globals.authServer}`,
        method: 'GET',
        'auth': {
            'user': name,
            'pass': password,
            'sendImmediately': false
        },
        json: true,
        body: {
            image: configData.name,
            repository: configData.from,
        }
    });

    fs.writeFileSync(globals.tokenFile, JSON.stringify(res));

}
