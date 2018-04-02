'use strict';

// const prequest = require('request-promise-native');
// const inquirer = require('inquirer');
// const fs = require('fs');
// const fsextra = require('fs-extra');
// const chalk = require('chalk');
// const JailConfig = require('../lib/jail-config.js');
// const LogWebSocket = require('../lib/log-web-socket.js');
// const path = require('path');

// exports.command = 'login';

// exports.describe = 'aquire json web token';

// exports.builder = yargs => {

//     return yargs
//         .option('repository-socket', {
//             demandOption: true,
//             alias: ['repository', 'r'],
//             describe: 'repository socket',
//         });

// }

// exports.handler = async args => {

//     let jailConfig = new JailConfig(args);

//     let {name, password} = await inquirer.prompt([
//         {prefix: '', name: 'name', message: 'name: ', type: 'input'},
//         {prefix: '', name: 'password', message: 'password: ', type: 'password'}
//     ]);

//     let res = await prequest({
//         uri: `${args['auth-server-protocol']}://${args['auth-server-socket']}`,
//         method: 'GET',
//         'auth': {
//             'user': name,
//             'pass': password,
//             'sendImmediately': false,
//         },
//         json: true,
//         body: {
//             repository: args['repository-socket'],
//         }
//     });

//     let tokenPath = path.resolve(args['token-file'])
//     fsextra.ensureFileSync(tokenPath);
//     fs.writeFileSync(tokenPath, JSON.stringify(res));

// }
