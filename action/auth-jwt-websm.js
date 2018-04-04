'use strict';

// const prequest = require('request-promise-native');
// const inquirer = require('inquirer');
// const fs = require('fs');
// const fsextra = require('fs-extra');
// const chalk = require('chalk');
// const JailConfig = require('../lib/jail-config.js');
// const LogWebSocket = require('../lib/log-web-socket.js');
// const path = require('path');

// const noneAuth = require('../auth/none.js');
// const basicAuth = require('../auth/basic.js');
// const jwtAuth = require('../auth/jwt.js');

// const arr = {
//     'none': noneAuth,
//     'basic': basicAuth,
//     'jwt': jwtAuth,
// };

const readline = require('readline-sync');

module.exports = (config) => {

    let res = readline.question('user name: ');

    return res;
    // let jailConfig = new JailConfig(args);

    // let {name, password} = await inquirer.prompt([
    //     {prefix: '', name: 'name', message: 'name: ', type: 'input'},
    //     {prefix: '', name: 'password', message: 'password: ', type: 'password'}
    // ]);

    // let res = await prequest({
    //     uri: `${args['auth-server-protocol']}://${args['auth-server-socket']}`,
    //     method: 'GET',
    //     'auth': {
    //         'user': name,
    //         'pass': password,
    //         'sendImmediately': false,
    //     },
    //     json: true,
    //     body: {
    //         repository: args['repository-socket'],
    //     }
    // });

    // let tokenPath = path.resolve(args['token-file'])
    // fsextra.ensureFileSync(tokenPath);
    // fs.writeFileSync(tokenPath, JSON.stringify(res));

}
